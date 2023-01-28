import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { vdpPlatform } from '../platform';
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 *
 *
 *
 *

const { IPDiscovery } = require('hap-controller');

const discovery = new IPDiscovery();

discovery.on('serviceUp', (service) => {
    console.log('Found device:', service);
});

discovery.start();

*
 *
 *
 *
 *
 *
 *
 */
export declare class hkDiscovery {
    private readonly platform;
    private readonly accessory;
    private service;
    private discovery;
    private exampleStates;
    constructor(platform: vdpPlatform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=hkDiscovery.d.ts.map