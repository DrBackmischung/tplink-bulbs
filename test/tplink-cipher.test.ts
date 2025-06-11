import { encrypt, decrypt, base64Encode, base64Decode, shaDigest } from '../src/tplink-cipher';
import crypto from 'crypto';

describe('tplink-cipher', () => {
  test('base64 encode/decode roundtrip', () => {
    const txt = 'hello';
    const encoded = base64Encode(txt);
    expect(encoded).toBe(Buffer.from(txt).toString('base64'));
    expect(base64Decode(encoded)).toBe(txt);
  });

  test('shaDigest returns sha1 hash', () => {
    const val = 'abc';
    const expected = crypto.createHash('sha1').update(val).digest('hex');
    expect(shaDigest(val)).toBe(expected);
  });

  test('encrypt/decrypt round trip', () => {
    const key = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const deviceKey = { key, iv, deviceIp: '', sessionCookie: '' } as any;
    const data = { a: 1, b: 'test' };
    const enc = encrypt(data, deviceKey);
    const dec = decrypt(enc, deviceKey);
    expect(dec).toEqual(data);
  });
});
