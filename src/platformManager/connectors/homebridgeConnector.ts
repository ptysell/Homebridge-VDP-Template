import { API, Logger, PlatformConfig, PlatformAccessory, UnknownContext } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_FILE_PATH } from '../../platformSettings';
import { platformConfiguration, platformConfigurationPlatforms } from '../../platformInterfaces/platformInterfaces';

import fs, { stat } from 'fs';
import { platformConnector } from './platformConnector';

export class homebridgeConnector extends platformConnector {

  public name = 'homebridgeConnector';
  protected deviceList: PlatformAccessory<UnknownContext>[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    super(log, config, api, HOMEBRIDGE_CONFIGURATION_FILE_PATH);
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.log.error('Method not implemented.');
  }

  public async status(): Promise<boolean | void> {
    this.log.error('Method not implemented.');
    return true;
  }

  public async refresh(): Promise<void> {
    this.log.error('Method not implemented.');
  }

  public async get(): Promise<PlatformAccessory[]> {
    this.log.error('Method not implemented.');
    return this.deviceList;
  }

  public async update(): Promise<boolean | void> {
    this.log.error('Method not implemented.');
  }


}