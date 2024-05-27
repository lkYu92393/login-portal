let defaultConfig = {
    port: process.env.PORT,
    projectId: "kwun-tong-garage",
    keyFileName: "kwun-tong-garage-d4ff9fe19bf2.json"
};

if (process.env.NODE_ENV == "development") {
    module.exports = {
        ...defaultConfig
    };
} else if (process.env.NODE_ENV == "production") {
    module.exports = {
        ...defaultConfig
    };
} else {
    module.exports = {
        ...defaultConfig
    };
}
