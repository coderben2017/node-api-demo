var http = require("http");

var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Hello World\n");
	console.log("server running at http://127.0.0.1:1337/");	
});

server.listen(1337, '127.0.0.1');


