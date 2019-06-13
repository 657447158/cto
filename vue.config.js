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
            '/otc': {
                target: 'http://129.211.29.207:8082',
                changeOrigin: true,
                pathRewrite: {
                    '^/otc': ''
                }
            },
            '/upload': {
                target: 'http://111.231.72.88:8091',
                changeOrigin: true,
                pathRewrite: {
                    '^/upload': ''
                }
            }
        }
    }
}
