const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const util = require('../util.js')

router.get('/list', async function (ctx, next) { // 获取列表
  var allMocks = util.getAllMocks(path.join(__dirname, '../mock/mockData'))
  const settingPath = path.join(__dirname, '../mock/mocksettings.json')
  if (fs.existsSync(settingPath)) {
    var setting = JSON.parse(fs.readFileSync(settingPath, 'utf8'))
  }
  allMocks.forEach(mock => {
    var mockName = mock.name
    mock.responseOptionsList = []
    for (var key in mock.responseOptions) {
      var option = mock.responseOptions[key]
      option.key = key
      if (option.path) {
        try {
          option.template = fs.readFileSync(path.join(__dirname, '../mock/mockData', option.path), 'utf8')
        } catch (err) {}
      } else {
        if (option.statusCode) {
          option.template = option.statusCode + ''
        } else {
          option.template = 'ejsmock error: not found path and not found statusCode'
        }
      }
      mock.responseOptionsList.push(option)
    }
    if (setting[mockName]) {
      mock.responseKey = setting[mockName]
    }
  })
  var data = {
    code: 200,
    data: allMocks
  }
  ctx.body = data
})

router.post('/update_mock', async (ctx, next) => { // 更新mock
  const params = ctx.params
  if (!params.name || !params.url || !params.method || !params.dataType) {
    ctx.throw(200, { code: 30001, message: "params no exist"})
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
        ctx.status = 200
      } else {
        ctx.throw(err)
      }
    } else {
      mock = Object.assign(JSON.parse(data), mock)
      fs.writeFile(mockPath, JSON.stringify(mock, null, 2))
      ctx.status = 200
    }
  })
})

router.post('/update_option', async (ctx, next) => { // 更新option
  const params = ctx.request.body
  var key = params.mockName
  var optionsPath = path.join(__dirname, '../mock/mockData', key)
  var mockFile = optionsPath + '.json'
  if (!params.name || ! params.template) {
    ctx.throw(200, { code: 30001, message: "params no exist"})
  }
  var templateFile = path.join(optionsPath, params.name + '.json')
  function handleTemplate () {
    return new Promise(resolve => {
      fs.mkdir(optionsPath, function(err, fd) {
        fs.writeFileSync(templateFile, params.template)
        resolve()
      })
    })
  }
  function handleMock () {
    return new Promise(resolve => {
      var mock = JSON.parse(fs.readFileSync(mockFile))
      !mock.responseOptions && (mock.responseOptions = {})
      var option = mock.responseOptions
      !option[params.name] && (option[params.name] = {})
      option[params.name].desc = params.desc
      option[params.name].path = path.relative(path.join(__dirname, '../mock/mockData'), templateFile)
      !mock.responseKey && (mock.responseKey = [params.name])
      fs.writeFileSync(mockFile, JSON.stringify(mock, null, 2))
      resolve()
    })
  }
  await handleTemplate()
  await handleMock()
  ctx.status = 200
})

module.exports = router
