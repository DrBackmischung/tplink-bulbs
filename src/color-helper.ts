export const presetColors = {
  red: {
    hue: 0,
    saturation: 100,
    color_temp: 0
  },
  orange: {
    hue: 30,
    saturation: 100,
    color_temp: 0
  },
  amber: {
    hue: 45,
    saturation: 100,
    color_temp: 0
  },
  yellow: {
    hue: 60,
    saturation: 100,
    color_temp: 0
  },
  lime: {
    hue: 75,
    saturation: 100,
    color_temp: 0
  },
  green: {
    hue: 120,
    saturation: 100,
    color_temp: 0
  },
  turquoise: {
    hue: 160,
    saturation: 100,
    color_temp: 0
  },
  cyan: {
    hue: 180,
    saturation: 100,
    color_temp: 0
  },
  skyblue: {
    hue: 200,
    saturation: 100,
    color_temp: 0
  },
  blue: {
    hue: 240,
    saturation: 100,
    color_temp: 0
  },
  indigo: {
    hue: 275,
    saturation: 100,
    color_temp: 0
  },
  violet: {
    hue: 290,
    saturation: 100,
    color_temp: 0
  },
  magenta: {
    hue: 300,
    saturation: 100,
    color_temp: 0
  },
  pink: {
    hue: 340,
    saturation: 100,
    color_temp: 0
  },

  lavender: {
    hue: 250,
    saturation: 100,
    color_temp: 0
  },
  coral: {
    hue: 16,
    saturation: 100,
    color_temp: 0
  },
  mint: {
    hue: 150,
    saturation: 100,
    color_temp: 0
  },
  teal: {
    hue: 180,
    saturation: 100,
    color_temp: 0
  },
  navy: {
    hue: 240,
    saturation: 100,
    color_temp: 0
  },
  olive: {
    hue: 60,
    saturation: 100,
    color_temp: 0
  },
  maroon: {
    hue: 0,
    saturation: 100,
    color_temp: 0
  },
  grey: {
    hue: 0,
    saturation: 0,
    color_temp: 0
  },

  white: {
    color_temp: 4500
  },
  daylightwhite: {
    color_temp: 5500
  },
  warmwhite: {
    color_temp: 2700
  },
  coolwhite: {
    color_temp: 6500
  },
  softwhite: {
    color_temp: 3000
  },
  neutralwhite: {
    color_temp: 4000
  },
  ultraWarmWhite: {
    color_temp: 2200
  },
  ultraCoolWhite: {
    color_temp: 7000
  }
}


export const hexToHsl = (hex: string) => {
  if (hex.toLowerCase() === '#000000') {
    throw new Error('Cannot set light to black');
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error('Invalid hex string');
  }

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255, g /= 255, b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return {
    hue: h,
    saturation: s,
    brightness: l
  };
}

export const temperature = (temp: string) => {
  let t = parseInt(temp.slice(0,-1));

  if(t < 2500 || t > 6500) {
    throw new Error('Colour temperature should be between 2500K and 6500K.');
  }

  return{
    color_temp: t
  };
};

export type RGB = { r: number; g: number; b: number };

export const rgbToHsl = (rgb: RGB) => {
  const { r, g, b } = rgb;
  if (r === 0 && g === 0 && b === 0) {
    throw new Error('Cannot set light to black');
  }

  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;

  let max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  let l: number = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      default: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);
  h = Math.round(360 * h);

  return {
    hue: h,
    saturation: s,
    brightness: l
  };
};

export const getColor = (colour: string | RGB) => {
  if (typeof colour === 'string') {
    let c = colour.toLowerCase();
    if (c.startsWith('#')) return hexToHsl(c);
    if (c.endsWith('k')) return temperature(c);
    if (Object.keys(presetColors).includes(c)) return presetColors[c as keyof typeof presetColors];
    throw new Error('Invalid Colour');
  }
  return rgbToHsl(colour);
};

