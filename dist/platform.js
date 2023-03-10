"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platform = void 0;
const homebridgeConnector_1 = require("./platformManager/connectors/homebridgeConnector");
class platform {
    // private platformManager: platformManager;
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
            //log.debug('Executed didFinishLaunching callback');
            //this.discoverDevices();
            this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);
        });
        this.platformDiscoverer = new homebridgeConnector_1.homebridgeConnector(this.log, this.config, this.api);
        // this.platformManager = new platformManager(this.log, this.config, this.api, this);
        // this.platformManager.refresh();
    }
    async discoverDevices() {
        //const platformDiscoverer = new platformDiscovery(this.log, this.config, this.api);
        // const deviceList: PlatformAccessory[] = await this.platformDiscoverer.scan(2000);
        // this.pruneAccessories(deviceList);
        if (await this.platformDiscoverer.status()) {
            this.log.warn('[platform]<discoverDevices>(platformDiscoverer Returned True) | Refresh');
            await this.platformDiscoverer.refresh();
        }
        else {
            this.log.warn('[platform]<discoverDevices>(platformDiscoverer Returned False) | No Action');
        }
        // const discoverDevices = this.platformManager.getAccessories;
        // for (const accessory of discoverDevices) {
        //   const existingAccessory = this.accessories.find(searchAccessory => searchAccessory.UUID === accessory.UUID);
        //   if(existingAccessory){
        //     this.log.error('Found Existing Platform Accessory:', existingAccessory.displayName);
        //     new platformAccessory(this, existingAccessory);
        //   } else{
        //     this.log.error('Registering New Platform Accessory:', device.displayName);
        //     const accessory = new this.api.platformAccessory(device.displayName, device.UUID);
        //     accessory.context.device = device;
        //     new platformAccessory(this, accessory);
        //     this.addAccessory(accessory);
        //   }
        // }
    }
    // //---------------Configure Methods---------------
    // configureAccessories(accessories: PlatformAccessory[]) {
    //   this.log.info('Configuring Platform Accessories:', accessories.length);
    // }
    configureAccessory(accessory) {
        this.log.info('Configuring Platform Accessories:', accessory.displayName);
        //this.log.info('Loading accessory from cache:', accessory.displayName);
        //this.accessories.push(accessory);
    }
}
exports.platform = platform;
//# sourceMappingURL=platform.js.map