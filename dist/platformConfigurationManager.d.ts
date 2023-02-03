import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
export declare class platformConfigurationManager {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    private configurationInfo;
    private deviceList;
    private lastUpdated;
    constructor(log: Logger, config: PlatformConfig, api: API);
    update(): boolean;
    refresh(): boolean;
    scan(timeout?: number): PlatformAccessory[];
}
//# sourceMappingURL=platformConfigurationManager.d.ts.map