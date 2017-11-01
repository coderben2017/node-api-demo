var fs = require('fs')


/**
 * nodejs文件读写功能
 * 先读取后复制，处理大文件有性能问题
 * 异步方法必须添加回调函数
 */
fs.readFile('logo.png', (err, origin_buffer) => {

	console.log(Buffer.isBuffer(origin_buffer)) // 确保元数据是Buffer类型

	fs.writeFile('logo_buffer.png', origin_buffer, (err) => {
		if (err) {
			console.log(err)
		}
	})

	// var base64Image = new Buffer(origin_buffer).toString('base64')
	var base64Image = origin_buffer.toString('base64')
	console.log(base64Image)

	var decodedImageBuffer = new Buffer(base64Image, 'base64')
	console.log(Buffer.compare(origin_buffer, decodedImageBuffer))

	fs.writeFile('logo_decoded.png', decodedImageBuffer, (err) => {
		if (err) {
			console.log(err)
		}
	})
})