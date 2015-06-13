/*
* @Author: adebray
* @Date:   2015-06-07 16:16:54
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-14 01:49:16
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Entity' in Micro))
	Micro.Entity = {};

(function () {

var Entity = Micro.Entity

Entity.list = []

Entity.collides = function (r1, r2)
{
	if (r1.x + r1.width > r2.x && r1.y + r1.height > r2.y &&
		r1.x < r2.x + r2.width && r1.y < r2.y + r2.height)
		return true
	else
		return false
}

Entity.moveBy = function (x, y)
{
	for (var i = 0; i < Micro.Block.list.length; i++)
	{
		var r1 = this.sprite.getBounds()
		var r2 = Micro.Block.list[i].sprite.getBounds()

		r1.x += x
		r1.y += y
		if (Entity.collides(r1,r2))
		{
			// console.log(this.sprite.y + this.sprite.height, r2.y - this.sprite.height )
			this.sprite.x += x
			if (this.sprite.y + this.sprite.height - r2.y < this.sprite.height / 2)
			{
				this.sprite.y = r2.y - this.sprite.height
				return
			}
			else
				break
		}
	}

	this.sprite.x += x
	this.sprite.y += y
	if (this.sprite.y + this.sprite.height > Micro.height)
		this.sprite.y = Micro.height - this.sprite.height
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
