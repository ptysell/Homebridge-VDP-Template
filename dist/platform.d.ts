import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import type { AccessoryType } from './types';
export declare class vdpPlatform implements DynamicPlatformPlugin {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly Service: typeof Service;
    readonly Characteristic: typeof Characteristic;
    readonly accessories: PlatformAccessory[];
    deviceCount: number;
    private periodicDiscovery;
    constructor(log: Logger, config: PlatformConfig, api: API);
    configureAccessory(accessory: PlatformAccessory): void;
    refreshDeviceConfiguration(): Promise<AccessoryType>;
    discoverDevices(): Promise<void>;
}
//# sourceMappingURL=platform.d.ts.map