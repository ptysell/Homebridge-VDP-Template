import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { vdpPlatform } from '../platform';
import {IPDiscovery} from 'hap-controller';



/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 *
 *
 *
 *

const { IPDiscovery } = require('hap-controller');

const discovery = new IPDiscovery();

discovery.on('serviceUp', (service) => {
    console.log('Found device:', service);
});

discovery.start();

*
 *
 *
 *
 *
 *
 *
 */

const discovery = new IPDiscovery();


export class hkDiscovery {
  // private service: Service;


  private exampleStates = {
    On: false,
  };

  constructor(
    private readonly platform: vdpPlatform,
    private readonly accessory: PlatformAccessory,
  ) {



    discovery.on('serviceUp', (service) => {
      this.platform.log.debug('Found device:', service);
    });

    discovery.start();



  }




}
