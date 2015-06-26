/*
* @Author: adebray
* @Date:   2015-06-25 17:12:34
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-26 16:19:08
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Vec2' in Micro))
	Micro.Vec2 = {};

// console.log('test&&&')

(function () {

var Vec2 = Micro.Vec2

Vec2.new = function () {
	var vec = {
		x : 0,
		y : 0
	}
	return vec
}

})()
