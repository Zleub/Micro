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
		block.moveTo(559, 610)
		block.scale = Micro.Sprites['Sprute'][14].scale

		// block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		// block.moveTo(600, 610)
		// block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(800 , 550)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(959 , 550)
		block.scale = Micro.Sprites['Sprute'][14].scale

		block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture).addTo(Micro.Layer.list.foreground)
		block.moveTo(559, 450)
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

	// Micro.firetest = new Micro.Base(Micro.Sprites['Fire'][0]._texture)
	// 	Micro.firetest.moveTo(400, 400)
	// 	Micro.firetest.addTo(Micro.Layer.list.foreground)
	// 	Micro.firetest.scale = Micro.Sprites['Fire'][0].scale

	// Micro.Asset.newAtOn(Micro.Sprites['Sprute'][40], 400, 450, Micro.Layer.list.foreground)

	// Micro.Firetest = Micro.Asset.newAtOn(Micro.Sprites['Fire'][0], 400, 400, Micro.Layer.list.foreground)

	var anim = new Micro.Animation(Micro.Sprites['Fire'])
		var Collider = new Micro.Collider({
			x : anim.sprite.x - anim.sprite.width / 2,
			y : anim.sprite.y - anim.sprite.height / 2,
			width : anim.sprite.width,
			height : anim.sprite.height
		})

		Collider.update = function (entity) {
				this.shape.x = entity.sprite.x + entity.sprite.width / 4
				this.shape.y = entity.sprite.y
				this.shape.width = entity.sprite.width / 2
				this.shape.height = entity.sprite.height
		}

		Collider.collideFunction = function (entity) {
				Micro.ui[19].visible = true
		}

		anim.collider.push(Collider)
		anim.moveTo(400, 400)
		anim.addTo(Micro.Layer.list.foreground)
		anim.scale = Micro.Sprites['Fire'][0].scale


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

	// -- \|/ -- \|/ -- \|/ -- \
	//	UI

	Micro.ui = []
	for (var i = 0; i < Micro.Sprites['needcoffee'].length; i++) {
		var base = new Micro.Base(Micro.Sprites['needcoffee'][i]._texture)
			// base.moveTo(Micro.width / 2, Micro.height / 2)
			base.addTo(Micro.Layer.list.foreground)
			base.update.push( function (dt, entity) {
				entity.sprite.x = Micro.entityList[0].sprite.x - 20
				entity.sprite.y = Micro.entityList[0].sprite.y - 80
				if (entity.visible == true)
					entity.sprite.visible = true
				else
					entity.sprite.visible = false
				entity.visible = false
			})
			base.sprite.visible = false
			base.sprite.scale.x = 2
			base.sprite.scale.y = 2
			Micro.ui.push(base)
			// .sprite.visible = false
	}
}

})()
