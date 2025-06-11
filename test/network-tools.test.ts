import { resolveMacToIp } from '../src/network-tools';

jest.mock('@network-utils/arp-lookup', () => ({
  toIP: jest.fn(),
}));

jest.mock('local-devices', () => jest.fn());

const arp = require('@network-utils/arp-lookup');
const find = require('local-devices');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('resolveMacToIp', () => {
  test('returns ip from arp lookup', async () => {
    (arp.toIP as jest.Mock).mockResolvedValue('192.168.0.10');
    const ip = await resolveMacToIp('84:d8:1b:aa:bb:cc');
    expect(ip).toBe('192.168.0.10');
    expect(find).not.toHaveBeenCalled();
  });

  test('falls back to local-devices when arp fails', async () => {
    (arp.toIP as jest.Mock).mockResolvedValueOnce(undefined).mockResolvedValueOnce('192.168.0.11');
    (find as jest.Mock).mockResolvedValue([{ mac: '84:d8:1b:aa:bb:cc', ip: '192.168.0.11' }]);

    const ip = await resolveMacToIp('84-d8-1b-aa-bb-cc');
    expect(ip).toBe('192.168.0.11');
    expect(arp.toIP).toHaveBeenCalledTimes(1);
    expect(find).toHaveBeenCalled();
  });
});
