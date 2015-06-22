/*
* @Author: adebray
* @Date:   2015-06-07 16:16:54
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-21 18:25:44
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Entity' in Micro))
	Micro.Entity = {};

(function () {

var Entity = Micro.Entity

Entity.list = []

Entity.collides = function (r1, r2, x, y)
{
	if (r1.x + x + r1.width > r2.x && r1.y + y + r1.height > r2.y &&
		r1.x + x < r2.x + r2.width && r1.y + y < r2.y + r2.height)
		return true
	else
		return false
}

Entity.moveBy = function (x, y)
{
	x = Math.round(x)
	y = Math.round(y)
	for (var i = 0; i < Micro.Block.list.length; i++)
	{
		var r1 = this.sprite.getBounds()
		var r2 = Micro.Block.list[i].sprite.getBounds()

		if (Entity.collides(r1, r2, x, y))
		{
			// console.log(r1.y + r1.height - r2.y, r1.height / 32)
			if (this.jumpBool == false && r1.y + r1.height - r2.y < r1.height / 32)
			{
				this.sprite.x += x
				this.sprite.y = r2.y - r1.height
				this.jumpDelay = 1
				this.jumpBool = true
				return false
			}
			else
			{
				//console.log("catch")
				break
			}
		}
	}

	this.sprite.x += x
	this.sprite.y += y
	if (this.sprite.y + this.sprite.height > Micro.height) {
		this.sprite.y = Micro.height - this.sprite.height
		this.jumpBool = true
		return false
	}

	this.jumpBool = false
	return true
}

Entity.new = function (sprite) {
	var t = {
		sprite : sprite,
		moveBy : Entity.moveBy
	}
	Entity.list.push(t)
	return t
}

})()
