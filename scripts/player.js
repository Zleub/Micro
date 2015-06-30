/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-30 12:40:30
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Player' in Micro))
	Micro.Player = {};

(function () {

var Player = Micro.Player

Player.list = []

Player.update = function (dt, player)
{
	if (Micro.keyArray[37]) {
		if (player.sprite.scale.x > 0)
			player.sprite.scale.x *= -1
		player.addVelocity(-1, 0)
	}

	if (Micro.keyArray[39]) {
		if (player.sprite.scale.x < 0)
			player.sprite.scale.x *= -1
		player.addVelocity(1, 0)
	}

	if (!Micro.keyArray[37] && !Micro.keyArray[39])
		player.velocity.x = 0

	if (Micro.keyArray[32] && player.jumpBool == true) {
		player.jumpDelay = 0
	}

}

Player.new = function (sprite) {
	var newPlayer = Micro.Entity.new(sprite)
	newPlayer.update.push(Player.update)
	// Micro.stage.addChild(newPlayer.sprite)
	Player.list.push(newPlayer)
	return newPlayer
}

})()
