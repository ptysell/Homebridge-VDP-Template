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
    refresh(): Promise<boolean>;
    scan(): Promise<PlatformAccessory[]>;
}
//# sourceMappingURL=platformConfigurationManager.d.ts.map