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
    refreshDeviceConfiguration() {
        this.log.info('Refreshing Configuration File');
        const deviceList = [];
        const configFile = JSON.parse(fs_1.default.readFileSync(settings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
        for (let index = 0; index < configFile.platforms.length; index++) {
            if (configFile.platforms[index].name === this.config.name) {
                this.log.debug('Platform Name:', configFile.platforms[index].name);
                this.log.debug('Device Count:', configFile.platforms[index].devices.length);
                for (let index2 = 0; index2 < configFile.platforms[index].devices.length; index2++) {
                    const deviceName = configFile.platforms[index].devices[index2].name;
                    const deviceUUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
                    this.log.debug('Device Name:', deviceName);
                    this.log.debug('Device UUID:', deviceUUID);
                    deviceList.push({ name: deviceName, uuid: deviceUUID });
                }
            }
        }
        return deviceList;
    }
    async discoverDevices() {
        const deviceList2 = this.refreshDeviceConfiguration();
        this.log.debug('DeviceList Count:', deviceList2.length);
        this.log.debug('DeviceList Name0:', deviceList2[0].name);
        // loop over the discovered devices and register each one if it has not already been registered
        for (let index = 0; index < deviceList2.length; index++) {
            // generate a unique id for the accessory this should be generated from
            // something globally unique, but constant, for example, the device serial
            // number or MAC address
            const uuid = this.api.hap.uuid.generate(deviceList2[index].uuid);
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
                this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                // this is imported from `platformAccessory.ts`
                new platformAccessories_1.vdpTemplateAccessory(this, existingAccessory);
            }
            else {
                this.log.info('Adding new accessory:', deviceList2[index].name);
                const accessory = new this.api.platformAccessory(deviceList2[index].name, uuid);
                accessory.context.device = deviceList2[index];
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