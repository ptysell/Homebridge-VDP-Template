import { API, Logger, PlatformConfig } from 'homebridge';
import { IPlatformAccessory } from '../../platformInterfaces/platformInterfaces';
import { platformConnector } from './platformConnector';
export declare class homebridgeConnector extends platformConnector {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    protected deviceList: IPlatformAccessory[];
    name: string;
    private cachedConfigurationTimeStamp;
    private cachedConfigurationFile;
    private cachedConfigurationData;
    private cachedPlatformFile;
    private cachedPlatformData;
    constructor(log: Logger, config: PlatformConfig, api: API);
    status(): Promise<boolean | void>;
    refresh(): Promise<void>;
    get(): Promise<IPlatformAccessory[]>;
    update(): Promise<boolean | void>;
}
//# sourceMappingURL=homebridgeConnector.d.ts.map