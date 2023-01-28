"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hkDiscovery = void 0;
const hap_controller_1 = require("hap-controller");
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 *
 *
 *
 *

const { IPDiscovery } = require('hap-controller');

const discovery = new IPDiscovery();

discovery.on('serviceUp', (service) => {
    console.log('Found device:', service);
});

discovery.start();

*
 *
 *
 *
 *
 *
 *
 */
const discovery = new hap_controller_1.IPDiscovery();
class hkDiscovery {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        // private service: Service;
        this.exampleStates = {
            On: false,
        };
        discovery.on('serviceUp', (service) => {
            this.platform.log.debug('Found device:', service);
        });
        discovery.start();
    }
}
exports.hkDiscovery = hkDiscovery;
//# sourceMappingURL=hkDiscovery.js.map