import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME, HOMEBRIDGE_CONFIGURATION_PATH } from './settings';
import { vdpTemplateAccessory } from './platformAccessories';

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

  async getDeviceConfiguration(){
    this.log.error('Refreshing Configuration.....');

    const config2 = JSON.parse(fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
    const platform2 = config2.platforms;
    this.log.info(platform2.length);

    for (let index=0; index < platform2.length; index++){
      if(platform2.name === this.config.name) {
        this.log.error(platform2.name);
      }
    }


    // for (const jsonPlatform in config2. ) {
    //   if (jsonPlatform.name == config.name)  {
    //     this.log.error('')
    //   }
    // }
    return config2.platforms;
  }

  async discoverDevices() {



    this.deviceCount = this.config.devices.length;
    this.log.error('Device Count:', this.deviceCount);



    // EXAMPLE ONLY
    // A real plugin you would discover accessories from the local network, cloud services
    // or a user-defined array in the platform config.
    const deviceList2 = [
      {
        exampleUniqueId: 'ABCD',
        exampleDisplayName: 'Test Accessory 01',
      },
    ];



    // loop over the discovered devices and register each one if it has not already been registered
    for (const device of deviceList2) {

      // generate a unique id for the accessory this should be generated from
      // something globally unique, but constant, for example, the device serial
      // number or MAC address
      const uuid = this.api.hap.uuid.generate(device.exampleUniqueId);


      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

        // this is imported from `platformAccessory.ts`
        new vdpTemplateAccessory(this, existingAccessory);

      } else {

        this.log.info('Adding new accessory:', device.exampleDisplayName);
        const accessory = new this.api.platformAccessory(device.exampleDisplayName, uuid);
        accessory.context.device = device;

        // create the accessory handler for the newly create accessory
        // this is imported from `platformAccessory.ts`
        new vdpTemplateAccessory(this, accessory);

        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }
}
