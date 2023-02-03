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
    }
    update() {
        try {
            fs_1.default.stat(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
                if (error) {
                    throw new Error('');
                }
                if (this.lastUpdated === stats.ctimeMs) {
                    this.log.debug('Update: No');
                    return false;
                }
                else {
                    this.log.debug('Update: Yes');
                    return true;
                    this.lastUpdated = stats.ctimeMs;
                }
            });
        }
        catch (error) {
            throw new Error('');
        }
        return false;
    }
    scan(timeout = 500) {
        return new Promise((resolve, reject) => {
            this.log.info('Refreshing Configuration File.');
            try {
                if (this.update()) {
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
                    // var results []map[string]interface{}
                    // // Unmarshal or Decode the JSON to the interface.
                    // json.Unmarshal([]byte(empArray), &results)
                    // for key, result := range results {
                    //   address := result["address"].(map[string]interface{})
                    //   fmt.Println("Reading Value for Key :", key)
                    //   //Reading each value by its key
                    //   fmt.Println("Id :", result["id"],
                    //     "- Name :", result["name"],
                    //     "- Department :", result["department"],
                    //     "- Designation :", result["designation"])
                    //   fmt.Println("Address :", address["city"], address["state"], address["country"])
                    // }
                }
                else {
                    this.log.info('Configuration File Change: No');
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