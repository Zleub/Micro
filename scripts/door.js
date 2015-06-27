'use strict';

var Micro = window['Micro'] || {}
if (!('Door' in Micro))
	Micro.Door = {};

(function () {

var Door = Micro.Door

Door.list = []

Door.draw = function () {
	Micro.Layer.list.debug.children[0].drawRect(
		this.Irectangle.x,
		this.Irectangle.y,
		this.Irectangle.width,
		this.Irectangle.height
	)
	Micro.Layer.list.debug.children[0].drawRect(
		this.Crectangle.x,
		this.Crectangle.y,
		this.Crectangle.width,
		this.Crectangle.height
	)
}

Door.new = function (sprite) {
	var t = {}
	t.sprite = new PIXI.Sprite(sprite.generateTexture(Micro.renderer))
	t.sprite.scale.x = sprite.scale.x
	t.sprite.scale.y = sprite.scale.y
	t.Irectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 4, t.sprite.y, t.sprite.width - t.sprite.width / 2, t.sprite.height)
	t.Crectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 2.2, t.sprite.y, t.sprite.width - t.sprite.width / 1.1, t.sprite.height)
	t.draw = Door.draw

	Micro.Layer.list.foreground.addChild(t.sprite)
	Door.list.push(t)
	return t
}

Door.newAt = function (sprite, x, y) {
	var t = {}
	t.sprite = new PIXI.Sprite(sprite.generateTexture(Micro.renderer))
	t.sprite.x = x
	t.sprite.y = y
	t.sprite.scale.x = sprite.scale.x
	t.sprite.scale.y = sprite.scale.y
	t.Irectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 4, t.sprite.y, t.sprite.width - t.sprite.width / 2, t.sprite.height)
	t.Crectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 2.2, t.sprite.y, t.sprite.width - t.sprite.width / 1.1, t.sprite.height)
	t.draw = Door.draw

	Micro.Layer.list.foreground.addChild(t.sprite)
	Door.list.push(t)
	return t
}

})()
