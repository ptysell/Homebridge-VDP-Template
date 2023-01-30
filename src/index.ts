import { API } from 'homebridge';
import { PLATFORM_NAME } from './platformSettings';
import { platform } from './platform';
export = (api: API) => {
  api.registerPlatform(PLATFORM_NAME, platform);
};
