import { API, Logger, PlatformConfig } from 'homebridge';
import { IPlatformAccessory } from '../../platformInterfaces/platformInterfaces';
export declare abstract class platformConnector {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly resourcePath: string;
    abstract name: string;
    protected abstract deviceList: IPlatformAccessory[];
    constructor(log: Logger, config: PlatformConfig, api: API, resourcePath: string);
    protected abstract initialize(): Promise<void>;
    abstract status(): Promise<boolean | void>;
    abstract refresh(): Promise<void>;
    abstract get(): Promise<IPlatformAccessory[]>;
    abstract update(): Promise<boolean | void>;
}
//# sourceMappingURL=platformConnector.d.ts.map