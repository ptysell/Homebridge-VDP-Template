import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { vdpPlatform } from './platform';

export class vdpAccessory {
  private service: Service;

  private exampleStates = {
    On: false,
  };

  constructor(
    private readonly platform: vdpPlatform,
    private readonly accessory: PlatformAccessory,


  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.name);
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below
  }

  async setOn(value: CharacteristicValue) {
    this.exampleStates.On = value as boolean;
    // this.platform.log.debug('Set Characteristic On ->', value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const isOn = this.exampleStates.On;
    //this.platform.log.debug('Get Characteristic On ->', isOn);
    return isOn;
  }

}