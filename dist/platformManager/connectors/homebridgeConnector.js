"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homebridgeConnector = void 0;
const platformSettings_1 = require("../../platformSettings");
const platformConnector_1 = require("./platformConnector");
class homebridgeConnector extends platformConnector_1.platformConnector {
    constructor(log, config, api) {
        super(log, config, api, platformSettings_1.HOMEBRIDGE_CONFIGURATION_FILE_PATH);
        this.log = log;
        this.config = config;
        this.api = api;
        this.name = 'homebridgeConnector';
        this.deviceList = [];
        this.initialize();
    }
    async initialize() {
        this.log.error('Method not implemented.');
    }
    async status() {
        this.log.error('Method not implemented.');
        return true;
    }
    async refresh() {
        this.log.error('Method not implemented.');
    }
    async get() {
        this.log.error('Method not implemented.');
        return this.deviceList;
    }
    async update() {
        this.log.error('Method not implemented.');
    }
}
exports.homebridgeConnector = homebridgeConnector;
//# sourceMappingURL=homebridgeConnector.js.map