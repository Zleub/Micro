/*
* @Author: adebray
* @Date:   2015-06-13 17:26:31
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 17:55:17
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
	this.rectangle.x = x
	this.rectangle.y = y
	return this
}

Block.draw = function () {
	Micro.Layer.list.debug.children[0].drawRect(
		this.rectangle.x,
		this.rectangle.y,
		this.rectangle.width,
		this.rectangle.height
	)
}

Block.new = function (sprite) {
	var t = {
		sprite : new PIXI.Sprite(sprite.generateTexture(Micro.renderer)),
		moveBy : Micro.Entity.moveBy,
		moveTo : Block.moveTo,
		draw : Block.draw
	}
	t.sprite.scale.x = sprite.scale.x
	t.sprite.scale.y = sprite.scale.y

	t.rectangle = new PIXI.Rectangle(t.sprite.x, t.sprite.y, t.sprite.width, t.sprite.height)

	Block.list.push(t)
	Micro.Layer.list.foreground.addChild(t.sprite)
	return t
}

})()
