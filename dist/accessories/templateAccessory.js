"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vdpTemplateAccessory = void 0;
const settings_1 = require("../settings");
class vdpTemplateAccessory {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        this.accessorySettings = {
            Name: 'Template Accessory',
            Status: false,
        };
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, settings_1.MANUFACTURER_NAME)
            .setCharacteristic(this.platform.Characteristic.Model, settings_1.PLATFORM_NAME)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessorySettings.Name);
        this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
        this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this))
            .onGet(this.getOn.bind(this));
    }
    async setOn(value) {
        this.accessorySettings.Status = value;
        this.platform.log.debug('Set Characteristic On ->', value);
    }
    async getOn() {
        const isOn = this.accessorySettings.Status;
        this.platform.log.debug('Get Characteristic On ->', isOn);
        return isOn;
    }
}
exports.vdpTemplateAccessory = vdpTemplateAccessory;
//# sourceMappingURL=templateAccessory.js.map