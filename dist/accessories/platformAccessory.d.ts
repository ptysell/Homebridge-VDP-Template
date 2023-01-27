import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { vdpPlatform } from '../platform';
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export declare class vdpAccessory {
    private readonly platform;
    private readonly accessory;
    private service;
    private exampleStates;
    constructor(platform: vdpPlatform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessory.d.ts.map