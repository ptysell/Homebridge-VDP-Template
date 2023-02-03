import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
export declare class platformConfigurationManager {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    private configurationInfo;
    private deviceList;
    refresh: boolean;
    private lastUpdated;
    constructor(log: Logger, config: PlatformConfig, api: API);
    initialize(): Promise<void>;
    update(): boolean;
    scan(timeout?: number): Promise<PlatformAccessory[]>;
}
//# sourceMappingURL=platformConfigurationManager.d.ts.map