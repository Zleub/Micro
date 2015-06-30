/*
* @Author: adebray
* @Date:   2015-06-11 00:18:37
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-30 11:04:36
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('TutoA' in Micro))
	Micro.TutoA = {};

(function () {

var TutoA = Micro.TutoA

TutoA.make = function () {
	Micro.Asset.newAt(Micro.Sprites['mountain_2'][0], 0, Micro.height - Micro.Sprites['mountain_2'][0].height)
	Micro.Asset.newAt(Micro.Sprites['mountain_2'][0], Micro.Sprites['mountain_2'][0].width, Micro.height - Micro.Sprites['mountain_2'][0].height)

	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(0, Micro.height - Micro.size)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(160, Micro.height - Micro.size)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(400, 610)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(560, 610)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(560, 610)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(600, 610)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(800 , 550)
	Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(950 , 550)
	Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(560, 450)
	Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(400, 400)
	Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(300, 400)
	Micro.Asset.newAtOn(Micro.Sprites['Sprute'][40], 400, 450, Micro.Layer.list.foreground)

	Micro.Door.newAt(Micro.Sprites['Door'][0], -77, Micro.height - Micro.Sprites['Door'][0].width - 16)
	// Micro.Door.newAt(Micro.Sprites['Door'][0], 200, 100).draw()

	// Micro.Player.new(Micro.Sprites['dwarves'][19]).sprite.x = 0
	Micro.Player.new(Micro.Sprites['dwarves'][19]).sprite.x = 128
	// Micro.Entity.new(Micro.Sprites['dwarves'][21]).sprite.x = 128 * 2

}

})()
