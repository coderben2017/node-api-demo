var stream = require('stream')
var util = require('util')


/****** 自己定制流 ********/

/**
 * 读取流
 */
function ReadStream() {
	stream.Readable.call(this)
}

util.inherits(ReadStream, stream.Readable) // 读取流继承可读流

ReadStream.prototype._read = function() {
	this.push('I ')
	this.push('Love ')
	this.push('Code\n')
	this.push(null)
}

/**
 * 写入流
 */
function WriteStream() {
	stream.Writable.call(this)
	this._cached = new Buffer('')
}

util.inherits(WriteStream, stream.Writable)

WriteStream.prototype._write = function(chunk, encode, cb) {
	console.log(chunk.toString())
	cb()
}

/**
 * 转换流
 */
function TransformStream() {
	stream.Transform.call(this)
}

util.inherits(TransformStream, stream.Transform)

TransformStream.prototype._transform = function(chunk, encode, cb) {
	this.push(chunk)
	cb()
}

TransformStream.prototype._flush = function(cb) { // 冲洗（加后缀等）
	this.push('Oh Yeah')
	cb()
}



var rs = new ReadStream()
var ws = new WriteStream()
var ts = new TransformStream()

rs
	.pipe(ts) // + 'Oh Yeah'
	.pipe(ws) // print stream





