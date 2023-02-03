import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { platformAccessory } from '../platformAccessory';
import { platform } from '../platform';
export declare class lightbulbAccessory extends platformAccessory {
    protected readonly platform: platform;
    protected readonly accessory: PlatformAccessory;
    protected service: Service;
    constructor(platform: platform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=lightbulbAccessory.d.ts.map