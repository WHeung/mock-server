const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

router.get('/', async (ctx, next) => {
  const filePath = path.join(path.join(__dirname, '../admin/build/index.html'))
  const data = fs.readFileSync(filePath, 'utf-8')
  ctx.body = data
})

module.exports = router
