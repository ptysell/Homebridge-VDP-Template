import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_PATH } from './platformSettings';
import fs from 'fs';

export class platformDiscovery {

  constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
  ) {}

  async scan(timeout = 500): Promise<PlatformAccessory[]> {
    return new Promise((resolve, reject) => {
      const deviceList: PlatformAccessory[] = [];

      this.log.info('Refreshing Configuration File.');

      try {
        const configFile = JSON.parse(fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
        for (let index=0; index < configFile.platforms.length; index++){
          if(configFile.platforms[index].name === this.config.name){
            for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
              const displayName = configFile.platforms[index].devices[index2].name;
              const UUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
              const accessory = new this.api.platformAccessory(displayName, UUID);
              deviceList.push(accessory);
            }
          }
        }

        setTimeout(() => {
          resolve(deviceList);
        }, timeout);

      } catch {
        reject('Scan Error.');
      }

    });

  }

}

