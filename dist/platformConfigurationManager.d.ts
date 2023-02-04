import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
export declare class platformConfigurationManager {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    private configurationFile;
    private deviceList;
    private lastUpdated;
    private updateStatus;
    private lastModifed;
    constructor(log: Logger, config: PlatformConfig, api: API);
    /**
     * Checks if a file/folder was changed
     */
    checkFileModified(): Promise<boolean>;
    update(): Promise<boolean>;
    refresh(): Promise<boolean>;
    scan(): Promise<PlatformAccessory[]>;
}
//# sourceMappingURL=platformConfigurationManager.d.ts.map