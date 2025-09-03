module.exports = {
    apps: [
        {
            name: 'FixPrice',
            port: '4206',
            script: '.output/server/index.mjs',
            exec_mode: 'fork',
            instances: 1,
            watch: false,
            node_args: ['--max-old-space-size=256'],
            env: { NODE_ENV: 'production' }
        }
    ]
}
