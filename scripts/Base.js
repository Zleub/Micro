'use strict';

var Micro = window['Micro'] || {}

Micro.Base = function (texture) {
	this.update = []
	this.collider = []
	this.sprite = new PIXI.Sprite(texture)
	this.moveTo = function (x, y) {
		this.sprite.x = x
		this.sprite.y = y
		return this
	}
	this.addTo = function (layer) {
		layer.addChild(this.sprite)
		return this
	}
}

