/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-26 15:28:56
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Player' in Micro))
	Micro.Player = {};

(function () {

var Player = Micro.Player

Player.list = []

Player.update = function (dt)
{
	if (this.Eupdate)
		this.Eupdate(dt)

	if (Micro.keyArray[37]) {
		// if (this.sprite.scale.x > 0)
			// this.sprite.scale.x *= -1
		this.addVelocity(-0.5, 0)
	}

	if (Micro.keyArray[39]) {
		// if (this.sprite.scale.x < 0)
			// this.sprite.scale.x *= -1
		this.addVelocity(0.5, 0)
	}

	if (!Micro.keyArray[37] && !Micro.keyArray[39])
		this.velocity.x = 0

	if (Micro.keyArray[32] && this.jumpBool == true) {
		// console.log("satrt")
		this.jumpDelay = 0
	}

	if (this.jumpDelay < Math.PI)
	{
		this.jumpDelay += dt / 200
		// console.log(Micro.Player.list[0].velocity, -Math.cos(this.jumpDelay) * 2 - 0.6)
		this.addVelocity(0, -Math.cos(this.jumpDelay) * 3)
		this.jumpBool = false
	}
	else
	{
		this.jumpDelay = Math.PI
		// this.addVelocity(0, 0.6)
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
	if (newPlayer.update)
		newPlayer.Eupdate = newPlayer.update
	newPlayer.update = Player.update
	newPlayer.toString = Player.toString
	Micro.stage.addChild(sprite)
	Player.list.push(newPlayer)
	return newPlayer
}

})()
