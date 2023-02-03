interface platformAccessory {
    UUID: string;
    displayName: string;
}

interface lightbulbAccessory extends platformAccessory {
Category: string;
Type: string;

}

