/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-24 01:44:49
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

	if (Micro.keyArray[37])
		this.addVelocity(-0.6, 0)

	if (Micro.keyArray[39])
		this.addVelocity(0.6, 0)

	if (!Micro.keyArray[37] && !Micro.keyArray[39])
		this.velocity.x = 0

	if (Micro.keyArray[32] && this.jumpBool == true)
		this.jumpDelay = 0
	if (this.jumpDelay < Math.PI)
	{
		this.jumpDelay += dt / 150
		console.log((Math.cos(this.jumpDelay)))
		this.addVelocity(0, -Math.cos(this.jumpDelay) / 8)
	}
	else
	{
		this.jumpDelay = Math.PI
		this.addVelocity(0, 0.6)
	}
}

Player.toString = function ()
{
	return "" + this.state
}

Player.new = function (sprite) {
	var newPlayer = Micro.Entity.new(sprite)
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
