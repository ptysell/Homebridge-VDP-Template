"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homebridgeConnector = void 0;
const platformSettings_1 = require("../../platformSettings");
const fs_1 = __importDefault(require("fs"));
const platformConnector_1 = require("./platformConnector");
//import { platformAccessory } from '../../platformAccessory';
class homebridgeConnector extends platformConnector_1.platformConnector {
    constructor(log, config, api) {
        super(log, config, api, platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH);
        this.log = log;
        this.config = config;
        this.api = api;
        this.name = 'homebridgeConnector';
        this.deviceList = [];
        this.cachedConfigurationTimeStamp = 0;
        this.cachedConfigurationFile = '';
        this.cachedPlatformIndex = -1;
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);
        for (let index = 0; index < this.cachedConfigurationData.platforms.length; index++) {
            this.log.warn('Platform Name:', this.cachedConfigurationData.platforms[index].name);
            if (this.cachedConfigurationData.platforms[index].platform === platformSettings_1.PLATFORM_NAME) {
                this.cachedPlatformIndex = index;
            }
        }
        if (this.cachedPlatformIndex === -1) {
            throw new Error('[homebridgeConnector]<constructor> PLATFORM_NAME does not exist in config.json');
        }
        for (let index = 0; index < this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories.length; index++) {
            if (this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].uuid === 'N/A') {
                this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].uuid =
                    this.api.hap.uuid.generate(this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].name + Math.random);
            }
        }
        fs_1.default.writeFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
        this.log.warn('JSON:', JSON.stringify(this.cachedConfigurationData));
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);
    }
    async initialize() {
        // this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        // this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        // const currentConfigurationFile: platformConfiguration = JSON.parse(this.cachedConfigurationFile);
        // const platformIndex = currentConfigurationFile.platforms.findIndex(
        //   (platformConfigurationPlatforms) => platformConfigurationPlatforms.platform === PLATFORM_NAME,
        // );
        // for (let accessoryIndex=0; accessoryIndex < currentConfigurationFile.platforms[platformIndex].accessories.length; accessoryIndex++){
        //   if (currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid === 'N/A') {
        //     currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid =
        //     this.api.hap.uuid.generate(currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].name + Math.random);
        //   }
        //   //this.deviceList.push()
        // }
        // fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(currentConfigurationFile));
        // this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    }
    // private async loadConfigurationFromJSON(configurationFile: string): Promise<boolean | void> {
    //   return;
    // }
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
        for (let index = 0; index < this.cachedConfigurationData.platforms.length; index++) {
            this.log.warn('Platform Name:', this.cachedConfigurationData.platforms[index].name);
            if (this.cachedConfigurationData.platforms[index].platform === platformSettings_1.PLATFORM_NAME) {
                this.cachedPlatformIndex = index;
            }
        }
        if (this.cachedPlatformIndex === -1) {
            throw new Error('[homebridgeConnector]<constructor> PLATFORM_NAME does not exist in config.json');
        }
        for (let index = 0; index < this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories.length; index++) {
            if (this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].uuid === 'N/A') {
                this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].uuid =
                    this.api.hap.uuid.generate(this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].name + Math.random);
            }
        }
        fs_1.default.writeFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
        this.log.warn('JSON:', JSON.stringify(this.cachedConfigurationData));
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