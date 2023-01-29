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
    configureAccessories(accessory) {
        this.log.info('Method: configureAccessories');
    }
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }
    addAccessories(accessory) {
        this.log.info('Method: registerAccessories');
    }
    addAccessory(accessory) {
        this.log.info('Method: registerAccessory');
    }
    updateAccessories(accessory) {
        this.log.info('Method: updateAccessories');
    }
    updateAccessory(accessory) {
        this.log.info('Method: updateAccessory');
    }
    unregisterAccessories(accessory) {
        this.log.info('Method: unregisterAccessories');
    }
    removeAccessory(accessory) {
        this.log.info('Unregistering Platform Accessory:', accessory.displayName);
        this.api.unregisterPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
        let index = 0;
        for (const device of this.accessories) {
            if (device.UUID === accessory.UUID) {
                this.log.info('Removing Platform Accessory:', accessory.displayName);
                this.accessories.splice(index, 1);
            }
            index++;
        }
    }
    async pruneAccessories(deviceList) {
        let index = 0;
        for (const device of this.accessories) {
            const existingAccessory = deviceList.find(accessory => accessory.uuid === device.UUID);
            if (!existingAccessory) {
                this.log.info('Pruning Platform Accessory:', device.displayName, 'at index', index);
                //this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, existingAccessory);
                this.accessories.splice(index, 1);
            }
            index++;
        }
    }
    async discoverDevices() {
        const pendingUpdate = new Set();
        const recentlyRegisteredDevices = new Set();
        const registeredDevices = 0;
        const newDevices = 0;
        const unseenDevices = 0;
        const scans = 0;
        const platformDiscoverer = new platformDiscovery_1.platformDiscovery(this.log, this.config, this.api);
        const deviceList = await platformDiscoverer.scan(2000);
        this.pruneAccessories(deviceList);
        this.log.error('Config Accessory Count:', deviceList.length);
        this.log.error('Platform Accessory Count:', this.accessories.length);
        for (const device of deviceList) {
            const name = device.name;
            //const uuid = device.uuid;
            const uuid = this.api.hap.uuid.generate(device.displayName);
            const displayName = device.displayName;
            let isExisting = '';
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
                isExisting = 'Yes';
            }
            else {
                isExisting = 'No';
            }
            this.log.error('---------------------------------');
            this.log.warn('Device Name:', name);
            this.log.warn('Device UUID:', uuid);
            this.log.warn('Device Display Name:', displayName);
            this.log.warn('Existing Accessory:', isExisting);
            this.log.error('---------------------------------');
            if (existingAccessory) {
                this.log.error('Found Existing Platform Accessory');
            }
            else {
                this.log.error('Registering New Platform Accessory');
                const accessory = new this.api.platformAccessory(device.displayName, uuid);
                accessory.context.device = device;
                new platformAccessory_1.vdpAccessory(this, accessory);
                this.api.registerPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
                this.log.error('Push New Platform Accessory');
                this.accessories.push(accessory);
            }
        }
    }
}
exports.vdpPlatform = vdpPlatform;
//# sourceMappingURL=platform.js.map