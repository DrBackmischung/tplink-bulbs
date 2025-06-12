import { parse } from 'macaddr';
import arp from '@network-utils/arp-lookup';
import find from 'local-devices';

const MAX_LOOKUP_ATTEMPTS = 5;

export const resolveMacToIp = async (mac: string): Promise<string | undefined> => {
    const macAddress = tidyMac(mac);

    let attempt = 0;
    let ip = await lookupIp(macAddress);

    while (attempt < MAX_LOOKUP_ATTEMPTS && !ip) {
        attempt++;
        ip = await lookupIp(macAddress);
    }

    return ip;
};

const lookupIp = async (mac: string): Promise<string | undefined> =>
    await arp.toIP(mac) ?? (await find()).find(device => device.mac === mac)?.ip;

const tidyMac = (mac: string): string => parse(mac).toString();
