//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  door.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-06-30 17:37:26
// :ddddddddddhyyddddddddddd: Modified: 2015-08-07 08:54:17
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}
if (!('Door' in Micro))
	Micro.Door = {};

(function () {

var Door = Micro.Door

Door.list = []

Door.collidesWith = function (dt, entity) {

	var caca = {}
	caca.left_move = entity.sprite.x - entity.sprite.width / 2 - dt
	caca.left_min = entity.sprite.x - entity.sprite.width / 2

	caca.right_move = entity.sprite.x + entity.sprite.width / 2 + dt
	caca.right_min = entity.sprite.x + entity.sprite.width / 2

	for (var i = Door.list.length - 1; i >= 0; i--) {
		var r1 = entity
		var r2 = Door.list[i].Crectangle

		for (var m = caca.left_min; m >= caca.left_move; m -= 0.01)
		{
			if (r2.x + r2.width > m && r2.x < m ) {
				r1.velocity.x = 1
			}
		}

		for (var m = caca.right_min; m <= caca.right_move; m += 0.01)
		{
			if (r2.x + r2.width > m  && r2.x < m ) {
				r1.velocity.x = 0
			}
		}
	};
}

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
	t.Irectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 8, t.sprite.y, t.sprite.width - t.sprite.width / 4, t.sprite.height)
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
	t.Irectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 8, t.sprite.y, t.sprite.width - t.sprite.width / 4, t.sprite.height)
	t.Crectangle = new PIXI.Rectangle(t.sprite.x + t.sprite.width / 2.2, t.sprite.y, t.sprite.width - t.sprite.width / 1.1, t.sprite.height)
	t.draw = Door.draw

	Micro.Layer.list.foreground.addChild(t.sprite)
	Door.list.push(t)
	return t
}

})()
