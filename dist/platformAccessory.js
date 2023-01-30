"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformAccessory = void 0;
class platformAccessory {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        this.exampleStates = {
            On: false,
        };
        // set accessory information
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
            .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');
        this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
        this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.displayName);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async setOn(value) {
        this.exampleStates.On = value;
        // this.platform.log.debug('Set Characteristic On ->', value);
    }
    async getOn() {
        const isOn = this.exampleStates.On;
        //this.platform.log.debug('Get Characteristic On ->', isOn);
        return isOn;
    }
}
exports.platformAccessory = platformAccessory;
//# sourceMappingURL=platformAccessory.js.map