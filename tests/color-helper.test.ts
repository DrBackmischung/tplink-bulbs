import assert from 'assert';
import { hexToHsl, getColour } from '../src/color-helper';

export function test_hexToHsl() {
  const expected = { hue: 0, saturation: 100, brightness: 50 };
  assert.deepStrictEqual(hexToHsl('#ff0000'), expected);
}

export function test_getColour_preset() {
  const expected = { hue: 0, saturation: 100, color_temp: 0 };
  assert.deepStrictEqual(getColour('red'), expected);
}

export function test_getColour_hex() {
  const expected = { hue: 120, saturation: 100, brightness: 50 };
  assert.deepStrictEqual(getColour('#00ff00'), expected);
}

export function test_getColour_temp() {
  const expected = { color_temp: 3000 };
  assert.deepStrictEqual(getColour('3000K'), expected);
}
