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
export type HSL = { h: number; s: number; l: number };
export type HSV = { h: number; s: number; v: number };
export type CMYK = { c: number; m: number; y: number; k: number };

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

export const hslToHsl = (hsl: HSL) => {
  const { h, s, l } = hsl;
  if (l === 0) {
    throw new Error('Cannot set light to black');
  }
  const hue = Math.round(h % 360);
  const saturation = Math.max(0, Math.min(100, s));
  const brightness = Math.max(0, Math.min(100, l));
  return { hue, saturation, brightness };
};

const hsvToRgb = (hsv: HSV): RGB => {
  const h = hsv.h % 360;
  const s = Math.max(0, Math.min(100, hsv.s)) / 100;
  const v = Math.max(0, Math.min(100, hsv.v)) / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

const cmykToRgb = (cmyk: CMYK): RGB => {
  const c = Math.max(0, Math.min(100, cmyk.c)) / 100;
  const m = Math.max(0, Math.min(100, cmyk.m)) / 100;
  const y = Math.max(0, Math.min(100, cmyk.y)) / 100;
  const k = Math.max(0, Math.min(100, cmyk.k)) / 100;

  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k))
  };
};

export const hsvToHsl = (hsv: HSV) => {
  if (hsv.v === 0) {
    throw new Error('Cannot set light to black');
  }
  const hue = Math.round(hsv.h % 360);
  const saturation = Math.max(0, Math.min(100, hsv.s));
  const brightness = Math.max(0, Math.min(100, hsv.v));
  return { hue, saturation, brightness };
};

export const cmykToHsl = (cmyk: CMYK) => {
  if (cmyk.k === 100) {
    throw new Error('Cannot set light to black');
  }
  return rgbToHsl(cmykToRgb(cmyk));
};

const mixPresetColors = (name: string) => {
  for (const first of Object.keys(presetColors)) {
    for (const second of Object.keys(presetColors)) {
      if (first + second === name) {
        const c1 = presetColors[first as keyof typeof presetColors];
        const c2 = presetColors[second as keyof typeof presetColors];

        if ('color_temp' in c1 && !('hue' in c1) && 'color_temp' in c2 && !('hue' in c2)) {
          return { color_temp: Math.round((c1.color_temp + c2.color_temp) / 2) };
        }

        if ('hue' in c1 && 'hue' in c2) {
          return {
            hue: Math.round(((c1 as any).hue + (c2 as any).hue) / 2),
            saturation: Math.round(((c1 as any).saturation + (c2 as any).saturation) / 2),
            color_temp: 0,
          };
        }
      }
    }
  }
  return undefined;
};

export const getColor = (colour: string | RGB | HSL | HSV | CMYK) => {
  if (typeof colour === 'string') {
    const c = colour.toLowerCase();
    if (c.startsWith('#')) return hexToHsl(c);
    if (c.endsWith('k')) return temperature(c);
    if (Object.keys(presetColors).includes(c)) return presetColors[c as keyof typeof presetColors];
    const mixed = mixPresetColors(c);
    if (mixed) return mixed;
    throw new Error('Invalid Colour');
  }

  if ('r' in colour && 'g' in colour && 'b' in colour) return rgbToHsl(colour as RGB);
  if ('h' in colour && 's' in colour && 'l' in colour) return hslToHsl(colour as HSL);
  if ('h' in colour && 's' in colour && 'v' in colour) return hsvToHsl(colour as HSV);
  if ('c' in colour && 'm' in colour && 'y' in colour && 'k' in colour) return cmykToHsl(colour as CMYK);

  throw new Error('Invalid Colour');
};

