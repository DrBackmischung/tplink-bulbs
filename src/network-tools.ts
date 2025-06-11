import { parse } from 'macaddr';
import arp from '@network-utils/arp-lookup'
import find from 'local-devices';

export const resolveMacToIp = async (mac: string): Promise<string | undefined> => {
    const mac2 = tidyMac(mac);

    let ip = await arp.toIP(mac2);

    if (!ip) {
        const devices = await find();
        ip = devices.find(device => device.mac === mac2)?.ip;
        // give arp another chance even when fallback succeeded
        await arp.toIP(mac2);
    }

    return ip;
}

const tidyMac = (mac: string): string => 
    parse(mac).toString();
