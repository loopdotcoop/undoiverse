const FILE = 'uu.js'
    , VERSION = '0.2.2'
;

//// To load the Undoiverse Utilities, call:
//// `const uu = require('./uu.js');`
const uu = module.exports = {

  //// `box('Optional Title', 'Optional Footer', 24, ['1st.','2nd'], 0)`
  //// Used by `validate()` to make any kind of variable safe for logging.
  box: (title, footer, width, lines=[], padding=1) => {

    //// Fix arguments and declare variables.
    title = ''+title, footer = ''+footer;
    width = 9 <= ~~width ? ~~width : 16;
    padding = 0 <= ~~padding ? ~~padding : 1;
    padding = Math.min(padding, Math.floor(width / 2 - 3));
    let len, w, half, i, line;

    //// Render the title-line.
    len = title.length;
    w = width - len - 6;
    title = ( width - 6 >= len ? title : title.slice(0, w - 3) + '...' );
    half = ( width - 4 - (title ? title.length : 0) ) / 2;
    const out = [
      '.'
     +'-'.repeat( Math.ceil(half) )
     +(title ? ' '+title+' ' : '--')
     +'-'.repeat( Math.floor(half) )
     +'.'
    ];

    //// Render each line of content.
    w = width - 2 - padding - padding;
    for (i=0, line; line=lines[i]; i++) {
      len = line.length;
      out.push(
        '|'
       +' '.repeat(padding)
       +( w >= len ? line + ' '.repeat(w - len) : line.slice(0, w - 3) + '...' )
       +' '.repeat(padding)
       +'|'
      );
    };

    //// Render the footer-line.
    len = footer.length;
    w = width - len - 6;
    footer = ( width - 6 >= len ? footer : footer.slice(0, w - 3) + '...' );
    half = ( width - 4 - (footer ? footer.length : 0) ) / 2;
    out.push(
      "'"
     +'='.repeat( Math.ceil(half) )
     +(footer ? ' '+footer+' ' : '==')
     +'='.repeat( Math.floor(half) )
     +"'"
    );

    //// Convert the output-array to a string.
    return out.join('\n');
  },


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
