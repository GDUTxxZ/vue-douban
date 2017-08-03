require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var request = require('request')
var url = require('url')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

//----------------华丽的分割线------------------------
app.all('*', (req, res, next) => {
  console.log(req.originalUrl)
  next()
})
var https = require('https')
app.get('/fake', (req, res) => { // 转发请求
  let query = req.query
  let data = ''
  console.log(query)
  if (query) {
    for (let key in query) {
      if (query.hasOwnProperty(key) && key !== 'url') {
        data += key + "=" + query[key] + "&"
      }
    }
  }
  data = data.slice(0, data.length-1)
  https.get(query.url + '?' + data, function(response) {
    var recommend = '';//存储整个页面的Html
    response.on('data', function(chunk) {
      recommend += chunk;
    });
    response.on('end', function() {
      res.write(recommend)
      res.send()
    });
    response.on('error', (err) => {
      console.log(err);
    })  
  })
})
app.get('/pic', (req, res) => {
  let query = req.query
  console.log(query)
  let parsedUrl = url.parse(query.url)
  let referer = parsedUrl.protocol + '//' + parsedUrl.host
  let options = {
    uri: query.url,
    headers: {
      'Referer': referer
    }
  }
  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("type " + response.headers['content-type']);
    }
    res.end(response.body);
  }
  // request(options, callback);
  request(options)
    .on('error', function(err) {
        console.log(err)
    })
    .pipe(res);
})
//----------------华丽的分割线------------------------

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
