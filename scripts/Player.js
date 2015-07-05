/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-06 00:16:58
*/

'use strict';

var Micro = window['Micro'] || {}
// if (!('Player' in Micro))
// 	Micro.Player = {};

// (function () {

// var Player = Micro.Player

// Micro.playerList = []

// Player.update = function (dt, player)
// {
// 	// Micro.keypressed(18)

// 	if (Micro.keypressed('left')) {
// 		if (player.sprite.scale.x > 0)
// 			player.sprite.scale.x *= -1
// 		player.addVelocity(-1, 0)
// 	}

// 	if (Micro.keypressed('right')) {
// 		if (player.sprite.scale.x < 0)
// 			player.sprite.scale.x *= -1
// 		player.addVelocity(1, 0)
// 	}

// 	if (!Micro.keypressed('left') && !Micro.keypressed('right'))
// 		player.velocity.x = 0

// 	if (Micro.keypressed('space') && player.jumpBool == true) {
// 		player.jumpDelay = 0
// 	}

// }

Micro.Player = function (texture) {
	Micro.Entity.call(this, texture)
	// var newPlayer = Micro.Entity.new(sprite)
	this.update.push(function (dt, player)
	{
		// Micro.keypressed(18)

		if (Micro.keypressed('left')) {
			if (player.sprite.scale.x > 0)
				player.sprite.scale.x *= -1
			player.addVelocity(-1, 0)
		}

		if (Micro.keypressed('right')) {
			if (player.sprite.scale.x < 0)
				player.sprite.scale.x *= -1
			player.addVelocity(1, 0)
		}

		if (!Micro.keypressed('left') && !Micro.keypressed('right'))
			player.velocity.x = 0

		if (Micro.keypressed('space') && player.jumpBool == true) {
			player.jumpDelay = 0
		}

	})

}
