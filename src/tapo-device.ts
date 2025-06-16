import { getColor, RGB } from './color-helper';
import { base64Decode } from './tplink-cipher';
import { TapoDeviceInfo, TapoProtocol } from './types';

export class TapoDeviceController {
  constructor(private readonly protocol: TapoProtocol) {}

  private async setDeviceOn(deviceOn = true): Promise<void> {
    const request = {
      method: 'set_device_info',
      params: { device_on: deviceOn },
    };
    await this.protocol.send(request);
  }

  private augment(info: TapoDeviceInfo): TapoDeviceInfo {
    return {
      ...info,
      ssid: base64Decode(info.ssid),
      nickname: base64Decode(info.nickname),
    };
  }

  turnOn(): Promise<void> {
    return this.setDeviceOn(true);
  }

  turnOff(): Promise<void> {
    return this.setDeviceOn(false);
  }

  async setBrightness(brightnessLevel: number = 100): Promise<void> {
    const request = {
      method: 'set_device_info',
      params: { brightness: brightnessLevel },
    };
    await this.protocol.send(request);
  }

  async setSaturation(saturation: number): Promise<void> {
    const request = {
      method: 'set_device_info',
      params: { saturation },
    };
    await this.protocol.send(request);
  }

  async setHue(hue: number): Promise<void> {
    const request = {
      method: 'set_device_info',
      params: { hue },
    };
    await this.protocol.send(request);
  }

  async setColour(colour: string | RGB = 'white'): Promise<void> {
    const params = getColor(colour);
    const request = { method: 'set_device_info', params };
    await this.protocol.send(request);
  }

  async setHSL(hue: number, sat: number, lum: number): Promise<void> {
    const normalisedHue = hue % 360;
    const normalisedSat = Math.max(0, Math.min(100, sat));
    const normalisedLum = Math.max(0, Math.min(100, lum));

    if (normalisedLum === 0) {
      await this.setDeviceOn(false);
    }

    const request = {
      method: 'set_device_info',
      params: {
        hue: normalisedHue,
        saturation: normalisedSat,
        brightness: normalisedLum,
      },
    };
    await this.protocol.send(request);
  }

  async getDeviceInfo(): Promise<TapoDeviceInfo> {
    const statusRequest = { method: 'get_device_info' };
    return this.augment(await this.protocol.send(statusRequest));
  }

  async getEnergyUsage(): Promise<TapoDeviceInfo> {
    const statusRequest = { method: 'get_energy_usage' };
    return this.protocol.send(statusRequest);
  }
}

export const TapoDevice = ({ send }: TapoProtocol): TapoDeviceController => {
  return new TapoDeviceController({ send });
};