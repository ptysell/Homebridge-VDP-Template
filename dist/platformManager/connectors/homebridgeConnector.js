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
        this.log.error('[homebridgeConnector]<initalize> Method not implemented.');
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