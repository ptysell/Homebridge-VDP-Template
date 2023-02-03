export interface platformConfiguration {
    bridge: platformConfigurationBridge[];
    accessories: platformConfigurationAccessories[];
    platforms: platformConfigurationPlatforms[];
    disabledPlugins: platformConfigurationDisabledPlugins[];
    }

export interface platformConfigurationBridge {
    name: string;
}

export interface platformConfigurationAccessories {
    name: string;
    }

export interface platformConfigurationPlatforms {
        name: string;
        platform: string;
        }

export interface platformConfigurationDisabledPlugins {
        name: string;
        }






export interface platformAccessory {
    UUID: string;
    displayName: string;
}

export interface lightbulbAccessory extends platformAccessory {
Category: string;
Type: string;

}

