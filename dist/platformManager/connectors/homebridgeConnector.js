"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homebridgeConnector = void 0;
const platformSettings_1 = require("../../platformSettings");
const fs_1 = __importDefault(require("fs"));
const platformConnector_1 = require("./platformConnector");
class homebridgeConnector extends platformConnector_1.platformConnector {
    constructor(log, config, api) {
        super(log, config, api, platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH);
        this.log = log;
        this.config = config;
        this.api = api;
        this.deviceList = [];
        this.name = 'homebridgeConnector';
        this.cachedConfigurationTimeStamp = 0;
        this.cachedConfigurationFile = '';
        this.cachedPlatformFile = '';
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);
        for (const platform of this.cachedConfigurationData.platforms) {
            if (platform.platform === platformSettings_1.PLATFORM_NAME) {
                this.cachedPlatformFile = JSON.stringify(platform);
                break;
            }
        }
        this.platformIndex = this.cachedConfigurationData.platforms.findIndex(searchPlatform => searchPlatform.platform === platformSettings_1.PLATFORM_NAME);
        this.cachedPlatformData = JSON.parse(this.cachedPlatformFile);
        for (const accessory of this.cachedPlatformData.accessories) {
            if (accessory.uuid === 'N/A') {
                accessory.uuid = this.api.hap.uuid.generate(accessory.name + Math.random);
            }
            this.log.debug('Loading Accessory: ' + accessory.name + ' with UUID ' + accessory.uuid);
        }
        this.cachedConfigurationData.platforms[this.platformIndex] = this.cachedPlatformData;
        fs_1.default.writeFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);
    }
    async status() {
        if (this.cachedConfigurationTimeStamp !== fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs) {
            return true;
        }
        return false;
    }
    async refresh() {
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);
        for (const platform of this.cachedConfigurationData.platforms) {
            if (platform.platform === platformSettings_1.PLATFORM_NAME) {
                this.cachedPlatformFile = JSON.stringify(platform);
                break;
            }
        }
        this.cachedPlatformData = JSON.parse(this.cachedPlatformFile);
        for (const accessory of this.cachedPlatformData.accessories) {
            if (accessory.uuid === 'N/A') {
                accessory.uuid = this.api.hap.uuid.generate(accessory.name + Math.random);
            }
            this.log.debug('Loading Accessory: ' + accessory.name + ' with UUID ' + accessory.uuid);
        }
        this.cachedConfigurationData.platforms[this.platformIndex] = this.cachedPlatformData;
        fs_1.default.writeFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);
    }
    async get() {
        this.log.error('[homebridgeConnector]<get> Method not implemented.');
        return this.deviceList;
    }
    async update() {
        this.log.error('[homebridgeConnector]<update> Method not implemented.');
    }
}
exports.homebridgeConnector = homebridgeConnector;
//# sourceMappingURL=homebridgeConnector.js.map