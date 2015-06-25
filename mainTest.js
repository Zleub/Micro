var http = require('http')

var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.write("Hello World !")
	res.end()
})

try {
	server.listen(80)
} catch (e) {
	console.log(e)
}
