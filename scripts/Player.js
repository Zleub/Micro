//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Player.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-07 05:22:41
// :ddddddddddhyyddddddddddd: Modified: 2015-07-07 05:23:12
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

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
//  ____________________________________
// /\                                   \
// \_|A Player is build upon Entity     |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.Entity.call(this, texture)

//  ____________________________________
// /\                                    \
// \_|Player.update                      |
//   |                                   |
//   |  Since Base's update is an array  |
//   |    one should push an             |
//   |    Player's update in order to    |
//   |    get it processed               |
//   |   ________________________________|_
//    \_/_________________________________/

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
