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

      const client = new HttpClient(service.id, service.address, service.port, pairingData, {
        usePersistentConnections: true,
      });

      try {
        const acc = await client.getAccessories();
        this.platform.log.debug(JSON.stringify(acc, null, 2));
      } catch (e) {
        this.platform.log.error(`${service.name}:`, e);
      }
      client.close();
    });

    discovery.start();

    discovery.on('serviceUp', (service) => {
      this.platform.log.debug('Found device:', service);
    });

    discovery.start();



  }




}
