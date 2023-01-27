"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vdpAccessory = void 0;
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
class vdpAccessory {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        this.exampleStates = {
            On: false,
        };
        // set accessory information
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Virtural Device Platform')
            .setCharacteristic(this.platform.Characteristic.Model, 'AccessoryKit')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');
        // get the LightBulb service if it exists, otherwise create a new LightBulb service
        // you can create multiple services for each accessory
        this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
        // set the service name, this is what is displayed as the default name on the Home app
        // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
        this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);
        // each service must implement at-minimum the "required characteristics" for the given service type
        // see https://developers.homebridge.io/#/service/Lightbulb
        // register handlers for the On/Off Characteristic
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async setOn(value) {
        this.exampleStates.On = value;
        this.platform.log.debug('Set Characteristic On ->', value);
    }
    async getOn() {
        const isOn = this.exampleStates.On;
        this.platform.log.debug('Get Characteristic On ->', isOn);
        return isOn;
    }
}
exports.vdpAccessory = vdpAccessory;
//# sourceMappingURL=platformAccessory.js.map