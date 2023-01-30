import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';

export class platformManager {

  constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
  ) {



  }



}

