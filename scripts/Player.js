//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Player.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-11 03:20:51
// :ddddddddddhyyddddddddddd: Modified: 2015-08-21 01:44:15
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

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
//   |  The standard player behavior is  |
//   |    to be able to catch keyboard   |
//   |    key.                           |
//   |   ________________________________|_
//    \_/_________________________________/

	this.orientation = 'right'

	this.update.push(function (dt, player)
	{
		// Micro.keypressed(18)

		if (Micro.keypressed('left')) {
			if (player.sprite.scale.x > 0)
				player.sprite.scale.x *= -1
			player.addVelocity(-1, 0)
			if (player.orientation != 'left') {
				player.orientation = 'left'

			}
		}

		if (Micro.keypressed('right')) {
			if (player.sprite.scale.x < 0)
				player.sprite.scale.x *= -1
			player.addVelocity(1, 0)
			if (player.orientation != 'right') {
				player.orientation = 'right'
			}
		}

		if (!Micro.keypressed('left') && !Micro.keypressed('right'))
			player.velocity.x = 0

		if (Micro.keypressed('space') && player.jumpBool == true) {
			player.jumpDelay = 0
		}

	})

}
