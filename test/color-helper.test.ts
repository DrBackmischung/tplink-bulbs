import { hexToHsl, rgbToHsl, getColor, temperature } from '../src/color-helper';

describe('color-helper', () => {
  test('throws on invalid input', () => {
    expect(() => hexToHsl('#000000')).toThrow('Cannot set light to black');
    expect(() => hexToHsl('#zzzzzz')).toThrow('Invalid hex string');
    expect(() => temperature('2000K')).toThrow('Colour temperature should be between 2500K and 6500K.');
    expect(() => temperature('7000K')).toThrow('Colour temperature should be between 2500K and 6500K.');
    expect(() => getColor('black')).toThrow('Invalid Colour');
    expect(() => getColor('invalid')).toThrow('Invalid Colour');
    expect(() => getColor({ r: 0, g: 0, b: 0 })).toThrow('Cannot set light to black');
  });

  test('converts and parses colours', () => {
    const redHsl = { hue: 0, saturation: 100, brightness: 50 };
    expect(hexToHsl('#ff0000')).toEqual(redHsl);
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual(redHsl);
    expect(getColor('#ff0000')).toEqual(redHsl);
    expect(getColor({ r: 255, g: 0, b: 0 })).toEqual(redHsl);
    expect(getColor('red')).toEqual({ hue: 0, saturation: 100, color_temp: 0 });
    expect(getColor('mint')).toEqual({ hue: 150, saturation: 100, color_temp: 0 });
    expect(getColor('4500K')).toEqual({ color_temp: 4500 });
  });
});
