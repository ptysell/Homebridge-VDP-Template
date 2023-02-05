import { API, Logger, PlatformConfig, PlatformAccessory, UnknownContext } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_FILE_PATH, PLATFORM_NAME} from '../../platformSettings';
import { homebridgeConfiguration } from '../../platformInterfaces/platformInterfaces';

import fs from 'fs';
import { platformConnector } from './platformConnector';
//import { platformAccessory } from '../../platformAccessory';

export class homebridgeConnector extends platformConnector {

  public name = 'homebridgeConnector';
  protected deviceList: PlatformAccessory<UnknownContext>[] = [];

  private cachedConfigurationTimeStamp = 0;
  private cachedConfigurationFile = '';
  private cachedConfigurationData: homebridgeConfiguration;
  private cachedPlatformIndex = -1;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    super(log, config, api, HOMEBRIDGE_CONFIGURATION_FILE_PATH);

    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

    for (let index = 0; index < this.cachedConfigurationData.platforms.length; index++) {
      this.log.warn('Platform Name:', this.cachedConfigurationData.platforms[index].name);
      if (this.cachedConfigurationData.platforms[index].name === PLATFORM_NAME) {
        this.cachedPlatformIndex = index;
      } else {
        //throw new Error('[homebridgeConnector]<constructor> PLATFORM_NAME does not exist in config.json');
      }
    }

    // for (let index = 0; index < this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories.length; index++){
    //   if (this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].uuid === 'N/A') {
    //     this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].uuid =
    //     this.api.hap.uuid.generate(this.cachedConfigurationData.platforms[this.cachedPlatformIndex].accessories[index].name + Math.random);
    //   }
    // }

    //fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(this.cachedConfigurationData));
    this.log.warn('JSON:', JSON.stringify(this.cachedConfigurationData));
    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
    this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);

  }

  // protected firstRun() {
  //   this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
  //   this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');
  //   this.cachedConfigurationData = JSON.parse(this.cachedConfigurationFile);


  //   const currentConfigurationFile: platformConfiguration = JSON.parse(this.cachedConfigurationFile);
  //   const platformIndex = currentConfigurationFile.platforms.findIndex(
  //     (platformConfigurationPlatforms) => platformConfigurationPlatforms.platform === PLATFORM_NAME,
  //   );
  //   for (let accessoryIndex=0; accessoryIndex < currentConfigurationFile.platforms[platformIndex].accessories.length; accessoryIndex++){
  //     if (currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid === 'N/A') {
  //       currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid =
  //       this.api.hap.uuid.generate(currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].name + Math.random);
  //     }
  //     // this.deviceList.push(new PlatformAccessory(
  //     //   currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].name,
  //     //   currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid,
  //     // ))

  //   }
  //   fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(currentConfigurationFile));
  //   this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;

  // }


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
    this.log.warn('[homebridgeConnector]<status> Start');
    this.log.warn('[homebridgeConnector]<status>(cachedConfigurationTimeStamp) Value:', this.cachedConfigurationTimeStamp);
    this.log.warn('[homebridgeConnector]<status>(fs.statSync) Value:', fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs);
    this.log.warn('[homebridgeConnector]<status> -----------------------------');

    if(this.cachedConfigurationTimeStamp !== fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs){
      return false;
    }
    return true;
  }

  public async refresh(): Promise<void> {
    this.log.error('[homebridgeConnector]<refresh> Method not implemented.');
  }

  public async get(): Promise<PlatformAccessory[]> {
    this.log.error('[homebridgeConnector]<get> Method not implemented.');
    return this.deviceList;
  }

  public async update(): Promise<boolean | void> {
    this.log.error('[homebridgeConnector]<update> Method not implemented.');
  }

}