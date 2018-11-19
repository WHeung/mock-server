const fs = require('fs')
const path = require('path')
const Koa = require('Koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const routers = require('./routers')
const static = require('koa-static')
const errorHandler = require('./errorHandler.js')

app.use(errorHandler)

app.use(bodyParser())

app.use(static(
  path.join(__dirname, './admin/build')
))


app
  .use(routers.routes())
  .use(routers.allowedMethods())

app.on('error', (err) => {
  console.log(err)
})

app.listen(3018)
