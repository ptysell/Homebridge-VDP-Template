export interface homebridgeConfiguration {
    bridge: hombridgeBridge;
    accessories: hombridgeAccessory [];
    platforms: hombridgePlatform[];
    disabledPlugins: string [];
}

export interface hombridgeBridge {
    name: string;
    username: string;
    port: string;
    pin: string;
    advertiser: string;
    bind: string[];
}

export interface hombridgeAccessory {
    name: string;
    accessory: string;
}

export interface hombridgePlatform {
    name: string;
    platform: string;
}





export interface IPlatform extends hombridgePlatform {
    name: string;
    platform: string;
    accessories: IPlatformAccessory[];
}





export interface IPlatformAccessory {
    name: string;
    uuid: string;

   // category: string | void;
    //servicetype: string | void;
    //services: Array<string> | void;

}

