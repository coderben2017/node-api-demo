var fs = require('js')

var readStream = fs.createReadStream('1.mp4')
var writeStream = fs.createWriteStream('1-stream.mp4')

readStream
	.on('data', (chunk) => {
		if (writeStream.write(chunk) === false) {
			readStream.pause() // 防止爆仓（读写速度不等性）
			console.log('pause: still cached')
		}
	})
	.on('end', () => {
		writeStream.end()
	})

writeStream
	.on('drain', () => {
		readStream.resume() // 继续，重新开始
		console.log('resume: data drains')
	})