const fs = require('fs')
const path = require('path')
const Koa = require('Koa')
const app = new Koa()
const routers = require('./routers')
const static = require('koa-static')
const errorHandler = require('./errorHandler.js')

app.on('error', errorHandler)

app.use(static(
  path.join(__dirname, './admin/build')
))

// router.get('/admin', async (ctx, next) => {
//   const filePath = path.join(path.join(__dirname, './admin/build/index.html'))
//   const data = fs.readFileSync(filePath, 'utf-8')
//   ctx.body = data
// })

app
  .use(routers.routes())
  .use(routers.allowedMethods())

app.listen(3018)
