"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vdpPlatform = void 0;
const platformSettings_1 = require("./platformSettings");
const platformAccessory_1 = require("./platformAccessory");
const platformDiscovery_1 = require("./platformDiscovery");
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
        this.log.info('Finished initializing platform:', this.config.name);
        this.api.on('didFinishLaunching', () => {
            log.debug('Executed didFinishLaunching callback');
            this.discoverDevices();
            this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);
        });
    }
    //---------------Configure Methods---------------
    configureAccessories(accessories) {
        this.log.info('Configuring Platform Accessories:', accessories.length);
    }
    configureAccessory(accessory) {
        this.log.info('Configuring Platform Accessories:', accessory.displayName);
        //this.log.info('Loading accessory from cache:', accessory.displayName);
        //this.accessories.push(accessory);
    }
    //---------------Add Methods---------------
    addAccessories(accessories) {
        this.log.info('Adding Platform Accessories:', accessories.length, ' to ', this.accessories.length);
        for (const accessory of accessories) {
            this.addAccessory(accessory);
        }
        this.log.info('Added Platform Accessories:', (this.accessories.length - accessories.length));
    }
    addAccessory(accessory) {
        this.log.info('Adding Platform Accessory:', accessory.displayName);
        this.api.registerPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
        this.accessories.push(accessory);
    }
    //---------------Update Methods---------------
    updateAccessories(accessories) {
        this.log.info('Updating Platform Accessories:', accessories.length);
    }
    updateAccessory(accessory) {
        this.log.info('Updating Platform Accessories:', accessory.displayName);
    }
    //---------------Remove Methods---------------
    removerAccessories(accessories) {
        this.log.info('Removing Platform Accessories:', accessories.length, ' of ', this.accessories.length);
        for (const accessory of accessories) {
            this.removeAccessory(accessory);
        }
        this.log.info('Platform Accessories:', this.accessories.length);
    }
    removeAccessory(accessory) {
        this.log.info('Removing Platform Accessory:', accessory.displayName);
        const accessoryIndex = this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID);
        this.api.unregisterPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
        this.accessories.splice(accessoryIndex, 1);
    }
    //---------------Prune Methods---------------
    async pruneAccessories(accessories) {
        this.log.info('Pruning Platform Accessories:', this.accessories.length, ' to ', accessories.length);
        for (const accessory of this.accessories) {
            const existingAccessory = accessories.find(searchAccessory => searchAccessory.UUID === accessory.UUID);
            if (existingAccessory) {
                this.log.info('Accessory', accessory.displayName, 'is current.');
            }
            else {
                this.log.info('Accessory', accessory.displayName, 'is not current.');
                this.removeAccessory(accessory);
            }
        }
        this.log.info('Platform Accessories:', this.accessories.length);
    }
    async discoverDevices() {
        const platformDiscoverer = new platformDiscovery_1.platformDiscovery(this.log, this.config, this.api);
        const deviceList = await platformDiscoverer.scan(2000);
        this.pruneAccessories(deviceList);
        for (const device of deviceList) {
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === device.UUID);
            if (existingAccessory) {
                this.log.error('Found Existing Platform Accessory:', existingAccessory.displayName);
                new platformAccessory_1.vdpAccessory(this, existingAccessory);
            }
            else {
                this.log.error('Registering New Platform Accessory:', device.displayName);
                const accessory = new this.api.platformAccessory(device.displayName, device.UUID);
                accessory.context.device = device;
                new platformAccessory_1.vdpAccessory(this, accessory);
                this.addAccessory(accessory);
            }
        }
    }
}
exports.vdpPlatform = vdpPlatform;
//# sourceMappingURL=platform.js.map