import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { platform } from './platform';
export declare class platformAccessory {
    protected platform: platform;
    protected accessory: PlatformAccessory;
    protected service: Service;
    protected state: {
        On: boolean;
    };
    readonly UUID: string;
    readonly displayName: string;
    constructor(platform: platform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessory.d.ts.map