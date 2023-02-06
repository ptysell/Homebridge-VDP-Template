import { API, Logger, PlatformConfig } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_FILE_PATH, PLATFORM_NAME} from '../../platformSettings';
import { homebridgeConfiguration, IPlatform, IPlatformAccessory } from '../../platformInterfaces/platformInterfaces';

import fs from 'fs';
import { platformConnector } from './platformConnector';

export class homebridgeConnector extends platformConnector {
  protected deviceList: IPlatformAccessory[] = [];

  public name = 'homebridgeConnector';

  private cachedConfigurationTimeStamp = 0;
  private cachedConfigurationFile = '';
  private cachedConfigurationData: homebridgeConfiguration;

  private cachedPlatformFile = '';
  private cachedPlatformData: IPlatform;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {

    super(log, config, api, HOMEBRIDGE_CONFIGURATION_FILE_PATH);

    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

    for (const platform of this.cachedConfigurationData.platforms){
      if (platform.platform === PLATFORM_NAME) {
        this.cachedPlatformFile = JSON.stringify(platform);
      }
    }

    this.cachedPlatformData = JSON.parse(this.cachedPlatformFile);

    for(const accessory of this.cachedPlatformData.accessories) {
      this.log.info('Loading Accessory: ' + accessory.name + ' with UUID ' + accessory.uuid);
      if (accessory.uuid === 'N/A') {
        accessory.uuid = this.api.hap.uuid.generate(accessory.name + Math.random);
        this.log.info('Accessory: ' + accessory.name +' UUID = ' + accessory.uuid);

      }
    }

    for (let platform of this.cachedConfigurationData.platforms){
      if (platform.name === PLATFORM_NAME) {
        platform = this.cachedPlatformData;
      }
    }

    fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

  }

  public async status(): Promise<boolean | void> {
    if(this.cachedConfigurationTimeStamp !== fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs){
      return true;
    }
    return false;
  }

  public async refresh(): Promise<void> {

    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

    for (const platform of this.cachedConfigurationData.platforms){
      if (platform.platform === PLATFORM_NAME) {
        this.cachedPlatformFile = JSON.stringify(platform);
      }
    }

    this.cachedPlatformData = JSON.parse(this.cachedPlatformFile);

    for(const accessory of this.cachedPlatformData.accessories) {
      this.log.info('Loading Accessory: ' + accessory.name + ' with UUID ' + accessory.uuid);
      if (accessory.uuid === 'N/A') {
        accessory.uuid = this.api.hap.uuid.generate(accessory.name + Math.random);
        this.log.info('Accessory: ' + accessory.name +' UUID = ' + accessory.uuid);

      }
    }

    let platfornIndex = 0;
    for (let platform of this.cachedConfigurationData.platforms){
      if (platform.name === PLATFORM_NAME) {
        platform = this.cachedPlatformData;
        break;
      }
      platfornIndex+=1;
    }

    //this.cachedConfigurationData.platforms[platfornIndex] = this.cachedPlatformData;



    this.log.info('cachedPlatformData JSON: ', JSON.stringify(this.cachedConfigurationData));

    fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

  }




  public async get(): Promise<IPlatformAccessory[]> {
    this.log.error('[homebridgeConnector]<get> Method not implemented.');
    return this.deviceList;
  }

  public async update(): Promise<boolean | void> {
    this.log.error('[homebridgeConnector]<update> Method not implemented.');
  }

}