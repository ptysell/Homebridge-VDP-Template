import { API, Logger, PlatformAccessory, PlatformConfig } from 'homebridge';
import { platform } from './platform';
export declare class platformManager {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly platform: platform;
    readonly accessories: PlatformAccessory[];
    private discoveredAccessories;
    private changeStatus;
    private platformDiscoverer;
    constructor(log: Logger, config: PlatformConfig, api: API, platform: platform);
    refresh(): Promise<void>;
    accessoryExistsByUUID(UUID: string): boolean;
    accessoryExists(accessory: PlatformAccessory): boolean;
    accessoryCount(): number;
    getAccessories(): PlatformAccessory[];
    getAccessoryByUUID(UUID: string): PlatformAccessory;
    getAccessoryIndex(accessory: PlatformAccessory): number;
    addAccessories(accessories: PlatformAccessory[]): void;
    addAccessory(accessory: PlatformAccessory): void;
    removerAccessories(accessories: PlatformAccessory[]): void;
    removeAccessory(accessory: PlatformAccessory): void;
    prune(): void;
    pruneAccessories(accessories: PlatformAccessory[]): void;
    pruneAccessory(accessory: PlatformAccessory): void;
    updateAccessories(accessories: PlatformAccessory[]): void;
    updateAccessory(accessory: PlatformAccessory): void;
    configureAccessories(accessories: PlatformAccessory[]): void;
    configureAccessory(accessory: PlatformAccessory): void;
}
//# sourceMappingURL=platformManager.d.ts.map