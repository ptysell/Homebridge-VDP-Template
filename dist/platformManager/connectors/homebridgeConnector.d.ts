import { API, Logger, PlatformConfig, PlatformAccessory, UnknownContext } from 'homebridge';
import { platformConnector } from './platformConnector';
export declare class homebridgeConnector extends platformConnector {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    name: string;
    protected deviceList: PlatformAccessory<UnknownContext>[];
    private cachedConfigurationTimeStamp;
    private cachedConfigurationFile;
    private cachedConfigurationData;
    constructor(log: Logger, config: PlatformConfig, api: API);
    protected firstRun(): void;
    protected initialize(): Promise<void>;
    private loadConfigurationFromJSON;
    status(): Promise<boolean | void>;
    refresh(): Promise<void>;
    get(): Promise<PlatformAccessory[]>;
    update(): Promise<boolean | void>;
}
//# sourceMappingURL=homebridgeConnector.d.ts.map