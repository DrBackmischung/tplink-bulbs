const assert = require('assert');
const path = require('path');

// Attempt to import the TypeScript source using ts-node if available
let colorHelper;
try {
  require('ts-node/register');
  colorHelper = require('../src/color-helper');
} catch (err) {
  console.error('ts-node is required to run tests');
  process.exitCode = 1;
  return;
}

function expectThrows(fn, message) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
    assert.strictEqual(e.message, message);
  }
  if (!threw) {
    throw new Error('Expected function to throw');
  }
}

expectThrows(() => colorHelper.hexToHsl('#000000'), 'Cannot set light to black');
expectThrows(() => colorHelper.hexToHsl('#zzzzzz'), 'Invalid hex string');
expectThrows(() => colorHelper.temperature('2000K'), 'Colour temperature should be between 2500K and 6500K.');

console.log('All tests passed');
