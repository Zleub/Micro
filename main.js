/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-26 23:34:48
*/

'use strict';

var path = require('path')
var fs = require('fs')
var http = require('http')
var git = require('./git.js')

var dispatch = function (req, res)
{
	try {

	console.log(path.extname(req.url))
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
		git.writeAuthor()
	}
	else
	{
		if (fs.existsSync("./srcs/index.html"))
		{
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.end(fs.readFileSync("./srcs/index.html"))
		}
		else
		{
			res.writeHead(404, {'Content-Type': 'text/html'})
			res.end();
		}
	}
	} catch(e) {
		console.log(req.url, e.message)
		res.writeHead(404, {'Content-Type': 'text/plain'})
		res.write("Error 404: resource not found")
		res.end()
	}
}

var server = http.createServer(dispatch)

server.listen(80)
