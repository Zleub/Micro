/*
* @Author: adebray
* @Date:   2015-06-13 17:26:31
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-13 23:50:26
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Block' in Micro))
	Micro.Block = {};

(function () {

var Block = Micro.Block

Block.list = []

Block.moveTo = function (x, y)
{
	this.sprite.x = x
	this.sprite.y = y
}

Block.new = function (sprite) {
	var t = {
		sprite : sprite,
		moveBy : Micro.Entity.moveBy,
		moveTo : Block.moveTo
	}
	Micro.stage.addChild(sprite)
	Block.list.push(t)
	return t
}

})()
