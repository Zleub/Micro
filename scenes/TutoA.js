/*
* @Author: adebray
* @Date:   2015-06-11 00:18:37
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-06 00:08:01
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('TutoA' in Micro))
	Micro.TutoA = {};

(function () {

var TutoA = Micro.TutoA

TutoA.make = function () {

	// -- \|/ -- \|/ -- \|/ -- \
	//	BACKGROUND
	var background = new PIXI.extras.TilingSprite(Micro.Sprites.mountain_2[0]._texture, 400, 400)
		background.x = -256
		background.y = -256
		background.scale.x = 4
		background.scale.y = 4
		Micro.Layer.list.background.addChild(background)

	// -- \|/ -- \|/ -- \|/ -- \
	//	UI
	for (var i = 0; i < Micro.Sprites['needcoffee'].length; i++) {
		new Micro.Base(Micro.Sprites['needcoffee'][i]._texture)
			.moveTo(0, i * 21)
			.addTo(Micro.Layer.list.foreground)
			// .sprite.visible = false
	}

	var player = new Micro.Player(Micro.Sprites['dwarves'][0]._texture)
		player.addTo(Micro.Layer.list.foreground)
 		player.scale = Micro.Sprites['dwarves'][0].scale
 		player.collider[0].update = function (sprite) {
	 		player.collider[0].shape.x = sprite.x - sprite.width / 2
	 		player.collider[0].shape.y = sprite.y - sprite.height / 2
	 		player.collider[0].shape.width = sprite.width
	 		player.collider[0].shape.height = sprite.height
	 	}

	// -- \|/ -- \|/ -- \|/ -- \
	//	LEVEL

	// Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(0, Micro.height - Micro.size)
	// Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(160, Micro.height - Micro.size)
	// Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(400, 610)
	// Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(560, 610)
	// // Micro.Block.new(Micro.Sprites['Sprute'][64]).moveTo(560, 610)
	// // Micro.Block.new(Micro.Sprites['Sprute'][64]).moveTo(600, 610)
	// Micro.Block.new(Micro.Sprites['Sprute'][14 + 6]).moveTo(800 , 550)
	// Micro.Block.new(Micro.Sprites['Sprute'][14 + 6]).moveTo(960 , 550)

	// Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(560, 450)
	// Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(400, 400)
	// Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(300, 400)

	// Micro.Asset.newAtOn(Micro.Sprites['Sprute'][40], 400, 450, Micro.Layer.list.foreground)

	// Micro.Firetest = Micro.Asset.newAtOn(Micro.Sprites['Fire'][0], 400, 400, Micro.Layer.list.foreground)
	// // Micro.Asset.newAtOn(Micro.Sprites['Fire'][1], 600, 100, Micro.Layer.list.foreground)


	// Micro.doortest = Micro.Door.newAt(Micro.Sprites['Door'][0], -77, Micro.height - Micro.Sprites['Door'][0].width - 16)

	// // Micro.Door.newAt(Micro.Sprites['Door'][0], 200, 100).draw()

	// // Micro.Player.new(Micro.Sprites['dwarves'][19]).sprite.x = 0
	// // Micro.Player.new(Micro.Sprites['dwarves'][15]).sprite.x = 64
	// Micro.Player.new(Micro.Sprites['dwarves'][41]).sprite.x = 128
	// // Micro.Player.new(Micro.Sprites['dwarves'][1]).sprite.x = 128 + 64
	// // Micro.Entity.new(Micro.Sprites['dwarves'][21]).sprite.x = 128 * 2

	// Micro.Asset.newAtOn(Micro.Sprites['fence_sign'][0], 800, 392, Micro.Layer.list.foreground)
	// Micro.Asset.newAtOn(Micro.Sprites['fence_sign'][1], 960, 392, Micro.Layer.list.foreground)
}

})()
