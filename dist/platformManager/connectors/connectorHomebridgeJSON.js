"use strict";
// import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
// import { HOMEBRIDGE_CONFIGURATION_PATH } from '../../platformSettings';
// import { platformConfiguration, platformConfigurationPlatforms } from '../../platformInterfaces/platformInterfaces';
// import fs, { stat } from 'fs';
// export class connectorHomebridge {
//   private configurationFile = '';
//   private deviceList: PlatformAccessory[] = [];
//   //public refresh = true;
//   private lastUpdated = 0;
//   private updateStatus = false;
//   private lastModifed;
//   constructor(
//         public readonly log: Logger,
//         public readonly config: PlatformConfig,
//         public readonly api: API,
//   ) {
//     //this.initialize();
//   }
//   async initialize(){
//     this.log.debug('Platform Configuration Manager: Initializing');
//   }
//   public async checkFileModified(): Promise<boolean | null> {
//     try {
//       if (this.lastModifed === fs.statSync(HOMEBRIDGE_CONFIGURATION_PATH).ctimeMs) {
//         return false;
//       } else {
//         this.lastModifed = fs.statSync(HOMEBRIDGE_CONFIGURATION_PATH).ctimeMs;
//         return true;
//       }
//     } catch (error) {
//       this.log.error('');
//     }
//     return null;
//   }
//   public async update(): Promise<boolean> {
//     this.log.warn('--------------------------------');
//     this.log.warn('<Update> Initializing: Return Value |', this.updateStatus);
//     try {
//       if(await this.checkFileModified()){
//         this.updateStatus = false;
//         this.log.warn('<Update> Current Configuration Loaded: Not Reloading |', this.updateStatus);
//       } else {
//         this.updateStatus = true;
//         this.configurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
//         this.log.warn('<Update> Old Configuration: Reloading Configuration |', this.updateStatus);
//       }
//     } catch (error) {
//       this.log.error('-----Update Error-----');
//     }
//     this.log.warn('<Update> Returning: Return Value |', this.updateStatus);
//     this.log.warn('--------------------------------');
//     this.log.warn('--------------------------------');
//     this.log.warn('--------------------------------');
//     return this.updateStatus;
//   }
//   public async refresh(): Promise<boolean> {
//     return await this.update();
//   }
//   public async scan(): Promise<PlatformAccessory[]> {
//     this.log.info('Refreshing Configuration File.');
//     this.log.error('Configuration Status:', this.update());
//     try {
//       if ( await this.update()) {
//         this.log.info('Configuration File Change: Yes');
//         const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
//         const configFile: platformConfiguration = JSON.parse(configData);
//         this.log.error('----------Start Bridge----------');
//         this.log.error('Bridge Name:', configFile.bridge.name);
//         this.log.error('Bridge User Name:', configFile.bridge.username);
//         this.log.error('Bridge Port:', configFile.bridge.port);
//         this.log.error('Bridge Pin:', configFile.bridge.pin);
//         this.log.error('Bridge Advertiser:', configFile.bridge.advertiser);
//         this.log.error('Bridge Bind:', configFile.bridge.bind.toString);
//         this.log.error('----------End Bridge----------');
//         for (let index=0; index < configFile.platforms.length; index++){
//           this.log.warn('Platform:', configFile.platforms[index].platform.toString);
//         }
//       } else {
//         this.log.info('Configuration File Change: No');
//       }
//     } catch (error) {
//       throw new Error();
//     }
//     return this.deviceList;
//   }
//   // scan(timeout = 500): Promise<PlatformAccessory[]> {
//   //   return new Promise((resolve, reject) => {
//   //     this.log.info('Refreshing Configuration File.');
//   //     try {
//   //       if (this.update()) {
//   //         this.log.info('Configuration File Change: Yes');
//   //         const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
//   //         const configFile: platformConfiguration = JSON.parse(configData);
//   //         this.log.error('----------Start Bridge----------');
//   //         this.log.error('Bridge Name:', configFile.bridge.name);
//   //         this.log.error('Bridge User Name:', configFile.bridge.username);
//   //         this.log.error('Bridge Port:', configFile.bridge.port);
//   //         this.log.error('Bridge Pin:', configFile.bridge.pin);
//   //         this.log.error('Bridge Advertiser:', configFile.bridge.advertiser);
//   //         this.log.error('Bridge Bind:', configFile.bridge.bind.toString);
//   //         this.log.error('----------End Bridge----------');
//   //         for (let index=0; index < configFile.platforms.length; index++){
//   //           this.log.warn('Platform:', configFile.platforms[index].platform.toString);
//   //         }
//   //         // var results []map[string]interface{}
//   //         // // Unmarshal or Decode the JSON to the interface.
//   //         // json.Unmarshal([]byte(empArray), &results)
//   //         // for key, result := range results {
//   //         //   address := result["address"].(map[string]interface{})
//   //         //   fmt.Println("Reading Value for Key :", key)
//   //         //   //Reading each value by its key
//   //         //   fmt.Println("Id :", result["id"],
//   //         //     "- Name :", result["name"],
//   //         //     "- Department :", result["department"],
//   //         //     "- Designation :", result["designation"])
//   //         //   fmt.Println("Address :", address["city"], address["state"], address["country"])
//   //         // }
//   //       } else {
//   //         this.log.info('Configuration File Change: No');
//   //       }
//   //       setTimeout(() => {
//   //         resolve(this.deviceList);
//   //       }, timeout);
//   //     } catch {
//   //       reject('Scan Error.');
//   //     }
//   //   });
//   // }
//   // async scan(timeout = 500): Promise<PlatformAccessory[]> {
//   //   return new Promise((resolve, reject) => {
//   //     this.log.info('Refreshing Configuration File.');
//   //     try {
//   //       const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
//   //       const configFile = JSON.parse(configData);
//   //       if (this.configurationInfo.toString() === configData.toString()) {
//   //         this.log.info('Configuration File Change: No');
//   //         this.refresh = false;
//   //       } else {
//   //         this.log.info('Configuration File Change: Yes');
//   //         this.refresh = true;
//   //         this.configurationInfo = configData.toString();
//   //         this.deviceList = [];
//   //         for (let index=0; index < configFile.platforms.length; index++){
//   //           if(configFile.platforms[index].name === this.config.name){
//   //             for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
//   //               const displayName = configFile.platforms[index].devices[index2].name;
//   //               const UUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
//   //               const accessory = new this.api.platformAccessory(displayName, UUID);
//   //               this.deviceList.push(accessory);
//   //             }
//   //           }
//   //         }
//   //       }
//   //       setTimeout(() => {
//   //         resolve(this.deviceList);
//   //       }, timeout);
//   //     } catch {
//   //       reject('Scan Error.');
//   //     }
//   //   });
//   // }
// }
//# sourceMappingURL=connectorHomebridgeJSON.js.map