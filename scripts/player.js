/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 19:27:36
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
		player.addVelocity(-0.5, 0)
	}

	if (Micro.keyArray[39]) {
		if (player.sprite.scale.x < 0)
			player.sprite.scale.x *= -1
		player.addVelocity(0.5, 0)
	}

	if (!Micro.keyArray[37] && !Micro.keyArray[39])
		player.velocity.x = 0

	if (Micro.keyArray[32] && player.jumpBool == true) {
		// console.log("satrt")
		player.jumpDelay = 0
	}

	if (player.jumpDelay < Math.PI)
	{
		player.jumpDelay += dt / 200
		// console.log(Micro.Player.list[0].velocity, -Math.cos(player.jumpDelay) * 2 - 0.6)
		player.addVelocity(0, -Math.cos(player.jumpDelay) * 3)
		player.jumpBool = false
	}
	else
	{
		player.jumpDelay = Math.PI
		// player.addVelocity(0, 0.6)
	}
}

Player.toString = function ()
{
	return "" + this.state
}

Player.new = function (sprite) {
	var newPlayer = Micro.Entity.new(sprite)
	newPlayer.jumpDelay = Math.PI
	newPlayer.sprite.x = 0
	newPlayer.sprite.y = 0
	newPlayer.sprite.anchor.x = 0.5
	newPlayer.sprite.anchor.y = 0.5
	newPlayer.update.push(Player.update)
	newPlayer.toString = Player.toString
	Micro.stage.addChild(newPlayer.sprite)
	Player.list.push(newPlayer)
	return newPlayer
}

})()
