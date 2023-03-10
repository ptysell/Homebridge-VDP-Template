import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './platformSettings';
import { platformAccessory } from './platformAccessory';
//import { platformConfigurationManager } from './platformManager/connectors/connectorHomebridgeJSON';
//import { platformManager } from './platformManager/platformManager';
import { access } from 'fs';
import { homebridgeConnector } from './platformManager/connectors/homebridgeConnector';



export class platform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public readonly accessories: PlatformAccessory[] = [];
  public deviceCount = 0;
  private periodicDiscovery: NodeJS.Timeout | null = null;
  private platformDiscoverer: homebridgeConnector;

  // private platformManager: platformManager;


  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.info('Finished initializing platform:', this.config.name);
    this.api.on('didFinishLaunching', () => {
      //log.debug('Executed didFinishLaunching callback');
      //this.discoverDevices();
      this.periodicDiscovery = setInterval(() => this.discoverDevices(), 5000);

    });
    this.platformDiscoverer = new homebridgeConnector(this.log, this.config, this.api);
    // this.platformManager = new platformManager(this.log, this.config, this.api, this);
    // this.platformManager.refresh();
  }

  async discoverDevices() {

    //const platformDiscoverer = new platformDiscovery(this.log, this.config, this.api);
    // const deviceList: PlatformAccessory[] = await this.platformDiscoverer.scan(2000);
    // this.pruneAccessories(deviceList);


    if(await this.platformDiscoverer.status()){
      this.log.warn('[platform]<discoverDevices>(platformDiscoverer Returned True) | Refresh');
      await this.platformDiscoverer.refresh();
    } else {
      this.log.warn('[platform]<discoverDevices>(platformDiscoverer Returned False) | No Action');
    }







    // const discoverDevices = this.platformManager.getAccessories;


    // for (const accessory of discoverDevices) {

    //   const existingAccessory = this.accessories.find(searchAccessory => searchAccessory.UUID === accessory.UUID);

    //   if(existingAccessory){

    //     this.log.error('Found Existing Platform Accessory:', existingAccessory.displayName);
    //     new platformAccessory(this, existingAccessory);

    //   } else{

    //     this.log.error('Registering New Platform Accessory:', device.displayName);
    //     const accessory = new this.api.platformAccessory(device.displayName, device.UUID);
    //     accessory.context.device = device;
    //     new platformAccessory(this, accessory);
    //     this.addAccessory(accessory);

    //   }
    // }
  }
















  // //---------------Configure Methods---------------
  // configureAccessories(accessories: PlatformAccessory[]) {
  //   this.log.info('Configuring Platform Accessories:', accessories.length);
  // }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Configuring Platform Accessories:', accessory.displayName);
    //this.log.info('Loading accessory from cache:', accessory.displayName);
    //this.accessories.push(accessory);
  }

  // //---------------Add Methods---------------
  // addAccessories(accessories: PlatformAccessory[]) {
  //   this.log.info('Adding Platform Accessories:', accessories.length, ' to ', this.accessories.length);
  //   for (const accessory of accessories) {
  //     this.addAccessory(accessory);
  //   }
  //   this.log.info('Added Platform Accessories:', (this.accessories.length - accessories.length));
  // }

  // addAccessory(accessory: PlatformAccessory) {
  //   this.log.info('Adding Platform Accessory:', accessory.displayName);
  //   this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
  //   this.accessories.push(accessory);
  // }

  // //---------------Update Methods---------------
  // updateAccessories(accessories: PlatformAccessory[]) {
  //   this.log.info('Updating Platform Accessories:', accessories.length);
  // }

  // updateAccessory(accessory: PlatformAccessory) {
  //   this.log.info('Updating Platform Accessories:', accessory.displayName);
  // }

  // //---------------Remove Methods---------------
  // removerAccessories(accessories: PlatformAccessory[]) {
  //   this.log.info('Removing Platform Accessories:', accessories.length, ' of ', this.accessories.length);
  //   for (const accessory of accessories){
  //     this.removeAccessory(accessory);
  //   }
  //   this.log.info('Platform Accessories:', this.accessories.length);
  // }

  // removeAccessory(accessory: PlatformAccessory) {
  //   this.log.info('Removing Platform Accessory:', accessory.displayName);
  //   const accessoryIndex = this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID);
  //   this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
  //   this.accessories.splice(accessoryIndex, 1);
  // }

  // //---------------Prune Methods---------------
  // pruneAccessories(accessories: PlatformAccessory[]){
  //   this.log.info('Pruning Platform Accessories:', 'from', this.accessories.length, ' to ', this.accessories.length - accessories.length);

  //   for (const accessory of this.accessories) {
  //     const existingAccessory = accessories.find(searchAccessory => searchAccessory.UUID === accessory.UUID);
  //     if(existingAccessory){
  //       this.log.info('Accessory', accessory.displayName, 'is current.');
  //     } else {
  //       this.log.info('Accessory', accessory.displayName, 'is not current.');
  //       this.removeAccessory(accessory);
  //     }
  //   }
  // }




}