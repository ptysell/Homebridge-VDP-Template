import { API, Logger, PlatformConfig, PlatformAccessory, UnknownContext } from 'homebridge';
//import { platformConfiguration, platformConfigurationPlatforms } from '../../platformInterfaces/platformInterfaces';

import fs, { stat } from 'fs';
import { platformConnector } from './platformConnector';

export class connectorHTTPJSON extends platformConnector {

  protected deviceList: PlatformAccessory<UnknownContext>[] = [];
  public name = 'connectorHTTPJSON';

  protected async initialize(): Promise<void> {
    this.log.error('Method not implemented.');
  }

  public async status(): Promise<boolean | void> {
    throw new Error('Method not implemented.');
  }

  public async refresh(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async get(): Promise<PlatformAccessory<UnknownContext>[]> {
    await this.refresh();
    return this.deviceList;
  }

  public async update(): Promise<boolean | void> {
    throw new Error('Method not implemented.');
  }

}