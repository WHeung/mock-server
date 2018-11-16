const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

router.post('/update_mock', async (ctx, next) => {
  console.log(ctx.params)
  const params = ctx.params
  if (!params.name || !params.url || !params.method || !params.dataType) {
    ctx.throw(200, { code: 30001, message: "params no exist"})
    return
  }
  const mock = {
    name: params.name,
    describe: params.describe,
    url: params.url,
    method: params.method,
    dataType: params.dataType
  }
  const mockPath = path.join(config.mockPath, mock.name + '.json')

  fs.readFile(mockPath, function (err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFile(mockPath, JSON.stringify(mock, null, 2))
        ctx.send('{"code": "200"}')
      } else {
        ctx.throw(err)
      }
    } else {
      mock = Object.assign(JSON.parse(data), mock)
      fs.writeFile(mockPath, JSON.stringify(mock, null, 2))
      ctx.send('{"code": "200"}')
    }
  })
  // ctx.body = data
})

module.exports = router
