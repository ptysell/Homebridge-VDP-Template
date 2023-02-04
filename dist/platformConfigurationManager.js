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
        this.updateStatus = false;
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
    // let path = 'views'; //your folder path (views is an example folder)
    // configurationUpdated(path, (error, configConahnged) => {
    //   if (configConahnged){
    //     console.log('folder was changed, need to compare files');
    //     //need to update redis here
    //     //...comapre files to find what was changed
    //   }
    //   else{
    //     console.log('folder was not changed');
    //   }
    // });
    /**
     * Checks if a file/folder was changed
     */
    async checkFileModified() {
        this.log.warn('--------------------------------');
        this.log.warn('--------------------------------');
        this.log.debug('platformConfigurationManager | checkFileModified: Function Start');
        let retrunResults;
        if (this.lastModifed === fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH).ctimeMs) {
            this.log.debug('platformConfigurationManager | checkFileModified: ctimeMs Match | false');
            retrunResults = false;
        }
        else {
            this.log.debug('platformConfigurationManager | checkFileModified: ctimeMs No Match | true');
            this.log.error('platformConfigurationManager | checkFileModified: Set Modified');
            this.lastModifed = fs_1.default.statSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH).ctimeMs;
            retrunResults = true;
        }
        this.log.debug('platformConfigurationManager | checkFileModified: Returning Value |', retrunResults);
        this.log.debug('platformConfigurationManager | checkFileModified: Function End');
        this.log.warn('--------------------------------');
        this.log.warn('--------------------------------');
        return retrunResults;
    }
    // fs.open(path, 'r', (error, fd) => {
    //   //obtain previous modified date of the folder (I would use redis to store/retrieve this data)
    //   //let lastModifed = '2016-12-03T00:41:12Z'; //put the string value here, this is just example
    //   fs.stat(path, (error, data) => {
    //     //I use moment module to compare dates
    //     const previousLMM = this.lastModifed;
    //     const folderLMM = data.ctimeMs;
    //     let results: boolean;
    //     if (folderLMM === previousLMM) {
    //       results = true;
    //     } else {
    //       results = false;
    //     }
    //     return callback (null, results);
    //   });
    // });
    //}
    async update() {
        this.log.warn('--------------------------------');
        this.log.warn('<Update> Initializing: Return Value |', this.updateStatus);
        try {
            if (await this.checkFileModified()) {
                this.updateStatus = false;
                this.log.warn('<Update> Current Configuration Loaded: Not Reloading |', this.updateStatus);
            }
            else {
                this.updateStatus = true;
                this.configurationFile = fs_1.default.readFileSync(platformSettings_1.HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
                this.log.warn('<Update> Old Configuration: Reloading Configuration |', this.updateStatus);
            }
        }
        catch (error) {
            this.log.error('-----Update Error-----');
        }
        this.log.warn('<Update> Returning: Return Value |', this.updateStatus);
        this.log.warn('--------------------------------');
        this.log.warn('--------------------------------');
        this.log.warn('--------------------------------');
        return this.updateStatus;
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