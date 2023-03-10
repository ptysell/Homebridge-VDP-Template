import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
import { IPlatform, IPlatformAccessory } from '../../platformInterfaces/platformInterfaces';


export abstract class platformConnector {

  public abstract name: string;
  protected abstract deviceList: IPlatformAccessory[];
  //public abstract resourcePath: string;

  constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
        public readonly resourcePath: string,
  ) {
  }

  //protected abstract initialize(): Promise<void>;
  public abstract status(): Promise<boolean | void>;
  public abstract refresh(): Promise<void>;
  public abstract get(): Promise<IPlatformAccessory[]>;
  public abstract update(): Promise<boolean | void>;

}

