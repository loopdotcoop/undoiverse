const FILE = 'uu.js'
    , VERSION = '0.2.0'
;

//// To load the Undoiverse Utilities, call:
//// `const uu = require('./uu.js');`
const uu = module.exports = {

  //// `fill('foo/bar.js', config, 'foo.bar', 6, 'integer', 1, 99, testFn)`
  //// If `key` is missing, `fill()` creates it with default value `fallback`.
  //// If `key` is present, `fill()` validates it.
  fill: (path, config, key, fallback, type, min, max, tester) => {

    const k = key.split('.'); // convert 'foo.bar' to `['foo','bar']`
    function dig (nsRef) { // namespace-reference
      let n = k.shift();
      if (k.length) { // still some way to go, so dig deeper
        dig( nsRef[n] = nsRef[n] || {} );
      } else if (null == nsRef[n]) { // key is missing, so assign the default
        nsRef[n] = fallback;
      } else { // key is present, so validate it
        validate(path, config, key, fallback, type, min, max, tester, nsRef[n]);
      }
    }
    dig(config); // begin recursively filling `config.foo.bar`

  },


  //// `flatten([1, [true, [3, 4], null] ])`
  //// Converts an array of arrays (...of arrays of arrays...) to a flat array.
  //// Used by `Undoiverse::activate()` to deal with complex PPOs.
  flatten: (items, result=[]) => {
    items.forEach( item => {
      if ( Array.isArray(item) )
        uu.flatten(item, result)
      else
        result.push(item)
    })
    return result
  },


  //// `safe(['Any',1,true],'object')`
  //// Used by `validate()` to make any kind of variable safe for logging.
  safe: (v,t) => {
    t = t || typeof v;
    if (null === v) return '`null`';
    if ( /^number$|^boolean$|^undefined$/.test(t) ) return '`'+v+'`';
    const vs = v+''; // convert `v` to a string
    return '"'+ ( 17 > vs.length ? vs : vs.slice(0,8)+'...'+vs.slice(-5) ) +'"';
  },


  //// `MSI` is just shorthand for the highest integer JavaScript can deal with
  //// before losing precision.
  MSI: Number.MAX_SAFE_INTEGER

};




//// PRIVATE HELPER FUNCTIONS

//// `validate('foo/bar.js', config, 'foo.bar', 6, 'integer', 1, 99, testFn, 5)`
//// Used by `fill()` to test whether a value `v` is valid.
function validate (path, config, key, fallback, type, min, max, tester, v) {
  const t = typeof v;
  if ('integer' === type) {
    if ('number' !== t) { throw new TypeError(`${path}:
      config.${key} is type '${t}' not 'number', so cannot be 'integer'`);
    }
    if (~~v !== v) { throw new TypeError(`${path}:
      config.${key} is a number but not an integer`);
    }
    type = 'number';
  } else {
    if (type !== t) { throw new TypeError(`${path}:
      config.${key} is type '${t}' not '${type}'`);
    }
  }
  if ('number' === type) {
    if (null !== min && v < min) { throw new RangeError(`${path}:
      config.${key} is ${v}, which is less than ${min}`);
    }
    if (null !== max && v > max) { throw new RangeError(`${path}:
      config.${key} is ${v}, which is greater than ${max}`);
    }
  }
  if ('string' === type) {
    if (null !== min && v.length < min) { throw new RangeError(`${path}:
      config.${key} length is ${v.length}, which is less than ${min}`);
    }
    if (null !== max && v.length > max) { throw new RangeError(`${path}:
      config.${key} length is ${v.length}, which is greater than ${max}`);
    }
  }
  if (! tester) return;
  const test = tester.test ? tester.test.bind(tester) : tester;
  if ( test && ! test(v) ) { throw new Error(`${path}:
    config.${key} is ${uu.safe(v,t)}, which fails \`test\``);
  }
}
