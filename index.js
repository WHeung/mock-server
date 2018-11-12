const fs = require('fs')
const Koa = require('Koa')
const app = new Koa();
const Router = require('koa-router')
const router = new Router()

router.get('/admin', async (ctx, next) => {
  const data = fs.readFileSync('./admin-angular/dist/admin-angular/index.html', 'utf-8')
  ctx.body = data
})

app
  .use(router.routes())
  .use(router.allowedMethods())
// app.use(async ctx => {
//   const request = ctx.request
//   ctx.body = request.url
//   if (request.url === '/admin') {

//   }
// })

app.listen(3018)