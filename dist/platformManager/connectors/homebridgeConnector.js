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
        this.log.debug('[homebridgeConnector]<initalize>(Start of Function)');
        this.log.debug('[homebridgeConnector]<initalize>Getting Configuration File TimeStamp');
        this.cachedConfigurationTimeStamp = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
        this.log.debug('[homebridgeConnector]<initalize>Getting Configuration File');
        this.cachedConfigurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
        const currentConfigurationFile = JSON.parse(this.cachedConfigurationFile);
        const platformIndex = currentConfigurationFile.platforms.findIndex((platformConfigurationPlatforms) => platformConfigurationPlatforms.platform === platformSettings_1.PLATFORM_NAME);
        this.log.error('----------Start Platform----------');
        this.log.error('Name:', currentConfigurationFile.platforms[platformIndex].name);
        this.log.error('Platform Name:', currentConfigurationFile.platforms[platformIndex].platform);
        this.log.error('Data:', JSON.stringify(currentConfigurationFile.platforms[platformIndex]));
        this.log.error('----------End Platform----------');
        this.log.debug('[homebridgeConnector]<initalize>(End of Function)');
    }
    async loadConfigurationFromJSON(configurationFile) {
        return;
    }
    async status() {
        this.log.error('[homebridgeConnector]<status> Method not implemented.');
        return true;
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