const router = require('koa-router')()
const home = require('./home')
const api = require('./api')

router.use('/admin', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router