/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-09 17:49:56
*/

'use strict';

var path = require('path')
var fs = require('fs')
var http = require('http')

var dispatch = function (req, res)
{
	if (path.extname(req.url) == '.html')
	{
		if (fs.existsSync("./srcs" + req.url))
		{
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.end(fs.readFileSync("./srcs" + req.url))
		}
		else
		{
			res.writeHead(404, {'Content-Type': 'text/html'})
			res.end();
		}
	}
	else if (path.extname(req.url) == '.png')
	{
		res.writeHead(200, {'Content-Type': 'image/png'})
		res.end(fs.readFileSync("./assets" + req.url), 'binary')
	}
	else if (path.extname(req.url) == '.css')
	{
		res.writeHead(200, {'Content-Type': 'text/css'})
		res.end(fs.readFileSync("./srcs" + req.url))
	}
	else if (path.extname(req.url) == '.js')
	{
		res.writeHead(200, {'Content-Type': 'application/javascript'})
		res.end(fs.readFileSync("." + req.url))
	}
	else if (path.extname(req.url) == '.json')
	{
		res.writeHead(200, {'Content-Type': 'application/json'})
		res.end(fs.readFileSync("." + req.url))
	}
	else
	{
		res.writeHead(404, {'Content-Type': 'text/plain'})
		res.write("Error 404: resource not found")
		res.end()
	}
}

var server = http.createServer(dispatch)

server.listen(8080)
