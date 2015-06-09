/*
* @Author: adebray
* @Date:   2015-06-07 16:16:54
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-07 21:45:13
*/

'use strict';

var Micro = Micro || {}
if (!('Entity' in Micro))
	Micro.Entity = {};

(function () {

var Entity = Micro.Entity

Entity.list = {}

Entity.new = function (sprite) {
	return {
		sprite : sprite
	}
}

})()
