import { test_hexToHsl, test_getColour_preset, test_getColour_hex, test_getColour_temp } from './color-helper.test';

function run(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

run('hexToHsl converts to HSL', test_hexToHsl);
run('getColour returns preset color values', test_getColour_preset);
run('getColour handles hex strings', test_getColour_hex);
run('getColour handles colour temperature', test_getColour_temp);
