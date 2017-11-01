var fs = require('fs')

var readStream = fs.createReadStream('stream_copy_logo.js')
var n = 0;

readStream
	.on('data', (chunk) => { // 读取内存块
		++n;
		console.log('data emits')
		console.log(Buffer.isBuffer(chunk))
		// console.log(chunk.toString('utf8'))

		// 暂停流，执行特殊处理
		readStream.pause()
		console.log('data pause')
		setTimeout(() => {
			console.log('data pause end')
			readStream.resume() // 继续，重新开始
		}, 3000)
	})
	.on('readable', () => {
		console.log('data readable')
	})
	.on('end', () => {
		console.log(n)
		console.log('data ends')
	})
	.on('close', () => {
		console.log('data close')
	})
	.on('error', (e) => {
		console.log('data read error: ' + e)
	})