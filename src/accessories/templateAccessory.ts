import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { vdpPlatform } from '../platform';
import { MANUFACTURER_NAME, PLATFORM_NAME } from '../settings';

export class vdpTemplateAccessory {
  private service: Service;

  private accessorySettings = {
    Name: 'Template Accessory',
    Status: false,
  };

  constructor(
    private readonly platform: vdpPlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, MANUFACTURER_NAME)
      .setCharacteristic(this.platform.Characteristic.Model, PLATFORM_NAME)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessorySettings.Name);

    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))
      .onGet(this.getOn.bind(this));

  }

  async setOn(value: CharacteristicValue) {
    this.accessorySettings.Status = value as boolean;
    this.platform.log.debug('Set Characteristic On ->', value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const isOn = this.accessorySettings.Status;
    this.platform.log.debug('Get Characteristic On ->', isOn);
    return isOn;
  }

}
