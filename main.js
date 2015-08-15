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
	},
	".ico" : {
		"Content-Type" : 'image/x-icon',
		"Base-Directory" : '.'
	},
	".article" : {
		"Content-Type" : 'text/html',
		"Base-Directory" : './blog'
	}
}

var getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

var color_table = [
	{ r : 100, g :  20, b : 100 },
	{ r : 244, g : 154, b : 194 },
	{ r : 175, g : 198, b : 207 },
	{ r : 130, g : 105, b :  83 },
	{ r : 179, g : 158, b : 181 },
	{ r : 255, g : 179, b :  71 },
	{ r :   3, g : 192, b :  60 },
	{ r : 203, g : 153, b : 201 },
	{ r : 222, g : 165, b : 164 },
	{ r : 150, g : 111, b : 214 },
	{ r : 119, g : 158, b : 203 },
	{ r : 255, g : 105, b :  97 },
	{ r : 253, g : 253, b : 150 },
	{ r : 207, g : 207, b : 196 },
	{ r : 119, g : 190, b : 119 },
	{ r : 194, g :  59, b :  34 },
	{ r : 255, g : 209, b : 220 }
]

var makePict = function () {
	var str = "\
\x42\x4d\x7a\x4b\x00\x00\x00\x00\x00\x00\x7a\x00\x00\x00\x6c\x00\
\x00\x00\x50\x00\x00\x00\x50\x00\x00\x00\x01\x00\x18\x00\x00\x00\
\x00\x00\x00\x4b\x00\x00\x13\x0b\x00\x00\x13\x0b\x00\x00\x00\x00\
\x00\x00\x00\x00\x00\x00\x42\x47\x52\x73\x00\x00\x00\x00\x00\x00\
\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\
\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\
\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"

	var seed = []
	var width = 4
	var height = 8
	for (var x = 0; x < width; x++) {
		seed[x] = []
		for (var y = 0; y < height; y++) {
			seed[x][y] = getRandomInt(0, 2)
		};
	};

	var nbr = getRandomInt(0, color_table.length)
	var color = String.fromCharCode(color_table[nbr].r) + String.fromCharCode(color_table[nbr].g) + String.fromCharCode(color_table[nbr].b)

	var x = 0
	var y = 0
	var x_cmp = 0
	var x_index = 0
	var y_cmp = 0
	for (var i = 0; i < 6400; i += 1) {

		if (seed[x_index][y_cmp] == 0)
			str += color
		else
			str += "\xff\xff\xff"

			x += 1

		if (x % Math.round(80 / 8) == 0) {
			x_cmp += 1
			x_index += 1
			if (x_cmp > 7)
				x_cmp = 7
			if (x_cmp >= 4)
				x_index = 7 - x_cmp
		}

		if (x >= 80) {

			x = 0
			x_cmp = 0
			x_index = 0

			y += 1

			if (y % Math.round(80 / 8) == 0) {
				y_cmp += 1
				if (y_cmp > 7)
					y_cmp = 7
			}
		}
	};

	return str;
}

var dispatch = function (req, res)
{
	console.log(req.url)
	var extension = path.extname(req.url)

	if (req.url == '/pict.bmp') {

		res.writeHead(200, {'Content-Type': 'image/bmp'})
		var str = makePict();

		res.end( str, 'binary')

	}
	else if (req.url == '/') {

		var file = './srcs/index.html'

		git.writeAuthor()
		mydoxy.writeDoc('scripts')
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
