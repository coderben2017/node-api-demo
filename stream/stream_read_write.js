var Readable = require('stream').Readable
var Writable = require('stream').Writable // 拼写没有‘e’


var readStream = new Readable()
var writStream = new Writable()

readStream.push('I ')
readStream.push('Love ')
readStream.push('Code\n')
readStream.push(null)

writStream._write = (chunk, encode, cb) => {
	console.log(chunk.toString())
	cb()
}

readStream.pipe(writStream) // 需要在前面实现 Writable对象实例 的_write()方法