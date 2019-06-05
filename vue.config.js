module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/styles/global.scss";`
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    devServer: {
        proxy: {
            '/cto': {
                target: 'http://129.211.29.207:8082',
                changeOrigin: true,
                pathRewrite: {
                    '^/cto': ''
                }
            }
        }
    }
}
