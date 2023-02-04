"use strict";
// import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
// //import { platformAccessory } from './platformAccessory';
// import { PLATFORM_NAME, PLUGIN_NAME } from '../platformSettings';
// import { platform } from '../platform';
// import { platformConfigurationManager } from './connectors/connectorHomebridgeJSON';
// import { platformAccessory } from '../platformAccessory';
// export class platformManager {
//   public readonly accessories: PlatformAccessory[] = [];
//   private discoveredAccessories: PlatformAccessory[] = [];
//   private changeStatus = true;
//   //public readonly accessoryCount: number = this.accessories.length;
//   private platformDiscoverer: platformConfigurationManager;
//   constructor(
//         public readonly log: Logger,
//         public readonly config: PlatformConfig,
//         public readonly api: API,
//         public readonly platform: platform,
//   ) {
//     this.platformDiscoverer = new platformConfigurationManager(this.log, this.config, this.api);
//     this.initialize();
//   }
//   //      this.accessories.sort((a, b) => a.displayName.localeCompare(b.displayName));
//   public async initialize() {
//     try {
//       if(await this.platformDiscoverer.refresh()) {
//         const newAccessoires: PlatformAccessory[] = [];
//         this.discoveredAccessories = await this.platformDiscoverer.scan();
//         for (const accessory of this.discoveredAccessories) {
//           if (!this.accessoryExistsByUUID(accessory.UUID)) {
//             newAccessoires.push(accessory);
//           }
//         }
//         this.addAccessories(newAccessoires);
//         //this.pruneAccessories(this.discoveredAccessories);
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//   }
//   public async refresh() {
//     try {
//       if(await this.platformDiscoverer.refresh()) {
//         const newAccessoires: PlatformAccessory[] = [];
//         this.discoveredAccessories = await this.platformDiscoverer.scan();
//         for (const accessory of this.discoveredAccessories) {
//           if (!this.accessoryExistsByUUID(accessory.UUID)) {
//             newAccessoires.push(accessory);
//           }
//         }
//         this.addAccessories(newAccessoires);
//         this.pruneAccessories(this.discoveredAccessories);
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//   }
//   //----------------------------------------------------------------------------------------------------------------------------------------
//   public accessoryExistsByUUID(UUID: string): boolean {
//     try {
//       if(this.accessories.find(searchAccessory => searchAccessory.UUID === UUID)) {
//         return true;
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//     return false;
//   }
//   public accessoryExists(accessory: PlatformAccessory): boolean {
//     try {
//       return this.accessoryExistsByUUID(accessory.UUID);
//     } catch (error) {
//       this.log.error('');
//     }
//     throw new Error('');
//   }
//   public accessoryCount(): number {
//     try {
//       return this.accessories.length;
//     } catch (error) {
//       this.log.error('');
//     }
//     throw new Error('');
//   }
//   public getAccessories(): PlatformAccessory[] {
//     try {
//       return this.accessories;
//     } catch (error) {
//       this.log.error('');
//     }
//     throw new Error('');
//   }
//   public getAccessoryByUUID(UUID: string): PlatformAccessory {
//     try {
//       const existingAccessory = this.accessories.find(searchAccessory => searchAccessory.UUID === UUID);
//       if(existingAccessory){
//         return existingAccessory;
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//     throw new Error('');
//   }
//   public getAccessoryIndex(accessory: PlatformAccessory): number {
//     try {
//       return this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID);
//     } catch (error) {
//       this.log.error('');
//     }
//     throw new Error('');
//   }
//   public addAccessories(accessories: PlatformAccessory[]): void {
//     try {
//       for (const accessory of accessories) {
//         this.addAccessory(accessory);
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//   }
//   public addAccessory(accessory: PlatformAccessory) {
//     this.log.info('Adding Platform Accessory:', accessory.displayName);
//     try {
//       if (!this.accessoryExistsByUUID(accessory.UUID)){
//         this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
//         new platformAccessory(this.platform, accessory);
//         this.accessories.push(accessory);
//       } else {
//         throw new Error('Accessory ' + accessory.displayName + ' Already Exists');
//       }
//     } catch (error) {
//       this.log.error('Error Adding Platform Accessory:', accessory.displayName, ' | ', error);
//     }
//   }
//   public removerAccessories(accessories: PlatformAccessory[]) {
//     this.log.info('Removing Platform Accessories:', accessories.length, ' from ', this.accessories.length);
//     try {
//       for (const accessory of accessories){
//         this.removeAccessory(accessory);
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//   }
//   public removeAccessory(accessory: PlatformAccessory) {
//     this.log.info('Removing Platform Accessory:', accessory.displayName);
//     try {
//       if (this.accessoryExistsByUUID(accessory.UUID)){
//         this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
//         this.accessories.splice(this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID), 1);
//       } else {
//         throw new Error('Accessory Does Not Exists');
//       }
//     } catch (error) {
//       this.log.error('Error Removing Platform Accessory:', accessory.UUID, ' | ', error);
//     }
//   }
//   public prune() {
//   }
//   public pruneAccessories(accessories: PlatformAccessory[]){
//     this.log.info('Pruning Platform Accessories:', accessories.length, ' from ', this.accessories.length);
//     try {
//       for (const accessory of accessories){
//         this.pruneAccessory(accessory);
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//   }
//   public pruneAccessory(accessory: PlatformAccessory) {
//     this.log.info('Pruning Platform Accessory:', accessory.displayName);
//     try {
//       if (!this.accessoryExistsByUUID(accessory.UUID)){
//         this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
//         this.accessories.splice(this.accessories.findIndex(searchAccessory => searchAccessory.UUID === accessory.UUID), 1);
//       } else {
//         throw new Error('Accessory Does Not Exists');
//       }
//     } catch (error) {
//       this.log.error('Error Pruning Platform Accessory:', accessory.UUID, ' | ', error);
//     }
//   }
//   //----------------------------------------------------------------------------------------------------------------------------------------
//   public updateAccessories(accessories: PlatformAccessory[]) {
//     this.log.info('Updating Platform Accessories:', accessories.length);
//   }
//   updateAccessory(accessory: PlatformAccessory) {
//     this.log.info('Updating Platform Accessories:', accessory.displayName);
//   }
//   public configureAccessories(accessories: PlatformAccessory[]) {
//     this.log.info('Configuring Platform Accessories:', accessories.length);
//   }
//   public configureAccessory(accessory: PlatformAccessory) {
//     this.log.info('Configuring Platform Accessories:', accessory.displayName);
//     //this.log.info('Loading accessory from cache:', accessory.displayName);
//     //this.accessories.push(accessory);
//   }
// }
//# sourceMappingURL=platformManager.js.map