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

assert.deepStrictEqual(
  colorHelper.hexToHsl('#ff0000'),
  { hue: 0, saturation: 100, brightness: 50 }
);

assert.deepStrictEqual(
  colorHelper.rgbToHsl({ r: 255, g: 0, b: 0 }),
  { hue: 0, saturation: 100, brightness: 50 }
);

assert.deepStrictEqual(
  colorHelper.getColor('#ff0000'),
  { hue: 0, saturation: 100, brightness: 50 }
);

assert.deepStrictEqual(
  colorHelper.getColor({ r: 255, g: 0, b: 0 }),
  { hue: 0, saturation: 100, brightness: 50 }
);

assert.deepStrictEqual(
  colorHelper.getColor('red'),
  { hue: 0, saturation: 100, color_temp: 0 }
);

assert.deepStrictEqual(
  colorHelper.getColor('mint'),
  { hue: 150, saturation: 100, color_temp: 0 }
);

assert.deepStrictEqual(
  colorHelper.getColor('4500K'),
  { color_temp: 4500 }
);

expectThrows(() => colorHelper.getColor('invalid'), 'Invalid Colour');
expectThrows(() => colorHelper.getColor({ r: 0, g: 0, b: 0 }), 'Cannot set light to black');

console.log('All tests passed');
