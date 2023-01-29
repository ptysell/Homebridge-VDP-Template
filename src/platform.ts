import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic, uuid, Access } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME, HOMEBRIDGE_CONFIGURATION_PATH } from './settings';
import { vdpTemplateAccessory } from './platformAccessories';
import type { AccessoryType } from './types';

import fs from 'fs';

export class vdpPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public readonly accessories: PlatformAccessory[] = [];
  public deviceCount = 0;
  private periodicDiscovery: NodeJS.Timeout | null = null;



  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,

    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);
    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
    });
    this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  public refreshDeviceConfiguration(): AccessoryType[] {
    this.log.info('Refreshing Configuration File');

    const deviceList: AccessoryType[] = [];

    const configFile = JSON.parse(fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
    for (let index=0; index < configFile.platforms.length; index++){
      if(configFile.platforms[index].name === this.config.name){
        this.log.debug('Platform Name:', configFile.platforms[index].name);
        this.log.debug('Device Count:', configFile.platforms[index].devices.length);
        for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
          const deviceName = configFile.platforms[index].devices[index2].name;
          const deviceUUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);

          this.log.debug('Device Name:', deviceName);
          this.log.debug('Device UUID:', deviceUUID);

          deviceList.push({name: deviceName, uuid: deviceUUID});
        }
      }
    }

    return deviceList;

  }

  async discoverDevices() {

    const deviceList2: AccessoryType[] = this.refreshDeviceConfiguration();

    this.log.debug('DeviceList Count:', deviceList2.length);
    this.log.debug('DeviceList Name0:', deviceList2[0].name);



    // loop over the discovered devices and register each one if it has not already been registered
    for (let index=0; index< deviceList2.length; index++) {

      // generate a unique id for the accessory this should be generated from
      // something globally unique, but constant, for example, the device serial
      // number or MAC address
      const uuid = this.api.hap.uuid.generate(deviceList2[index].uuid);


      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

        // this is imported from `platformAccessory.ts`
        new vdpTemplateAccessory(this, existingAccessory);

      } else {

        this.log.info('Adding new accessory:', deviceList2[index].name);
        const accessory = new this.api.platformAccessory(deviceList2[index].name, uuid);
        accessory.context.device = deviceList2[index];

        // create the accessory handler for the newly create accessory
        // this is imported from `platformAccessory.ts`
        new vdpTemplateAccessory(this, accessory);

        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }
}
