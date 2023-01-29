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
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
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
        // eslint-disable-next-line prefer-const
        //let deviceList2: AccessoryType[] = this.refreshDeviceConfiguration();
        this.log.debug('DeviceList Count:', deviceList.length);
        this.log.debug('DeviceList Name0:', deviceList[0].name);
        // loop over the discovered devices and register each one if it has not already been registered
        for (let index = 0; index < deviceList.length; index++) {
            // generate a unique id for the accessory this should be generated from
            // something globally unique, but constant, for example, the device serial
            // number or MAC address
            //const uuid = this.api.hap.uuid.generate(deviceList2[index].uuid);
            this.log.info('Device UUID-----', deviceList[index].uuid);
            const uuid = deviceList[index].uuid;
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            this.log.info('Existing UUID-----', existingAccessory === null || existingAccessory === void 0 ? void 0 : existingAccessory.UUID);
            if (existingAccessory) {
                this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                // this is imported from `platformAccessory.ts`
                new platformAccessory_1.platformAccessory(this, existingAccessory);
            }
            else {
                this.log.info('Adding new accessory:', deviceList[index].name);
                const accessory = new this.api.platformAccessory(deviceList[index].name, uuid);
                this.log.info('Adding accessory context:', deviceList[index].name);
                accessory.context.device = deviceList[index];
                // create the accessory handler for the newly create accessory
                // this is imported from `platformAccessory.ts`
                this.log.info('Adding new vdpTemplateAccessory:', deviceList[index].name);
                new platformAccessory_1.platformAccessory(this, accessory);
                this.log.info('Registering platform accessory:', deviceList[index].name);
                this.api.registerPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
            }
        }
    }
    async createNewAccessory() {
    }
    registerExistingAccessory() {
    }
}
exports.vdpPlatform = vdpPlatform;
//# sourceMappingURL=platform.js.map