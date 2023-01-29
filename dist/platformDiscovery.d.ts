import { API, Logger, PlatformConfig } from 'homebridge';
import type { platformDevice } from './types';
export declare class platformDiscovery {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    constructor(log: Logger, config: PlatformConfig, api: API);
    scan(timeout?: number): Promise<platformDevice[]>;
}
//# sourceMappingURL=platformDiscovery.d.ts.map