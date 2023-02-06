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
  private cachedPlatformIndex = -1;

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
      this.log.info('Finding Platform.....');
      this.log.info('Platform:', platform.name);
      if (platform.name === PLATFORM_NAME) {

        this.log.info('Platform Found: ' + platform.name);
        this.cachedPlatformFile = JSON.stringify(platform);
      }
    }

    this.log.info('Platform File:', this.cachedPlatformFile);



    this.cachedPlatformData = JSON.parse(this.cachedPlatformFile);

    // for (let index = 0; index < this.cachedConfigurationData.platforms.length; index++) {
    //   if (this.cachedConfigurationData.platforms[index].platform === PLATFORM_NAME) {
    //     this.cachedPlatformIndex = index;
    //   }
    // }

    // if (this.cachedPlatformIndex === -1){
    //   throw new Error('[homebridgeConnector]<constructor> PLATFORM_NAME does not exist in config.json');
    // }

    // this.cachedPlatformData = JSON.parse(JSON.stringify(this.cachedConfigurationData.platforms[this.cachedPlatformIndex]));

    for(const accessory of this.cachedPlatformData.accessories) {
      this.log.info('Loading Accessory: ' + accessory.name + ' with UUID ' + accessory.uuid);
      if (accessory.uuid === 'N/A') {
        this.log.info('Accessory: ' + accessory.name +' UUID = N/A');
        accessory.uuid = this.api.hap.uuid.generate(accessory.name + Math.random);
      }
    }

    this.log.info('Updating Config.....');
    for (let platform of this.cachedConfigurationData.platforms){
      if (platform.name === PLATFORM_NAME) {
        platform = this.cachedPlatformData;
      }
    }
    this.cachedConfigurationData.platforms[this.cachedPlatformIndex] = this.cachedPlatformData;

    fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

  }

  protected async initialize(): Promise<void> {
    // this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    // this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');

    // const currentConfigurationFile: platformConfiguration = JSON.parse(this.cachedConfigurationFile);
    // const platformIndex = currentConfigurationFile.platforms.findIndex(
    //   (platformConfigurationPlatforms) => platformConfigurationPlatforms.platform === PLATFORM_NAME,
    // );
    // for (let accessoryIndex=0; accessoryIndex < currentConfigurationFile.platforms[platformIndex].accessories.length; accessoryIndex++){
    //   if (currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid === 'N/A') {
    //     currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid =
    //     this.api.hap.uuid.generate(currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].name + Math.random);
    //   }
    //   //this.deviceList.push()

    // }
    // fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(currentConfigurationFile));
    // this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
  }

  // private async loadConfigurationFromJSON(configurationFile: string): Promise<boolean | void> {

  //   return;
  // }


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

    this.log.info('Finding Platform.....');
    for (let index = 0; index < this.cachedConfigurationData.platforms.length; index++) {
      if (this.cachedConfigurationData.platforms[index].platform === PLATFORM_NAME) {
        this.cachedPlatformIndex = index;
      }
    }

    if (this.cachedPlatformIndex === -1){
      throw new Error('[homebridgeConnector]<constructor> PLATFORM_NAME does not exist in config.json');
    }

    this.log.info('Platform Found');
    this.log.info('Loading Platform.....');
    this.cachedPlatformData = JSON.parse(JSON.stringify(this.cachedConfigurationData.platforms[this.cachedPlatformIndex]));
    this.log.info('Loading Accessories.....');





    for(const accessory of this.cachedPlatformData.accessories) {
      this.log.info('Loading Accessory: ' + accessory.name + ' with UUID ' + accessory.uuid);
      if (accessory.uuid === 'N/A') {
        this.log.info('Accessory: ' + accessory.name +' UUID = N/A');
        accessory.uuid = this.api.hap.uuid.generate(accessory.name + Math.random);
      }
    }

    this.log.info('Updating Config.....');
    this.cachedConfigurationData.platforms[this.cachedPlatformIndex] = this.cachedPlatformData;

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