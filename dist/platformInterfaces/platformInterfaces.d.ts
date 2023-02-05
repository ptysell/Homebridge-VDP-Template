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
        }[] | void;
    }[];
    disabledPlugins: {
        name: string;
    };
}
export interface platformAccessory {
    UUID: string;
    displayName: string;
}
export interface lightbulbAccessory extends platformAccessory {
    Category: string;
    Type: string;
}
//# sourceMappingURL=platformInterfaces.d.ts.map