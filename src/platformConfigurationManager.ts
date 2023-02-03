import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_PATH } from './platformSettings';
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
    this.log.debug('Platform Configuration Manager: Last Updated |', this.lastUpdated);
  }

  update(): boolean {

    try {
      fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
        if(error) {
          throw new Error('');
        }
        this.log.error('Platform Configuration Manager: Last Updated |', this.lastUpdated);
        this.log.error('Platform Configuration File: Last Updated |', stats.ctimeMs);

        if(this.lastUpdated === stats.ctimeMs){
          this.lastUpdated = stats.ctimeMs;
          return false;
        }
      });
    } catch (error) {
      throw new Error('');
    }
    return true;
  }

  async scan(timeout = 500): Promise<PlatformAccessory[]> {
    return new Promise((resolve, reject) => {

      this.log.info('Refreshing Configuration File.');



      try {

        const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
        const configFile = JSON.parse(configData);

        if (this.configurationInfo.toString() === configData.toString()) {
          this.log.info('Configuration File Change: No');
          this.refresh = false;
        } else {
          this.log.info('Configuration File Change: Yes');
          this.refresh = true;
          this.configurationInfo = configData.toString();
          this.deviceList = [];





          for (let index=0; index < configFile.platforms.length; index++){
            if(configFile.platforms[index].name === this.config.name){
              for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
                const displayName = configFile.platforms[index].devices[index2].name;
                const UUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
                const accessory = new this.api.platformAccessory(displayName, UUID);
                this.deviceList.push(accessory);
              }
            }
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

}

