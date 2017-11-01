var http = require('http')
var fs = require('fs')
var request = require('request')

http
	.createServer((req, res) => {
		// fs.readFile('../buffer/logo.png', (err, data) => {
		// 	if (err) {
		// 		res.end('file not exist!')
		// 	} else {
		// 		res.writeHeader(200, {'Content-Type': 'text/html'})
		// 		res.end(data)
		// 	}
		// })

		// 传输本地文件
		// fs.createReadStream('../buffer/logo.png')
		// 	.pipe(res)

		// 边下载边传输（响应）
		request('http://www.imooc.com/static/img/index/logo_new.png')
			.pipe(res)
	})
	.listen(8090)