const fs = require('fs')
const path = require('path')
const Koa = require('Koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const static = require('koa-static')
const errorHandler = require('./errorHandler.js')

app.use(static(
  path.join(__dirname, './admin/build')
))

router.get('/admin', async (ctx, next) => {
  const filePath = path.join(path.join(__dirname, './admin/build/index.html'))
  const data = fs.readFileSync(filePath, 'utf-8')
  ctx.body = data
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', errorHandler)

app.listen(3018)
