import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { platform } from './platform';
import { MANUFACTURER_NAME, PLATFORM_NAME } from './platformSettings';


export class platformAccessory {
  private service: Service;

  private state = {
    On: false,
  };

  constructor(
    private readonly platform: platform,
    private readonly accessory: PlatformAccessory,


  ) {

    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, MANUFACTURER_NAME)
      .setCharacteristic(this.platform.Characteristic.Model, PLATFORM_NAME)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessory.UUID);

    this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);

    this.service.setCharacteristic(this.platform.Characteristic.Name, this.accessory.displayName);

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))
      .onGet(this.getOn.bind(this));
  }

  async setOn(value: CharacteristicValue) {
    this.state.On = value as boolean;
    this.platform.log.debug('Set Characteristic On:', this.accessory.displayName, ' | ', value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const isOn = this.state.On;
    this.platform.log.debug('Set Characteristic On:', this.accessory.displayName, ' | ', isOn);
    return isOn;
  }

}