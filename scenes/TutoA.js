/*
* @Author: adebray
* @Date:   2015-06-11 00:18:37
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-02 18:35:59
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('TutoA' in Micro))
	Micro.TutoA = {};

(function () {

var TutoA = Micro.TutoA

TutoA.make = function () {

	Micro.test = Micro.Asset.newAtOn(Micro.Sprites['needcoffee'][19], Micro.width / 2, Micro.height / 2 - 100, Micro.Layer.list.ui)
	Micro.test.visible = false

	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(0, Micro.height - Micro.size)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(160, Micro.height - Micro.size)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(400, 610)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(560, 610)
	// Micro.Block.new(Micro.Sprites['Sprute'][64]).moveTo(560, 610)
	// Micro.Block.new(Micro.Sprites['Sprute'][64]).moveTo(600, 610)
	Micro.Block.new(Micro.Sprites['Sprute'][14 + 6]).moveTo(800 , 550)
	Micro.Block.new(Micro.Sprites['Sprute'][14 + 6]).moveTo(950 , 550)

	for (var i = 1; i < 100; i++) {
		var tmp = Math.getRandomInt(-1, 2)
		Micro.Block.new(Micro.Sprites['Sprute'][14 + 6]).moveTo(950 + 32 * 5 * i + tmp, 550 + 32 * 2 * tmp)
	};
	Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(560, 450)
	Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(400, 400)
	Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(300, 400)

	Micro.Asset.newAtOn(Micro.Sprites['Sprute'][40], 400, 450, Micro.Layer.list.foreground)

	Micro.Firetest = Micro.Asset.newAtOn(Micro.Sprites['Fire'][0], 400, 400, Micro.Layer.list.foreground)
	// Micro.Asset.newAtOn(Micro.Sprites['Fire'][1], 600, 100, Micro.Layer.list.foreground)


	Micro.doortest = Micro.Door.newAt(Micro.Sprites['Door'][0], -77, Micro.height - Micro.Sprites['Door'][0].width - 16)

	// Micro.Door.newAt(Micro.Sprites['Door'][0], 200, 100).draw()

	// Micro.Player.new(Micro.Sprites['dwarves'][19]).sprite.x = 0
	// Micro.Player.new(Micro.Sprites['dwarves'][15]).sprite.x = 64
	Micro.Player.new(Micro.Sprites['dwarves'][41]).sprite.x = 128
	// Micro.Player.new(Micro.Sprites['dwarves'][1]).sprite.x = 128 + 64
	// Micro.Entity.new(Micro.Sprites['dwarves'][21]).sprite.x = 128 * 2

	Micro.Asset.newAtOn(Micro.Sprites['fence_sign'][0], 800, 392, Micro.Layer.list.foreground)
	Micro.Asset.newAtOn(Micro.Sprites['fence_sign'][0], 950, 392, Micro.Layer.list.foreground)
}

})()
