/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-06 23:13:24
*/

// THAT SCRIPT SHOULD BE LAUNCH FROM THE ROOT

'use strict';

var http =		require('http')
var fs =		require('fs')
var path =		require('path')
var c_process =	require('child_process')
var git =		require('./scripts/git.js')
var mydoxy =	require('./scripts/mydoxy.js')
var mypict =	require('./scripts/picture.js')

var content_type = {
	".html" : {
		"Content-Type" : 'text/html',
		"Base-Directory" : './web/html'
	},
	".png" : {
		"Content-Type" : 'image/png',
		"Base-Directory" : '.'
	},
	".css" : {
		"Content-Type" : 'text/css',
		"Base-Directory" : '.'
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
		"Base-Directory" : '.'
	}
}

var response = function(res, file, extension)
{
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

var dispatch = function (req, res)
{
	var extension = path.extname(req.url)
	// console.log('File access:', req.url, extension)

	if (req.url == '/pict.bmp') {

		res.writeHead(200, {'Content-Type': 'image/bmp'})
		res.end(  mypict.make() , 'binary')

	}
	else if (req.url == '/') {

		// THIS IS CUSTOM BEHAVIOR ON INDEX CALL
		// git.writeAuthor()
		// mydoxy.writeDoc('engine/scripts')

		response(res, './web/html/index.html', ".html")
	}
	else if (extension == '.json') {
		var file = content_type[extension]["Base-Directory"] + req.url

		if (!fs.existsSync( file )) {
			console.log('NO JSON FILE: ' + file)
			var jsfile = path.dirname(file) + '/' + path.basename(file, '.json') + '.js'
			if (!fs.existsSync(jsfile))
				console.log('NO JS FILE: ' + jsfile)
			else {
				c_process.exec('node ' + jsfile, function (error, stdout, stderr) {
					if (error !== null) {
						console.log('exec error: ' + error);
					} else {
						res.writeHead(200, {'Content-Type': 'text/plain'})
						console.log(stdout.key)
						res.end( stdout )
					}
				})
			}

		}
		else {
			console.log("FOUND JSON: " + file)
			response(res, file, extension)
		}
	}
	else if (content_type[ extension ]) {
		var file = content_type[extension]["Base-Directory"] + req.url

		response(res, file, extension)
	}
}

var server = http.createServer(dispatch)

server.listen(80)
