/*
* @Author: adebray
* @Date:   2015-06-13 17:26:31
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 16:32:35
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
		sprite : new PIXI.Sprite(sprite.generateTexture(Micro.renderer)),
		moveBy : Micro.Entity.moveBy,
		moveTo : Block.moveTo
	}
	Micro.Layer.list.foreground.addChild(t.sprite)
	t.sprite.scale.x = sprite.scale.x
	t.sprite.scale.y = sprite.scale.y

	Block.list.push(t)
	return t
}

})()
