'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'"/api/"',
  IMG_URL:'"http://10.7.6.131:80/BPWatch/"'
})
