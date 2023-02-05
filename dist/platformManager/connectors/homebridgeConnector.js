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
        this.name = 'homebridgeConnector';
        this.deviceList = [];
        this.cachedConfigurationTimeStamp = 0;
        this.cachedConfigurationFile = '';
        this.cachedConfigurationData = '';
        //this.initialize();
    }
    async initialize() {
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        const currentConfigurationFile = JSON.parse(this.cachedConfigurationFile);
        const platformIndex = currentConfigurationFile.platforms.findIndex((platformConfigurationPlatforms) => platformConfigurationPlatforms.platform === platformSettings_1.PLATFORM_NAME);
        for (let accessoryIndex = 0; accessoryIndex < currentConfigurationFile.platforms[platformIndex].accessories.length; accessoryIndex++) {
            if (currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid === 'N/A') {
                currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid =
                    this.api.hap.uuid.generate(currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].name + Math.random);
            }
            //this.deviceList.push()
        }
        fs_1.default.writeFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(currentConfigurationFile));
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    }
    async loadConfigurationFromJSON(configurationFile) {
        return;
    }
    async status() {
        this.log.warn('[homebridgeConnector]<status> Start');
        this.log.warn('[homebridgeConnector]<status>(cachedConfigurationTimeStamp) Value:', this.cachedConfigurationTimeStamp);
        this.log.warn('[homebridgeConnector]<status>(fs.statSync) Value:', fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs);
        this.log.warn('[homebridgeConnector]<status> -----------------------------');
        if (this.cachedConfigurationTimeStamp !== fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs) {
            return true;
        }
        return false;
    }
    async refresh() {
        this.log.error('[homebridgeConnector]<refresh> Method not implemented.');
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