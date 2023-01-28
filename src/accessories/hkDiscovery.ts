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

const characteristics = {
  '1.10': true,
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
        await client.setCharacteristics(characteristics);
        client.close();
        this.platform.log.debug(`${service.name}: done!`);
      } catch (e) {
        this.platform.log.error(`${service.name}:`, e);
      }
    });

    discovery.start();



  }




}
