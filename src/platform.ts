import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './platformSettings';
import { platformAccessory } from './platformAccessory';
import { platformDiscovery } from './platformDiscovery';
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
    this.log.info('Finished initializing platform:', this.config.name);
    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
      this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);

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

    const deviceList: AccessoryType[] = await platformDiscoverer.scan(2000);





    // eslint-disable-next-line prefer-const
    //let deviceList2: AccessoryType[] = this.refreshDeviceConfiguration();

    this.log.debug('DeviceList Count:', deviceList.length);
    this.log.debug('DeviceList Name0:', deviceList[0].name);



    // loop over the discovered devices and register each one if it has not already been registered
    for (let index=0; index < deviceList.length; index++) {

      // generate a unique id for the accessory this should be generated from
      // something globally unique, but constant, for example, the device serial
      // number or MAC address
      //const uuid = this.api.hap.uuid.generate(deviceList2[index].uuid);


      this.log.info('Device UUID-----', deviceList[index].uuid);

      const uuid = deviceList[index].uuid;


      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      this.log.info('Existing UUID-----', existingAccessory?.UUID);


      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

        // this is imported from `platformAccessory.ts`
        new platformAccessory(this, existingAccessory);

      } else {

        this.log.info('Adding new accessory:', deviceList[index].name);
        const accessory = new this.api.platformAccessory(deviceList[index].name, uuid);
        this.log.info('Adding accessory context:', deviceList[index].name);

        accessory.context.device = deviceList[index];

        // create the accessory handler for the newly create accessory
        // this is imported from `platformAccessory.ts`
        this.log.info('Adding new vdpTemplateAccessory:', deviceList[index].name);

        new platformAccessory(this, accessory);

        this.log.info('Registering platform accessory:', deviceList[index].name);

        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }

  async createNewAccessory () {

  }

  registerExistingAccessory () {

  }

}
