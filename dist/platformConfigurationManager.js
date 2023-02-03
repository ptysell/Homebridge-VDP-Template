"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformConfigurationManager = void 0;
const platformSettings_1 = require("./platformSettings");
const fs_1 = __importDefault(require("fs"));
class platformConfigurationManager {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.configurationFile = '';
        this.deviceList = [];
        //public refresh = true;
        this.lastUpdated = 0;
        //this.initialize();
    }
    //async initialize(){
    // try {
    //   this.log.debug('Platform Configuration Manager: Initializing');
    //   fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
    //     if(error) {
    //       throw new Error('');
    //     }
    //     this.lastUpdated = stats.ctimeMs;
    //   });
    // } catch (error) {
    //   throw new Error('');
    // }
    // }
    async update() {
        let updateStatus = false;
        this.log.warn('<Update> Initializing: Return Value |', updateStatus);
        try {
            fs_1.default.stat(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
                if (this.lastUpdated === stats.ctimeMs) {
                    this.log.warn('<Update> Matched Time Stamps: Return Value |', updateStatus);
                }
                else {
                    updateStatus = true;
                    this.log.warn('<Update> Miss-Matched Time Stamps: Return Value |', updateStatus);
                    this.log.error('<Update> Set Last Updated.......');
                    this.log.error('<Update> From:', this.lastUpdated);
                    this.log.error('<Update> To:', stats.ctimeMs);
                    this.lastUpdated = stats.ctimeMs;
                }
            });
        }
        catch (error) {
            this.log.error('');
        }
        this.log.warn('<Update> Returning: Return Value |', updateStatus);
        return updateStatus;
    }
    async refresh() {
        return await this.update();
    }
    async scan() {
        this.log.info('Refreshing Configuration File.');
        this.log.error('Configuration Status:', this.update());
        try {
            if (await this.update()) {
                this.log.info('Configuration File Change: Yes');
                const configData = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
                const configFile = JSON.parse(configData);
                this.log.error('----------Start Bridge----------');
                this.log.error('Bridge Name:', configFile.bridge.name);
                this.log.error('Bridge User Name:', configFile.bridge.username);
                this.log.error('Bridge Port:', configFile.bridge.port);
                this.log.error('Bridge Pin:', configFile.bridge.pin);
                this.log.error('Bridge Advertiser:', configFile.bridge.advertiser);
                this.log.error('Bridge Bind:', configFile.bridge.bind.toString);
                this.log.error('----------End Bridge----------');
                for (let index = 0; index < configFile.platforms.length; index++) {
                    this.log.warn('Platform:', configFile.platforms[index].platform.toString);
                }
            }
            else {
                this.log.info('Configuration File Change: No');
            }
        }
        catch (error) {
            throw new Error();
        }
        return this.deviceList;
    }
}
exports.platformConfigurationManager = platformConfigurationManager;
//# sourceMappingURL=platformConfigurationManager.js.map