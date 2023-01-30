"use strict";
const platformSettings_1 = require("./platformSettings");
const platform_1 = require("./platform");
module.exports = (api) => {
    api.registerPlatform(platformSettings_1.PLATFORM_NAME, platform_1.platform);
};
//# sourceMappingURL=index.js.map