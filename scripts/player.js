/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-30 10:52:08
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
	// if (Micro.keyArray[71])
	// 	Micro.Layer.list.foreground.position.x -= dt
	// if (Micro.keyArray[72])
	// 	Micro.Layer.list.foreground.position.x += dt
	// if (Micro.keyArray[89])
	// 	Micro.Layer.list.foreground.position.y -= dt
	// if (Micro.keyArray[66])
	// 	Micro.Layer.list.foreground.position.y += dt

	if (Micro.keyArray[37]) {
		if (player.sprite.scale.x > 0)
			player.sprite.scale.x *= -1
		player.addVelocity(-1, 0)
		// Micro.Layer.list.foreground.position.x += dt
	}

	if (Micro.keyArray[39]) {
		if (player.sprite.scale.x < 0)
			player.sprite.scale.x *= -1
		player.addVelocity(1, 0)
		// Micro.Layer.list.foreground.position.x -= dt
	}

	if (!Micro.keyArray[37] && !Micro.keyArray[39])
		player.velocity.x = 0

	if (Micro.keyArray[32] && player.jumpBool == true) {
		// console.log("satrt")
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
