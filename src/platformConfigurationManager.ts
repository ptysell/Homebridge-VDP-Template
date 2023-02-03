import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_PATH } from './platformSettings';
import { platformConfiguration, platformConfigurationPlatforms } from './platformInterfaces';

import fs, { stat } from 'fs';

export class platformConfigurationManager {

  private configurationInfo = '';
  private deviceList: PlatformAccessory[] = [];
  public refresh = true;

  private lastUpdated;

  constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
  ) {
    this.initialize();
  }

  async initialize(){
    try {
      this.log.debug('Platform Configuration Manager: Initializing');
      fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
        if(error) {
          throw new Error('');
        }
        this.lastUpdated = stats.ctimeMs;
      });
    } catch (error) {
      throw new Error('');
    }
  }

  update(): boolean {
    let retrunValue = false;
    try {
      fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
        if(error) {
          throw new Error('');
        }
        if(this.lastUpdated === stats.ctimeMs){
          retrunValue = false;
        } else {
          retrunValue = true;
          this.lastUpdated = stats.ctimeMs;
        }
      });
    } catch (error) {
      throw new Error('');
    }
    return retrunValue;
  }


  async scan(timeout = 500): Promise<PlatformAccessory[]> {
    return new Promise((resolve, reject) => {

      this.log.info('Refreshing Configuration File.');



      try {



        if (this.update()) {
          this.log.info('Configuration File Change: No');
          this.refresh = false;
        } else {
          this.log.info('Configuration File Change: Yes');
          const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
          const configFile: platformConfiguration = JSON.parse(configData);
          for (let index=0; index < configFile.platforms.length; index++){
            this.log.warn('Platform:', configFile.platforms[index].name);
          }

        }
        setTimeout(() => {
          resolve(this.deviceList);
        }, timeout);

      } catch {
        reject('Scan Error.');
      }

    });

  }
















  // async scan(timeout = 500): Promise<PlatformAccessory[]> {
  //   return new Promise((resolve, reject) => {

  //     this.log.info('Refreshing Configuration File.');



  //     try {

  //       const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
  //       const configFile = JSON.parse(configData);

  //       if (this.configurationInfo.toString() === configData.toString()) {
  //         this.log.info('Configuration File Change: No');
  //         this.refresh = false;
  //       } else {
  //         this.log.info('Configuration File Change: Yes');
  //         this.refresh = true;
  //         this.configurationInfo = configData.toString();
  //         this.deviceList = [];





  //         for (let index=0; index < configFile.platforms.length; index++){
  //           if(configFile.platforms[index].name === this.config.name){
  //             for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
  //               const displayName = configFile.platforms[index].devices[index2].name;
  //               const UUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
  //               const accessory = new this.api.platformAccessory(displayName, UUID);
  //               this.deviceList.push(accessory);
  //             }
  //           }
  //         }
  //       }
  //       setTimeout(() => {
  //         resolve(this.deviceList);
  //       }, timeout);

  //     } catch {
  //       reject('Scan Error.');
  //     }

  //   });

  // }

}

