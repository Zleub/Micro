/*
* @Author: adebray
* @Date:   2015-07-06 23:05:10
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-06 23:25:07
*/

'use strict';

var fs = require('fs')
var util = require('util')

var header = [
          '`--::-.`',
      './shddddddddhs+.',
    ':yddddddddddddddddy:',
  '`sdddddddddddddddddddds`',
  'ydddh+sdddddddddy+ydddds',
 '/ddddy:oddddddddds:sddddd/',
 'sdddddddddddddddddddddddds',
 'sdddddddddddddddddddddddds',
 ':ddddddddddhyyddddddddddd:+',
  'odddddddd/`:-`sdddddddds',
   '+ddddddh`+dh +dddddddo',
    '-sdddddh///sdddddds-',
      '.+ydddddddddhs/.',
          '.-::::-`'
]

var comment = [
  '__________________________',
 '/\\                       \\',
 '\\_|Comment Title          |',
   '|                        |',
   '|  Comment Content       |',
   '|   _____________________|_',
    '\\_/______________________/'
]

var _folder = './'
var _doc = {}

function readFile(file, index, array) {
	if (/[A-z]/.test(file[0]))
	{
		var data = fs.readFileSync(_folder + file)

		if (new RegExp(header[0]).test(data.toString()))
			if (new RegExp(comment[0]).test(data.toString()))
			{
				_doc[file] = []
				data.toString().split('\n').forEach(function (line, index, array) {
					var array
					if ((array = line.match("\\|(.+)\\|")))
						_doc[file].push(array[1].replace(/\s+$/, ""))
				})
			}

	}
}

exports.writeDoc = function (folder) {
	_folder = './' + folder + '/'
	_doc = {}
	fs.readdirSync(_folder).forEach(readFile)
	fs.writeFileSync('./engine/scripts/doc.json', JSON.stringify(_doc, null, "  "))
}
