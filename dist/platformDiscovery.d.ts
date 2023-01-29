import { API, Logger, PlatformConfig } from 'homebridge';
import type { AccessoryType } from './types';
export declare class platformDiscovery {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    constructor(log: Logger, config: PlatformConfig, api: API);
    scan(timeout?: number): Promise<AccessoryType[]>;
}
//# sourceMappingURL=platformDiscovery.d.ts.map