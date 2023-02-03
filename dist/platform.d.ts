import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
export declare class platform implements DynamicPlatformPlugin {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly Service: typeof Service;
    readonly Characteristic: typeof Characteristic;
    readonly accessories: PlatformAccessory[];
    deviceCount: number;
    private periodicDiscovery;
    constructor(log: Logger, config: PlatformConfig, api: API);
    discoverDevices(): Promise<void>;
    configureAccessory(accessory: PlatformAccessory): void;
}
//# sourceMappingURL=platform.d.ts.map