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
        this.configurationInfo = '';
        this.deviceList = [];
        this.refresh = true;
        this.initialize();
    }
    async initialize() {
        try {
            this.log.debug('Platform Configuration Manager: Initializing');
            fs_1.default.stat(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
                if (error) {
                    throw new Error('');
                }
                this.lastUpdated = stats.ctimeMs;
            });
        }
        catch (error) {
            throw new Error('');
        }
    }
    update() {
        let retrunValue = false;
        try {
            fs_1.default.stat(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
                if (error) {
                    throw new Error('');
                }
                if (this.lastUpdated === stats.ctimeMs) {
                    retrunValue = false;
                }
                else {
                    retrunValue = true;
                    this.lastUpdated = stats.ctimeMs;
                }
            });
        }
        catch (error) {
            throw new Error('');
        }
        return retrunValue;
    }
    async scan(timeout = 500) {
        return new Promise((resolve, reject) => {
            this.log.info('Refreshing Configuration File.');
            try {
                if (this.update()) {
                    this.log.info('Configuration File Change: No');
                    this.refresh = false;
                }
                else {
                    this.log.info('Configuration File Change: Yes');
                    const configData = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
                    const configFile = JSON.parse(configData);
                    for (const test in configFile.platforms) {
                        this.log.warn('Platform:', test.toString());
                    }
                }
                setTimeout(() => {
                    resolve(this.deviceList);
                }, timeout);
            }
            catch (_a) {
                reject('Scan Error.');
            }
        });
    }
}
exports.platformConfigurationManager = platformConfigurationManager;
//# sourceMappingURL=platformConfigurationManager.js.map