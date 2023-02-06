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





export interface platform extends hombridgePlatform {
    name: string;
    platform: string;
    accessories: platformAccessory [];
}



export interface platformAccessory {
    UUID: string;
    displayName: string;
    accessories: {
        name: string;
        uuid: string;
        category: string | void;
        service: string | void;
        services: string[] | void;
    }[];
}

export interface lightbulbAccessory extends platformAccessory {
Category: string;
Type: string;

}

