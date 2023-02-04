import { PlatformAccessory, UnknownContext } from 'homebridge';
import { platformConnector } from './platformConnector';
export declare class connectorHTTPJSON extends platformConnector {
    protected deviceList: PlatformAccessory<UnknownContext>[];
    name: string;
    protected initialize(): Promise<void>;
    status(): Promise<boolean | void>;
    refresh(): Promise<void>;
    get(): Promise<PlatformAccessory<UnknownContext>[]>;
    update(): Promise<boolean | void>;
}
//# sourceMappingURL=connectorHTTPJSON.d.ts.map