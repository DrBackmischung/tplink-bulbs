import { config } from 'dotenv';
import * as TPLink from '../src';

config();

const email = process.env.TAPO_USERNAME;
const password = process.env.TAPO_PASSWORD;
const deviceId = process.env.TAPO_DEVICE_ID;

const run = email && password && deviceId;
(run ? test : test.skip)('login and fetch device info', async () => {
  const cloud = await TPLink.API.cloudLogin(email, password);
  const devices = await cloud.listDevices();
  const target = devices.find(d => d.deviceId === deviceId);
  expect(target).toBeDefined();
  const device = await TPLink.API.loginDevice(email, password, target!);
  const info = await device.getDeviceInfo();
  expect(info.device_id).toBe(deviceId);
});
