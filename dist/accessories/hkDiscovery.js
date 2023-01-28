"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hkDiscovery = void 0;
const hap_controller_1 = require("hap-controller");
const discovery = new hap_controller_1.IPDiscovery();
const pairingData = {
    AccessoryPairingID: '...',
    AccessoryLTPK: '...',
    iOSDevicePairingID: '...',
    iOSDeviceLTSK: '...',
    iOSDeviceLTPK: '...',
};
class hkDiscovery {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        discovery.on('serviceUp', async (service) => {
            this.platform.log.debug(`Found device: ${service.name}`);
            const client = new hap_controller_1.HttpClient(service.id, service.address, service.port);
            try {
                await client.identify();
                client.close(); // Not needed if only identify was called, else needed
                this.platform.log.debug(`${service.name}: Done!`);
            }
            catch (e) {
                this.platform.log.error(`${service.name}:`, e);
            }
        });
        discovery.start();
    }
}
exports.hkDiscovery = hkDiscovery;
//# sourceMappingURL=hkDiscovery.js.map