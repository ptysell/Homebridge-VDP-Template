import { API } from 'homebridge';
import { PLATFORM_NAME } from './platformSettings';
import { vdpPlatform } from './platform';
export = (api: API) => {
  api.registerPlatform(PLATFORM_NAME, vdpPlatform);
};
