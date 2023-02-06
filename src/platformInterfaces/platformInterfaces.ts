export interface homebridgeConfiguration {
    bridge: {
        name: string;
        username: string;
        port: string;
        pin: string;
        advertiser: string;
        bind: string[];
    };
    accessories: {
        name: string;
    }[];
    platforms: {
        name: string;
        platform: string;
        accessories: {
            name: string;
            uuid: string;
            category: string | void;
            service: string | void;
        }[];
    }[];
    disabledPlugins: {
        name: string;
    };
}

export interface platformConfiguration {
    name: string;
    platform: string;
    accessories?: {
        name: string;
        uuid: string;
        category: string | void;
        service: string | void;
    }[];

}

export declare type PluginConfig = Record<string, any>;

export interface PluginSchema extends Record<string, unknown> {
    pluginAlias: string;
    pluginType: string;
    singular?: boolean;
    customUi?: boolean;
    headerDisplay?: string;
    footerDisplay?: string;
    schema?: Record<string, any>;
    layout?: Record<string, any>[];
    form?: Record<string, any>[];
  }




export interface platformAccessory {
    UUID: string;
    displayName: string;
}

export interface lightbulbAccessory extends platformAccessory {
Category: string;
Type: string;

}

