# tplink-bulbs

🚀 A modern TypeScript library to control TP-Link Tapo smart devices (like bulbs, plugs, cameras) via cloud API and local LAN.

---

## 📦 Installation

```bash
npm install tplink-bulbs
```

or if using from local project:
```bash
npm install
```

## 🧪 Running Tests

After installing dependencies you can execute the test suite with:

```bash
npm test
```

---

## 🚀 Quickstart Example

```typescript
import * as TPLink from 'tplink-bulbs';

const email = 'your-email@example.com';
const password = 'your-password';
const deviceId = 'your-device-id';

async function run() {
  const cloudApi = await TPLink.API.cloudLogin(email, password);
    
  const devices = await cloudApi.listDevicesByType('SMART.TAPOBULB');
  console.log(devices);
  const targetDevice = devices.find(device => device.deviceId === deviceId);

  if (!targetDevice) {
    console.error(`Device with ID "${deviceId}" not found.`);
    return;
  }

  const device = await TPLink.API.loginDevice(email, password, targetDevice);

  const info = await device.getDeviceInfo();
  console.log('Device Info:', info);

  await device.turnOn();
  await device.setColour('violet');
  await TPLink.API.delay(500);

  await device.setColour('red');
  await TPLink.API.delay(500);

  await device.setColour('orange');
  await TPLink.API.delay(500);

  //...
}

run().catch(console.error);
```

> **Note**: `loginDevice` resolves the device's IP address via your local network.
> Ensure the machine running this code is connected to the same network as the
> Tapo device. If you already know the IP address or ARP discovery fails, call
> `loginDeviceByIp(email, password, deviceIp)` instead.

---

## 💡 Features

- Cloud login
- List devices from TP-Link Cloud
- Set color by name, hex, temperature, HSL
- A lot of color presets included
- Full TypeScript strict typing
- Easy to use

---

## 🌈 Available Color Presets

`blue`, `red`, `yellow`, `green`, `cyan`, `magenta`, `orange`, `pink`, `turquoise`, `violet`, `lavender`, `coral`, `mint`, `white`, `daylightwhite`, `warmwhite`

(And you can set any hex color like `#ff0000` too!)

---

## 📄 License

ISC License

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Credits

Credits go to:

- https://github.com/dickydoouk/tp-link-tapo-connect
- https://github.com/fishbigger/TapoP100
- https://github.com/K4CZP3R/tapo-p100-java-poc
- https://gist.github.com/chriswheeldon/3b17d974db3817613c69191c0480fe55