import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
export declare class platformConfigurationManager {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    private configurationFile;
    private deviceList;
    private lastUpdated;
    constructor(log: Logger, config: PlatformConfig, api: API);
    update(): Promise<boolean>;
    refresh(): boolean;
    scan(timeout?: number): Promise<PlatformAccessory[]>;
}
//# sourceMappingURL=platformConfigurationManager.d.ts.map