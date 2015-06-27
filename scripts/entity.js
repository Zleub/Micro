/*
* @Author: adebray
* @Date:   2015-06-07 16:16:54
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 00:19:12
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Entity' in Micro))
	Micro.Entity = {};

var test = new PIXI.Graphics();
test.lineStyle(2, 0xacacac);
// test.drawCircle(300, 300, 1);

Micro.stage.addChild(test);

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

Entity.update = function (dt)
{
	// test.drawCircle(this.sprite.x, this.sprite.y, 1)
	for (var i = 0; i < Micro.Block.list.length; i++)
	{
		var r1 = this.sprite
		var r2 = Micro.Block.list[i].sprite

		if (r1.x + r1.width / 2 > r2.x && r1.x + r1.width / 2 < r2.x + r2.width)
		{
			if (r1.y == r2.y - r1.height) {
				this.sprite.x += this.velocity.x * dt
				if (this.velocity.y < 0) {
					this.sprite.y += this.velocity.y * dt
				}
				this.jumpBool = true
				this.jumpDelay = Math.PI
				this.addVelocity(0, dt)
				return
			}

			if (r1.y + r1.height < r2.y + dt && r1.y + r1.height > r2.y - dt)
			{
				this.sprite.x += this.velocity.x * dt
				r1.y = r2.y - r1.height
				this.velocity.y = 0
				return
			}
		}
	}

	this.sprite.x += this.velocity.x * dt
	this.sprite.y += this.velocity.y * dt

	if (this.sprite.y + this.sprite.height > Micro.height) {
		this.sprite.y = Micro.height - this.sprite.height
		this.jumpBool = true
		this.jumpDelay = Math.PI
		return
	}
	this.jumpBool = false
	this.addVelocity(0, dt)
}

Entity.new = function (sprite)
{
	var t = {
		velocity : {
			x_max : 1,
			y_max : 2,
			x : 0,
			y : 1
		},
		addVelocity : function (x, y) {
			this.velocity.x += x
			this.velocity.y += y
			this.velocity.x = Math.clamp(this.velocity.x, -this.velocity.x_max, this.velocity.x_max)
			this.velocity.y = Math.clamp(this.velocity.y, -this.velocity.y_max, this.velocity.y_max)
		},
		sprite : sprite,
		// moveBy : Entity.moveBy,
		update : Entity.update
	}
	Entity.list.push(t)
	return t
}

})()
