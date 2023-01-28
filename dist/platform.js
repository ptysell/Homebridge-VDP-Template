"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vdpPlatform = void 0;
const settings_1 = require("./settings");
const platformAccessories_1 = require("./platformAccessories");
const fs_1 = __importDefault(require("fs"));
class vdpPlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.accessories = [];
        this.deviceCount = 0;
        this.periodicDiscovery = null;
        this.log.debug('Finished initializing platform:', this.config.name);
        this.api.on('didFinishLaunching', () => {
            log.debug('Executed didFinishLaunching callback');
            this.discoverDevices();
        });
        this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);
    }
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }
    refreshConfiguratioon() {
        this.log.error('Refreshing Configuration.....');
    }
    async discoverDevices() {
        const config2 = JSON.parse(fs_1.default.readFileSync(settings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
        this.log.error(config2);
        this.deviceCount = this.config.devices.length;
        this.log.error('Device Count:', this.deviceCount);
        // EXAMPLE ONLY
        // A real plugin you would discover accessories from the local network, cloud services
        // or a user-defined array in the platform config.
        const deviceList2 = [
            {
                exampleUniqueId: 'ABCD',
                exampleDisplayName: 'Test Accessory 01',
            },
        ];
        // loop over the discovered devices and register each one if it has not already been registered
        for (const device of deviceList2) {
            // generate a unique id for the accessory this should be generated from
            // something globally unique, but constant, for example, the device serial
            // number or MAC address
            const uuid = this.api.hap.uuid.generate(device.exampleUniqueId);
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
                this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                // this is imported from `platformAccessory.ts`
                new platformAccessories_1.vdpTemplateAccessory(this, existingAccessory);
            }
            else {
                this.log.info('Adding new accessory:', device.exampleDisplayName);
                const accessory = new this.api.platformAccessory(device.exampleDisplayName, uuid);
                accessory.context.device = device;
                // create the accessory handler for the newly create accessory
                // this is imported from `platformAccessory.ts`
                new platformAccessories_1.vdpTemplateAccessory(this, accessory);
                this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
            }
        }
    }
}
exports.vdpPlatform = vdpPlatform;
//# sourceMappingURL=platform.js.map