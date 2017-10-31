var http = require('http');
var querystring = require('querystring');

/**
 * 通过脚本进行评论（“灌水”）
 */
var postData = querystring.stringify({
	'content': 'class content',
	'cid': 348
});

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/document',
	method: 'POST',
	headers: '...'
};

var req = http.request(options, res => {
	console.log('Status: ' + res.statusCode);
	console.log('headers ' + JSON.stringify(res.headers));

	res.on('data', (chunk) => {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});
	res.on('end', () => {
		console.log('评论完毕！');
	});
});

req.on('error', (e) => {
	console.log('Error: ' + e.message());
});
req.write(postData);
req.end();