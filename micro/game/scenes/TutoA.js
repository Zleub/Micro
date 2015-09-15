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

	Micro.creationWrapper("stdblock", function (x, y) {
		var block = new Micro.Block(Micro.Sprites['Sprute'][14]._texture)
			block.moveTo(x, y)
			block.scale = Micro.Sprites['Sprute'][14].scale
			block.addTo(Micro.Layer.list.foreground)
		return block
	})

	Micro.creationWrapper("stdfire", function (x, y) {

		new Micro.Base(Micro.Sprites['Sprute'][40]._texture)
			.moveTo(x, y)
			.addTo(Micro.Layer.list.foreground)
			.scale = Micro.Sprites['Sprute'][40].scale
		new Micro.Base(Micro.Sprites['Sprute'][40]._texture)
			.moveTo(x, y - 80)
			.addTo(Micro.Layer.list.foreground)
			.scale = Micro.Sprites['Sprute'][40].scale

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
		anim.moveTo(x, y - 50)
		anim.addTo(Micro.Layer.list.foreground)
		anim.scale = Micro.Sprites['Fire'][0].scale
	})

	Micro.creationWrapper("stdbase", function (x, y) {
		new Micro.Base(Micro.Sprites['Sprute'][40]._texture)
			.moveTo(x, y)
			.addTo(Micro.Layer.list.foreground)
			.scale = Micro.Sprites['Sprute'][40].scale
	})

	var stdpopu = new Micro.Populator()
	stdpopu.Seeder.rule.quantity = 42
	stdpopu.Seeder.rule.seed = function () { return Math.getRandomInt(-1, 4) }

	stdpopu.x = 0
	stdpopu.y = Micro.height
	stdpopu.rule.seedControl = function (Populator, Seed) {
		if (Seed == -1)
			Populator.y -= 80
		else if (Seed == 1)
			Populator.y += 80
	};
	stdpopu.rule.contentControl = function (Populator, Seed) {
		if (Seed == 0)
			Micro.Wrapper.stdfire(Populator.x, Populator.y - 160)

		var element = Micro.Wrapper.stdblock(Populator.x, Populator.y)
		Populator.x += 160
		return element
	};
	stdpopu.rule.creationControl = function (Populator, Element) {
		// console.log(Element)
		if (Element.Node.parent && Element.Node.parent.parent
			&& Element.Node.parent.parent.content) {
			if (Element.Node.parent.parent.content.sprite.y ==
				Element.sprite.y && Element.Node.parent.content.sprite.y !=
				Element.sprite.y)
			{
				Micro.Layer.list.foreground.removeChild(Element.Node.parent.content.sprite)
				for(var i = Micro.blockList.length - 1; i >= 0; i--) {
					if(Micro.blockList[i] === Element.Node.parent.content) {
						Micro.blockList.splice(i, 1);
					}
				}
				Element.Node.parent.parent.child = Element.Node
				Element.Node.parent = Element.Node.parent.parent
			}
		}
	};
	stdpopu.rule.completionControl = function (Populator) {
	};
	stdpopu.call()

	console.log(stdpopu)


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
		player.moveTo(64, 0)

		// create a filter
		var blurFilter = new PIXI.filters.BlurFilter();
		// blurFilter.blur = 100

		// set the filter
		// player.sprite.filters = [ blurFilter ];

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


	var G = new PIXI.Graphics()
		G.lineStyle(2, 0xacacac)

	Micro.Layer.list.ui.children[0].addChild(G)

	var T = new PIXI.Text('Resume', {font : '24px courier', fill : 0xd8d8d8, align : 'center'})
		T.anchor.x = 0.5
		T.anchor.y = 0.5

		T.x = Micro.width / 2
		T.y = Micro.height / 2 - 100

	var Q = new PIXI.Text('Keys', {font : '24px courier', fill : 0xd8d8d8, align : 'center'})
		Q.anchor.x = 0.5
		Q.anchor.y = 0.5

		Q.x = Micro.width / 2
		Q.y = Micro.height / 2 + 100

	Micro.Layer.list.ui.children[0].addChild(T)
	Micro.Layer.list.ui.children[0].addChild(Q)

		Micro.B = new Micro.Base(Micro.Sprites['select'][0]._texture)
		Micro.B.sprite.anchor = {x: 0.5, y:0.5}
		Micro.B.moveTo(T.x, T.y)
		Micro.B.addTo(Micro.Layer.list.ui.children[0])

}

})()
