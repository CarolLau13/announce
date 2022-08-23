module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            title: '后台管理系统',
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.100.14:5000',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            }
        }
    }
}