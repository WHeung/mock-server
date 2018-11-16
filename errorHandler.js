module.exports = function (err, ctx) {
  // 未知异常状态，默认使用 500
  if (!err.status) err.status = 500;
  ctx.status = err.status

  // 获取客户端请求接受类型
  let acceptedType = ctx.accepts('html', 'text', 'json');
  
  const res = ctx.res
  switch (acceptedType) {
    case 'text':
      ctx.type = 'text/plain';
      ctx.body = err.message;
      break;
    case 'json':
      res.type = 'application/json';
      res.message = 'error'
      res.body = {error: err.message, code: err.code}
      break;
    case 'html':
    default:
      // 默认返回页面
      ctx.type = 'text/html';
      ctx.redirect(getUrl(err.status));
      break;
  }

}

/**
  * 根据 Http 状态码，获取重定向页面
  *
  * param {number} status http状态码
  */
 function getUrl (status) {
  switch (status) {
    case 401:
      url = '401.html';
      break;
    case 404:
      url = '404.html';
      break;
    case 500:
      url = '500.html';
      break;
    case 502:
      url = '502.html';
      break;
    default:
      if (status < 500) {
        url = '40x.html';
      } else {
        url = '50x.html';
        ctx.redirect(url);
      }
  }
  return url;
}
