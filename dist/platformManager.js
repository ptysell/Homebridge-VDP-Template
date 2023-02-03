"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformManager = void 0;
//import { platformAccessory } from './platformAccessory';
const platformSettings_1 = require("./platformSettings");
const platformConfigurationManager_1 = require("./platformConfigurationManager");
const platformAccessory_1 = require("./platformAccessory");
class platformManager {
    constructor(log, config, api, platform) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.platform = platform;
        this.accessories = [];
        this.discoveredAccessories = [];
        this.changeStatus = true;
        this.platformDiscoverer = new platformConfigurationManager_1.platformConfigurationManager(this.log, this.config, this.api);
        this.initialize();
    }
    //      this.accessories.sort((a, b) => a.displayName.localeCompare(b.displayName));
    async initialize() {
        try {
            if (this.platformDiscoverer.refresh()) {
                const newAccessoires = [];
                this.discoveredAccessories = await this.platformDiscoverer.scan(300);
                for (const accessory of this.discoveredAccessories) {
                    if (!this.accessoryExistsByUUID(accessory.UUID)) {
                        newAccessoires.push(accessory);
                    }
                }
                this.addAccessories(newAccessoires);
                //this.pruneAccessories(this.discoveredAccessories);
            }
        }
        catch (error) {
            this.log.error('');
        }
    }
    async refresh() {
        try {
            if (this.platformDiscoverer.refresh()) {
                const newAccessoires = [];
                this.discoveredAccessories = await this.platformDiscoverer.scan(300);
                for (const accessory of this.discoveredAccessories) {
                    if (!this.accessoryExistsByUUID(accessory.UUID)) {
                        newAccessoires.push(accessory);
                    }
                }
                this.addAccessories(newAccessoires);
                this.pruneAccessories(this.discoveredAccessories);
            }
        }
        catch (error) {
            this.log.error('');
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    accessoryExistsByUUID(UUID) {
        try {
            if (this.accessories.find(searchAccessory => searchAccessory.UUID === UUID)) {
                return true;
            }
        }
        catch (error) {
            this.log.error('');
        }
        return false;
    }
    accessoryExists(accessory) {
        try {
            return this.accessoryExistsByUUID(accessory.UUID);
        }
        catch (error) {
            this.log.error('');
        }
        throw new Error('');
    }
    accessoryCount() {
        try {
            return this.accessories.length;
        }
        catch (error) {
            this.log.error('');
        }
        throw new Error('');
    }
    getAccessories() {
        try {
            return this.accessories;
        }
        catch (error) {
            this.log.error('');
        }
        throw new Error('');
    }
    getAccessoryByUUID(UUID) {
        try {
            const existingAccessory = this.accessories.find(searchAccessory => searchAccessory.UUID === UUID);
            if (existingAccessory) {
                return existingAccessory;
            }
        }
        catch (error) {
            this.log.error('');
        }
        throw new Error('');
    }
    getAccessoryIndex(accessory) {
        try {
            return this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID);
        }
        catch (error) {
            this.log.error('');
        }
        throw new Error('');
    }
    addAccessories(accessories) {
        try {
            for (const accessory of accessories) {
                this.addAccessory(accessory);
            }
        }
        catch (error) {
            this.log.error('');
        }
    }
    addAccessory(accessory) {
        this.log.info('Adding Platform Accessory:', accessory.displayName);
        try {
            if (!this.accessoryExistsByUUID(accessory.UUID)) {
                this.api.registerPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
                new platformAccessory_1.platformAccessory(this.platform, accessory);
                this.accessories.push(accessory);
            }
            else {
                throw new Error('Accessory ' + accessory.displayName + ' Already Exists');
            }
        }
        catch (error) {
            this.log.error('Error Adding Platform Accessory:', accessory.displayName, ' | ', error);
        }
    }
    removerAccessories(accessories) {
        this.log.info('Removing Platform Accessories:', accessories.length, ' from ', this.accessories.length);
        try {
            for (const accessory of accessories) {
                this.removeAccessory(accessory);
            }
        }
        catch (error) {
            this.log.error('');
        }
    }
    removeAccessory(accessory) {
        this.log.info('Removing Platform Accessory:', accessory.displayName);
        try {
            if (this.accessoryExistsByUUID(accessory.UUID)) {
                this.api.unregisterPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
                this.accessories.splice(this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID), 1);
            }
            else {
                throw new Error('Accessory Does Not Exists');
            }
        }
        catch (error) {
            this.log.error('Error Removing Platform Accessory:', accessory.UUID, ' | ', error);
        }
    }
    prune() {
    }
    pruneAccessories(accessories) {
        this.log.info('Pruning Platform Accessories:', accessories.length, ' from ', this.accessories.length);
        try {
            for (const accessory of accessories) {
                this.pruneAccessory(accessory);
            }
        }
        catch (error) {
            this.log.error('');
        }
    }
    pruneAccessory(accessory) {
        this.log.info('Pruning Platform Accessory:', accessory.displayName);
        try {
            if (!this.accessoryExistsByUUID(accessory.UUID)) {
                this.api.unregisterPlatformAccessories(platformSettings_1.PLUGIN_NAME, platformSettings_1.PLATFORM_NAME, [accessory]);
                this.accessories.splice(this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID), 1);
            }
            else {
                throw new Error('Accessory Does Not Exists');
            }
        }
        catch (error) {
            this.log.error('Error Pruning Platform Accessory:', accessory.UUID, ' | ', error);
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    updateAccessories(accessories) {
        this.log.info('Updating Platform Accessories:', accessories.length);
    }
    updateAccessory(accessory) {
        this.log.info('Updating Platform Accessories:', accessory.displayName);
    }
    configureAccessories(accessories) {
        this.log.info('Configuring Platform Accessories:', accessories.length);
    }
    configureAccessory(accessory) {
        this.log.info('Configuring Platform Accessories:', accessory.displayName);
        //this.log.info('Loading accessory from cache:', accessory.displayName);
        //this.accessories.push(accessory);
    }
}
exports.platformManager = platformManager;
//# sourceMappingURL=platformManager.js.map