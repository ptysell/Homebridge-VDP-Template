import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import type { platformDevice } from './types';
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
    configureAccessories(accessory: PlatformAccessory[]): void;
    configureAccessory(accessory: PlatformAccessory): void;
    addAccessories(accessory: PlatformAccessory[]): void;
    addAccessory(accessory: PlatformAccessory): void;
    updateAccessories(accessory: PlatformAccessory[]): void;
    updateAccessory(accessory: PlatformAccessory): void;
    unregisterAccessories(accessory: PlatformAccessory[]): void;
    removeAccessory(accessory: PlatformAccessory): void;
    pruneAccessories(deviceList: platformDevice[]): Promise<void>;
    discoverDevices(): Promise<void>;
}
//# sourceMappingURL=platform.d.ts.map