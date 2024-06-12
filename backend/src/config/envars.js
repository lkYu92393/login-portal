let defaultConfig = {
    port: process.env.PORT,
    projectId: "<your_google_project_id>",
    keyFileName: "<your_google_api_key>.json",
    keyPath: "../key/",
    db: 'sqlite'
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
