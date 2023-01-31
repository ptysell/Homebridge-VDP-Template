import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { platform } from './platform';
export declare class platformAccessory {
    private readonly platform;
    private readonly accessory;
    private service;
    private state;
    constructor(platform: platform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessory.d.ts.map