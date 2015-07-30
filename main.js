/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-06 23:13:24
*/

'use strict';

var path = require('path')
var fs = require('fs')
var http = require('http')
var git = require('./git.js')
var mydoxy = require('./mydoxy.js')

var content_type = {
	".html" : {
		"Content-Type" : 'text/html',
		"Base-Directory" : './srcs'
	},
	".png" : {
		"Content-Type" : 'image/png',
		"Base-Directory" : './assets'
	},
	".css" : {
		"Content-Type" : 'text/css',
		"Base-Directory" : './srcs'
	},
	".js" : {
		"Content-Type" : 'application/javascript',
		"Base-Directory" : '.'
	},
	".json" : {
		"Content-Type" : 'application/json',
		"Base-Directory" : '.'
	}
}

var dispatch = function (req, res)
{
	var extension = path.extname(req.url)

	if (req.url == '/') {

		var file = './srcs/index.html'

		if (fs.existsSync( file ))
		{
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.end(fs.readFileSync( file ))
		}
		else
		{
			res.writeHead(404, {'Content-Type': 'text/html'})
			res.end();
		}

	}
	else if (content_type[ extension ]) {

		var file = content_type[extension]["Base-Directory"] + req.url

		if (fs.existsSync( file ))
		{
			res.writeHead(200, {'Content-Type': content_type[extension]["Content-Type"]})
			res.end(fs.readFileSync( file ))
		}
		else
		{
			res.writeHead(404, {'Content-Type': 'text/html'})
			res.end();
		}
	}
}

var server = http.createServer(dispatch)

server.listen(80)
