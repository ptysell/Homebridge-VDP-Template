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
    private platformDiscoverer;
    constructor(log: Logger, config: PlatformConfig, api: API);
    configureAccessories(accessories: PlatformAccessory[]): void;
    configureAccessory(accessory: PlatformAccessory): void;
    addAccessories(accessories: PlatformAccessory[]): void;
    addAccessory(accessory: PlatformAccessory): void;
    updateAccessories(accessories: PlatformAccessory[]): void;
    updateAccessory(accessory: PlatformAccessory): void;
    removerAccessories(accessories: PlatformAccessory[]): void;
    removeAccessory(accessory: PlatformAccessory): void;
    pruneAccessories(accessories: PlatformAccessory[]): void;
    discoverDevices(): Promise<void>;
}
//# sourceMappingURL=platform.d.ts.map