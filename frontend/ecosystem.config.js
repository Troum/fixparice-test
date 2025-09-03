module.exports = {
    apps: [
        {
            name: 'FoxPrice Test',
            port: '4206',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
