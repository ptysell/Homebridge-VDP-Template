import { API, Logger, PlatformConfig } from 'homebridge';
import { platformAccessory } from '../../platformInterfaces/platformInterfaces';
import { platformConnector } from './platformConnector';
export declare class homebridgeConnector extends platformConnector {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    protected deviceList: platformAccessory[];
    name: string;
    protected devplatformAccessories: platformAccessory[];
    private cachedConfigurationTimeStamp;
    private cachedConfigurationFile;
    private cachedConfigurationData;
    private cachedPlatformIndex;
    constructor(log: Logger, config: PlatformConfig, api: API);
    protected initialize(): Promise<void>;
    status(): Promise<boolean | void>;
    refresh(): Promise<void>;
    get(): Promise<platformAccessory[]>;
    update(): Promise<boolean | void>;
}
//# sourceMappingURL=homebridgeConnector.d.ts.map