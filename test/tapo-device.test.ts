import { TapoDevice, TapoDeviceController } from '../src/tapo-device';
import { presetColors } from '../src/color-helper';

describe('TapoDevice', () => {
  test('factory returns TapoDeviceController', () => {
    const device = TapoDevice({ send: async () => {} });
    expect(device).toBeInstanceOf(TapoDeviceController);
  });
  test('device control methods send correct payloads', async () => {
    const send = jest.fn(async (req) => req);
    const device = TapoDevice({ send });

    await device.turnOn();
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: { device_on: true } });

    await device.turnOff();
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: { device_on: false } });

    await device.setBrightness(50);
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: { brightness: 50 } });

    await device.setSaturation(20);
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: { saturation: 20 } });

    await device.setHue(10);
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: { hue: 10 } });

    await device.setColour('red');
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: presetColors.red });

    await device.setHSL(370, -10, 110);
    expect(send).toHaveBeenCalledWith({ method: 'set_device_info', params: { hue: 10, saturation: 0, brightness: 100 } });
  });

  test('setHSL turns off device when luminosity is zero', async () => {
    const send = jest.fn(async (req) => req);
    const device = TapoDevice({ send });

    await device.setHSL(0, 50, 0);
    expect(send).toHaveBeenNthCalledWith(1, { method: 'set_device_info', params: { device_on: false } });
    expect(send).toHaveBeenNthCalledWith(2, { method: 'set_device_info', params: { hue: 0, saturation: 50, brightness: 0 } });
  });

  test('getDeviceInfo decodes base64 fields', async () => {
    const info = { nickname: Buffer.from('bulb').toString('base64'), ssid: Buffer.from('wifi').toString('base64') };
    const send = jest.fn(async () => info);
    const device = TapoDevice({ send });
    const result = await device.getDeviceInfo();
    expect(result.nickname).toBe('bulb');
    expect(result.ssid).toBe('wifi');
  });

  test('getEnergyUsage sends correct request', async () => {
    const send = jest.fn(async () => ({}));
    const device = TapoDevice({ send });
    await device.getEnergyUsage();
    expect(send).toHaveBeenCalledWith({ method: 'get_energy_usage' });
  });
});
