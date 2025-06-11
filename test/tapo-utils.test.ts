import { augmentTapoDevice, isTapoDevice, checkError } from '../src/tapo-utils';
import { base64Encode } from '../src/tplink-cipher';

describe('tapo-utils', () => {
  test('augmentTapoDevice decodes alias for Tapo devices', async () => {
    const alias = base64Encode('lamp');
    const device: any = { deviceType: 'SMART.TAPOBULB', alias };
    const result = await augmentTapoDevice(device);
    expect(result.alias).toBe('lamp');
  });

  test('augmentTapoDevice returns original for non Tapo devices', async () => {
    const device: any = { deviceType: 'OTHER.DEVICE', alias: 'abc' };
    const result = await augmentTapoDevice(device);
    expect(result).toEqual(device);
  });

  test('isTapoDevice detects device types', () => {
    expect(isTapoDevice('SMART.TAPOPLUG')).toBe(true);
    expect(isTapoDevice('SMART.TAPOBULB')).toBe(true);
    expect(isTapoDevice('SMART.IPCAMERA')).toBe(true);
    expect(isTapoDevice('OTHER')).toBe(false);
  });

  const codeMap: Record<number, string> = {
    -1005: 'AES Decode Fail',
    -1006: 'Request length error',
    -1008: 'Invalid request params',
    -1301: 'Rate limit exceeded',
    -1101: 'Session params error',
    -1010: 'Invalid public key length',
    -1012: 'Invalid terminal UUID',
    -1501: 'Invalid credentials',
    -1002: 'Transport not available error',
    -1003: 'Malformed json request',
    -20004: 'API rate limit exceeded',
    -20104: 'Missing credentials',
    -20601: 'Incorrect email or password',
    -20675: 'Cloud token expired or invalid',
    1000: 'Null transport error',
    1001: 'Command cancel error',
    1002: 'Transport not available error',
    1003: 'Device supports KLAP protocol - Legacy login not supported',
    1100: 'Handshake failed',
    1111: 'Login failed',
    1112: 'Http transport error',
    1200: 'Multirequest failed',
    9999: 'Session Timeout',
  };

  test('checkError throws correct messages', () => {
    for (const [code, msg] of Object.entries(codeMap)) {
      expect(() => checkError({ error_code: Number(code) })).toThrow(msg);
    }
  });

  test('checkError does nothing on success', () => {
    expect(checkError({ error_code: 0 })).toBeUndefined();
  });
});
