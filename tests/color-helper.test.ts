import { hexToHsl } from '../src/color-helper';
import assert from 'assert';

const expected = { hue: 0, saturation: 100, brightness: 50 };

assert.deepStrictEqual(hexToHsl('#ff0000'), expected);
assert.deepStrictEqual(hexToHsl('ff0000'), expected);

console.log('color-helper tests passed');
