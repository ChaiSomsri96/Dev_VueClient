const path = require("path");

module.exports = {

    publicPath: '/salary/',

    // outputDir: path.resolve(__dirname, "./dist"),
    // outputDir: path.resolve(__dirname, "../" + "main/resources/frontend"),
    // assetsDir: 'bcs/manager',
    // indexPath: path.resolve(__dirname, "./dist/bcs/manager/index.html"),
    // filenameHashing: false,
    // configureWebpack: config => {
        // if (process.env.NODE_ENV === 'production') {
        //     config.output.filename = 'js/[name].[hash].js'
        //     config.output.chunkFilename = 'js/[name].[hash].js'
        // }
    // },

    // Vue CLI - Dev server (node.js) 설정
    devServer: {
        proxy           : {
            // 아래 URL 들은 tomcat 서버로 proxy 처리한다.
            '/bcs/manager/api': {
                target      : 'http://localhost',
                ws          : true,
                changeOrigin: true
            },
            '/api/'     : {
                target      : 'http://localhost',
                ws          : true,
                changeOrigin: true
            },
            '/assets/'     : {
                target      : 'http://localhost/assets',
                ws          : true,
                changeOrigin: true
            },
            '/common': {
                target      : 'http://localhost',
                ws          : true,
                changeOrigin: true
            },
            '/api/salary/payroll/': {
                target      : 'http://localhost',
                ws          : true,
                changeOrigin: true,
                pathRewrite: { '^/api/': '' }
            },
        },
        overlay         : false, // ESLint
        port            : 8008,
        disableHostCheck: true
    }
};
