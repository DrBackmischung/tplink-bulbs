import { config } from 'dotenv';
import * as TPLink from '../src';

config();

const email = process.env.TAPO_USERNAME;
const password = process.env.TAPO_PASSWORD;
const deviceId = process.env.TAPO_DEVICE_ID;

if (!email || !password || !deviceId) {
  console.error('Please set TAPO_USERNAME, TAPO_PASSWORD and TAPO_DEVICE_ID in .env');
  process.exit(1);
}

async function run() {
  const cloud = await TPLink.API.cloudLogin(email, password);
  const devices = await cloud.listDevices();
  const target = devices.find(d => d.deviceId === deviceId);
  if (!target) {
    throw new Error('Device not found');
  }
  const device = await TPLink.API.loginDevice(email, password, target);
  const info = await device.getDeviceInfo();
  console.log('Device Info:', info);
  await device.turnOn();
  console.log('Turned on');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
