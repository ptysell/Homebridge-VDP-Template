"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vdpPlatform = void 0;
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
        this.log.error('Config Accessory Count:', deviceList.length);
        this.log.error('Platform Accessory Count:', this.accessories.length);
        for (const device of deviceList) {
            const name = device.name;
            const uuid = device.uuid;
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
            }
            else {
            }
        }
        // for (let index=0; index < deviceList.length; index++) {
        //   const uuid = deviceList[index].uuid;
        //   const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
        //   if (existingAccessory) {
        //     this.log.info('Restoring platformAccessory from cache:', existingAccessory);
        //     new vdpAccessory(this, existingAccessory);
        //   } else {
        //     const accessory = new this.api.platformAccessory(deviceList[index].name, deviceList[index].uuid);
        //     this.log.warn('New platformAccessory Name:', accessory.displayName);
        //     this.log.warn('New platformAccessory UUID:', accessory.UUID);
        //     new vdpAccessory(this, accessory);
        //     this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        //   }
        // }
    }
}
exports.vdpPlatform = vdpPlatform;
//# sourceMappingURL=platform.js.map