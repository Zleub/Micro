/*
* @Author: adebray
* @Date:   2015-06-13 03:33:39
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-14 00:42:02
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
		this.moveBy(-dt, 0);
	if (Micro.keyArray[39])
		this.moveBy(dt, 0);
}

Player.new = function (sprite) {
	var t = Micro.Entity.new(sprite)
	t.sprite.x = 0
	t.sprite.y = 0
	t.update = Player.update
	Micro.stage.addChild(sprite)
	Player.list.push(t)
	return t
}

})()
