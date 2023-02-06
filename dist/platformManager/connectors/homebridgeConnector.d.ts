import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
import { PluginSchema } from '../../platformInterfaces/platformInterfaces';
import { platformConnector } from './platformConnector';
export declare class homebridgeConnector extends platformConnector {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    name: string;
    protected deviceList: PlatformAccessory[];
    private cachedConfigurationTimeStamp;
    private cachedConfigurationFile;
    private cachedConfigurationData;
    private cachedPlatformIndex;
    mockPluginSchema: PluginSchema;
    constructor(log: Logger, config: PlatformConfig, api: API);
    protected initialize(): Promise<void>;
    status(): Promise<boolean | void>;
    refresh(): Promise<void>;
    get(): Promise<PlatformAccessory[]>;
    update(): Promise<boolean | void>;
}
//# sourceMappingURL=homebridgeConnector.d.ts.map