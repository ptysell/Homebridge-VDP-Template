import { API, Logger, PlatformConfig } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_PATH } from './platformSettings';
import type { platformDevice } from './types';
import fs from 'fs';

export class platformDiscovery {

  constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
  ) {}

  async scan(timeout = 500): Promise<platformDevice[]> {
    return new Promise((resolve, reject) => {
      const deviceList: platformDevice[] = [];

      this.log.info('Refreshing Configuration File.');

      try {
        const configFile = JSON.parse(fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8'));
        for (let index=0; index < configFile.platforms.length; index++){
          if(configFile.platforms[index].name === this.config.name){
            for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
              const deviceName = configFile.platforms[index].devices[index2].name;
              const deviceUUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
              deviceList.push({name: deviceName, uuid: deviceUUID, displayName: deviceName});
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

