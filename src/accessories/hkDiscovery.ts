import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { vdpPlatform } from '../platform';
import { HttpClient, IPDiscovery} from 'hap-controller';



const discovery = new IPDiscovery();

const pairingData = {
  AccessoryPairingID: '...',
  AccessoryLTPK: '...',
  iOSDevicePairingID: '...',
  iOSDeviceLTSK: '...',
  iOSDeviceLTPK: '...',
};


export class hkDiscovery {


  constructor(
    private readonly platform: vdpPlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    discovery.on('serviceUp', async (service) => {
      this.platform.log.debug(`Found device: ${service.name}`);

      const client = new HttpClient(service.id, service.address, service.port);

      try {
        await client.identify();
        client.close(); // Not needed if only identify was called, else needed
        this.platform.log.debug(`${service.name}: Done!`);
      } catch (e) {
        this.platform.log.error(`${service.name}:`, e);
      }
    });
    discovery.start();



  }




}
