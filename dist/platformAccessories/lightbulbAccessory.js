"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightbulbAccessory = void 0;
const platformAccessory_1 = require("../platformAccessory");
const platformSettings_1 = require("../platformSettings");
class lightbulbAccessory extends platformAccessory_1.platformAccessory {
    constructor(platform, accessory) {
        super(platform, accessory);
        this.platform = platform;
        this.accessory = accessory;
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, platformSettings_1.MANUFACTURER_NAME)
            .setCharacteristic(this.platform.Characteristic.Model, platformSettings_1.PLATFORM_NAME)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessory.UUID);
        this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.accessory.displayName);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this))
            .onGet(this.getOn.bind(this));
    }
    async setOn(value) {
        this.state.On = value;
        this.platform.log.debug('Set Characteristic On:', this.accessory.displayName, ' | ', value);
    }
    async getOn() {
        const isOn = this.state.On;
        this.platform.log.debug('Set Characteristic On:', this.accessory.displayName, ' | ', isOn);
        return isOn;
    }
}
exports.lightbulbAccessory = lightbulbAccessory;
//# sourceMappingURL=lightbulbAccessory.js.map