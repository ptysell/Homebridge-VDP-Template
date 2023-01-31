import { API, Logger, PlatformAccessory, PlatformConfig } from 'homebridge';
export declare class platformManager {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly accessories: PlatformAccessory[];
    private discoveredAccessories;
    private changeStatus;
    private platformDiscoverer;
    constructor(log: Logger, config: PlatformConfig, api: API);
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