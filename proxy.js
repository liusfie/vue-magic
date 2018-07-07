const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8888;

// 创建一个 API 代理服务
const apiServer = http.createServer((req, res) => {
    const url = 'http://localhost' + req.url;
    const method1 = req.method;
    const options = {
        url: url
    };

    function callback (error, response, body) {
        if (!error && response.statusCode === 200) {
            // 设置编码类型，否则中文会显示为乱码
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            // 设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin', '*');
            // 返回代理后的内容
            res.end(body);
        }
    }
    if (req.method == 'GET')
      request.get(options, callback)
    else if (req.method == 'PUT')
      request.put(options, callback)
    else if (req.method == 'POST')
      request.post(options, callback)
    else if (req.method == 'DELETE')
      request.delete(options, callback)
    else
      request.delete(options, callback)
      console.log(req.method)
});
// 监听 8888 端口
apiServer.listen(port, hostname, () => {
    console.log(`接口代理运行在 http://${hostname}:${port}/`);
});
