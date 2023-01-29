import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './platformSettings';
import { vdpAccessory } from './platformAccessory';
import { platformDiscovery } from './platformDiscovery';
import type { AccessoryType, platformDevice } from './types';

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
    this.log.info('Finished initializing platform:', this.config.name);
    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
      // this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);

    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  async discoverDevices() {

    const pendingUpdate = new Set();
    const recentlyRegisteredDevices = new Set();

    const registeredDevices = 0;
    const newDevices = 0;
    const unseenDevices = 0;
    const scans = 0;

    const platformDiscoverer = new platformDiscovery(this.log, this.config, this.api);

    const deviceList: platformDevice[] = await platformDiscoverer.scan(2000);


    this.log.error('Config Accessory Count:', deviceList.length);
    this.log.error('Platform Accessory Count:', this.accessories.length);

    for (const device of deviceList) {
      const name = device.name;
      //const uuid = device.uuid;
      const uuid = this.api.hap.uuid.generate(device.displayName);
      const displayName = device.displayName;
      let isExisting = '';

      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if(existingAccessory){
        isExisting = 'Yes';
      } else{
        isExisting='No';
      }



      this.log.error('---------------------------------');
      this.log.warn('Device Name:', name);
      this.log.warn('Device UUID:', uuid);
      this.log.warn('Device Display Name:', displayName);
      this.log.warn('Existing Accessory:', isExisting);
      this.log.error('---------------------------------');

      if(existingAccessory){
        this.log.error('Found Existing Accessory');
      } else{

        this.log.error('Registering New Accessory');
        const accessory = new this.api.platformAccessory(device.displayName, uuid);
        accessory.context.device = device;
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);

      }






    }



    // for (let index=0; index < deviceList.length; index++) {

    //   const uuid = deviceList[index].uuid;

    //   const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);


    //   if (existingAccessory) {
    //     this.log.info('Restoring platformAccessory from cache:', existingAccessory);

    //     new vdpAccessory(this, existingAccessory);

    //   } else {

    //     const accessory = new this.api.platformAccessory(deviceList[index].name, deviceList[index].uuid);

    //     this.log.warn('New platformAccessory Name:', accessory.displayName);
    //     this.log.warn('New platformAccessory UUID:', accessory.UUID);

    //     new vdpAccessory(this, accessory);

    //     this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    //   }
    // }


  }
}
