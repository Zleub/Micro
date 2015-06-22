/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-21 18:25:08
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
	if (Micro.keyArray[37])
		this.moveBy(-dt / 2, 0);
	if (Micro.keyArray[39])
		this.moveBy(dt / 2, 0);
	// if (Micro.keyArray[38])
	// 	this.moveBy(0, -dt * 2);
	// if (Micro.keyArray[40])
	// 	this.moveBy(0, dt * 2);

	if (Micro.keyArray[32] && this.jumpBool == true)
		this.jumpDelay = 0

	if (this.jumpDelay < 1)
	{
		this.jumpDelay += dt / 200
		if (!(this.moveBy(0, -dt * Math.cos(this.jumpDelay) * 2)))
			this.jumpDelay = 1
	}
	else
	{
		this.jumpDelay = 1
	}
}

Player.toString = function ()
{
	return "" + this.state
}

Player.new = function (sprite) {
	var t = Micro.Entity.new(sprite)
	t.sprite.x = 0
	t.sprite.y = 0
	t.update = Player.update
	t.toString = Player.toString
	Micro.stage.addChild(sprite)
	Player.list.push(t)
	return t
}

})()
