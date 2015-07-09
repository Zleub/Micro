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

	// -- \|/ -- \|/ -- \|/ -- \
	//	LEVEL

	var block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(0, Micro.height - Micro.size)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(160, Micro.height - Micro.size)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(400, 610)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(560, 610)
		block.scale = Micro.Sprites['Sprute'][14].scale

		// block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		// block.moveTo(600, 610)
		// block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(800 , 550)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(960 , 550)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(560, 450)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(400, 400)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(300, 400)
		block.scale = Micro.Sprites['Sprute'][14].scale

		new Micro.Base(Micro.Sprites['Sprute'][40]._texture)
			.moveTo(400, 450)
			.addTo(Micro.Layer.list.foreground)
			.scale = Micro.Sprites['Sprute'][40].scale

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

	var player = new Micro.Player(Micro.Sprites['dwarves'][0]._texture)
		player.addTo(Micro.Layer.list.foreground)
		player.scale = Micro.Sprites['dwarves'][0].scale
		player.moveTo(128, 0)
}

})()
