module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.ignoreWarnings = [
                {
                    module: /postcss-loader/,
                    message: /Replace color-adjust to print-color-adjust/,
                },
            ];
            return webpackConfig;
        },
    },
};
