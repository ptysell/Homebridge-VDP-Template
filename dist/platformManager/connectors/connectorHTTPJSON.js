"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectorHTTPJSON = void 0;
const platformConnector_1 = require("./platformConnector");
class connectorHTTPJSON extends platformConnector_1.platformConnector {
    constructor() {
        super(...arguments);
        this.deviceList = [];
        this.name = 'connectorHTTPJSON';
    }
    async initialize() {
        this.log.error('Method not implemented.');
    }
    async status() {
        throw new Error('Method not implemented.');
    }
    async refresh() {
        throw new Error('Method not implemented.');
    }
    async get() {
        await this.refresh();
        return this.deviceList;
    }
    async update() {
        throw new Error('Method not implemented.');
    }
}
exports.connectorHTTPJSON = connectorHTTPJSON;
//# sourceMappingURL=connectorHTTPJSON.js.map