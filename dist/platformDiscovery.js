"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformDiscovery = void 0;
const platformSettings_1 = require("./platformSettings");
const fs_1 = __importDefault(require("fs"));
class platformDiscovery {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.configurationInfo = '';
        this.deviceList = [];
        this.refresh = true;
        this.lastUpdated = '';
    }
    async update() {
        fs_1.default.stat(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, (err, stats) => {
            if (err) {
                throw err;
            }
            // print file last modified date
            this.log.error(`File Data Last Modified: ${stats.mtime}`);
            this.log.error(`File Status Last Modified: ${stats.ctime}`);
        });
        return true;
    }
    async scan(timeout = 500) {
        return new Promise((resolve, reject) => {
            this.log.info('Refreshing Configuration File.');
            try {
                const configData = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
                const configFile = JSON.parse(configData);
                if (this.configurationInfo.toString() === configData.toString()) {
                    this.log.info('Configuration File Change: No');
                    this.refresh = false;
                }
                else {
                    this.log.info('Configuration File Change: Yes');
                    this.refresh = true;
                    this.configurationInfo = configData.toString();
                    this.deviceList = [];
                    for (let index = 0; index < configFile.platforms.length; index++) {
                        if (configFile.platforms[index].name === this.config.name) {
                            for (let index2 = 0; index2 < configFile.platforms[index].devices.length; index2++) {
                                const displayName = configFile.platforms[index].devices[index2].name;
                                const UUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
                                const accessory = new this.api.platformAccessory(displayName, UUID);
                                this.deviceList.push(accessory);
                            }
                        }
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
exports.platformDiscovery = platformDiscovery;
//# sourceMappingURL=platformDiscovery.js.map