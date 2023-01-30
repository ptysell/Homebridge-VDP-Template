import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { Platform } from './platform';
export declare class Accessory {
    private readonly platform;
    private readonly accessory;
    private service;
    private exampleStates;
    constructor(platform: Platform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessory.d.ts.map