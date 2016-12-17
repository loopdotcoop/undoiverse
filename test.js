const FILE = 'test.js'
    , VERSION = '0.2.3'

      //// Configuration, passed to every test-file.
    , config = {}

      //// Files for `test.js` to test.
    , testFiles = [
          require('./tests/core/client/client.test.js')(config)
        // , require('./tests/core/entity/entity.test.js')(config)
        // , require('./tests/core/location/location.test.js')(config)
        // , require('./tests/develop/log/log.test.js')(config)
        // , require('./tests/uu/uu.test.js')(config)
      ]

      //// ANSI Colours.
    , RED = '\033[1;31m'
    , BOLD = '\033[1m'
    , END = '\033[0m'
    , HR = (new Array(81)).join('-')

      //// Add a handy `append()` method to the results-array.
    , results = ((a)=>{a.append=(x)=>{a[a.length-1]+=x};return a})([HR])

      //// Node.js built-in modules.
    , a = require('assert')
    , util = require('util')
    , utilConfig = { // https://goo.gl/EZajYb
        colors: true,
        breakLength: Infinity, // format on a single line
      }
;
let i, j, tests, test, passes, fails, totalPasses = 0, totalFails = 0;


//// Add a heading for each test-file.
for (i=0; tests=testFiles[i]; i++) {
  passes = fails = 0;
  results.push(`${BOLD}${tests.FILE}${END}  ${tests.VERSION}  ${tests.PLUGIN}`);

  //// Run each test in the current test-file.
  for (j=0; test=tests[j]; j++) {
    try {
      test(tests.mock);
      totalPasses++; // did not throw an exception
      passes++;

    //// Encountered an exception, which may be...
    } catch (e) {
      results.push(`  Line ${stackToLineNo(tests.FILE, e.stack)}`);
      totalFails++;
      fails++;

      //// ...generated by one of Node’s `assert` methods as expected...
      if (e instanceof a.AssertionError) {
        results.push(`    ${j+1}. ${e.message}`);
        if (! (null == e.actual && null == e.expected) ) results.push(
          `    actual   ${prettier( util.inspect(e.actual, utilConfig) )}`,
          `    expected ${prettier( util.inspect(e.expected, utilConfig) )}`);

      //// ...or generated by whatever the test is testing.
      } else {
        results.push(`    ${j+1}. Unexpected ${e.name}:`);
        results.push(`      ${RED}${e.message.split('\n').join('\n  ')}${END}`);
      }

    }
  }

  //// Add a summary for each test-file.
  results.push(`  Passes ${passes}`);
  if (fails) results.append(`  ${RED}Fails ${fails}${END}`);
}

//// Add a summary at the end of all the tests.
results.push(HR,`${BOLD}Total Passes ${totalPasses}${END}`);
if (totalFails) results.append(`  ${RED}Total Fails ${totalFails}${END}`);
results.push(HR,'');

//// Output all test results, and `0` status for success or `1` for failure.
process.stdout.write( results.join('\n') );
process.exit(totalFails ? 1 : 0); // in bash, use `$ echo $?` to see this




//// PRIVATE HELPER FUNCTIONS

//// `stackToLineNo('foo/bar.test.js', '... Node’s error.stack output ...')`
//// Finds the proper test-file line number from a Node.js stack-trace.
function stackToLineNo (path, stack) {
  let i, stackLine, lineMatch, stackLines = stack.split('\n');
  let lineRx = new RegExp(`${tests.FILE}:(\\d+):\\d+\\)$`);
  for (i=0; stackLine=stackLines[i]; i++) {
    lineMatch = stackLine.match(lineRx);
    if (lineMatch) return lineMatch[1];
  }
  return '?'; // not found
}

//// `prettier('\n.-- Box --.\n| ok      |\n\'=========\'')`
//// Improves how `util.inspect()` displays `uu.box()` output. If `str` does not
//// seem to be the output of `uu.box()`, `prettier()` returns it unchanged.
function prettier (str) {
  let i, line, first, last;
  if ( str.substr(0,8) !== "\u001B[32m'\\n" ) return str; // green foreground
  if ( str.substr(-6)  !== "'\u001B[39m"    ) return str; // default foreground
  str = str.slice(8, -6); // trim ANSI start and end, added by `util.inspect()`
  const lines = str.split('\\n');
  const h = lines.length;
  if (2 > h) return str; // box height must be at least two characters
  if (3 > lines[0].length) return str; // must be at 3 or more characters wide
  for (i=0; i<h; i++) {
    line = lines[i];
    first = line.substr(0,1);
    last = line.substr(-1);
    if (0 === i) {
      if ('.' !== first || '.' !== last) return str;
    } else if (h === i+1) {
      last = line.substr(-1);
      line = lines[i] = line.slice(1,-2) + last;
      first = line.substr(0,1);
      if ("'" !== first || "'" !== last) return str;
    } else {
      if ('|' !== first || '|' !== last) return str;
    }
  }
  return '\n' + lines.join('\n');
}
