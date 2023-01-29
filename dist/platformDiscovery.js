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
    }
    async scan(timeout = 500) {
        return new Promise((resolve, reject) => {
            const deviceList = [];
            this.log.info('Refreshing Configuration File.');
            try {
                const configFile = JSON.parse(fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
                for (let index = 0; index < configFile.platforms.length; index++) {
                    if (configFile.platforms[index].name === this.config.name) {
                        for (let index2 = 0; index2 < configFile.platforms[index].devices.length; index2++) {
                            const deviceName = configFile.platforms[index].devices[index2].name;
                            const deviceUUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
                            deviceList.push({ name: deviceName, uuid: deviceUUID });
                        }
                    }
                }
                setTimeout(() => {
                    resolve(deviceList);
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