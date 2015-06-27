/*
* @Author: adebray
* @Date:   2015-06-07 16:16:54
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 19:29:21
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

var time = 0

Entity.update = function (dt, entity)
{
	// -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //

	if (Micro.debug) {

	if (time > 1) {
		time = 0;
		Micro.Layer.list.debug.reset()
	}

	time += dt / 1000
	// test.drawCircle(this.sprite.x, this.sprite.y, 1)


	for (var i = 0; i < Micro.Block.list.length; i++)
	{
		Micro.Block.list[i].rectangle.y = Micro.Block.list[i].sprite.y - dt
		Micro.Block.list[i].rectangle.height = dt * 2
		// console.log(time, old_time)
//		if (time < 5)
			Micro.Block.list[i].draw()
	}

	for (var i = Micro.Door.list.length - 1; i >= 0; i--) {
		Micro.Door.list[i].draw()
	};

	// Micro.Layer.list.debug.children[0].drawCircle(this.sprite.x, this.sprite.y, 1)

	}

	// -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //

	for (var i = 0; i < Micro.Block.list.length; i++)
	{
		// console.log(entity)
		var r1 = entity.sprite
		var r2 = Micro.Block.list[i].sprite

		if (r1.x > r2.x && r1.x < r2.x + r2.width)
		{
			if (r1.y == r2.y - r1.height / 2) {
				entity.sprite.x += entity.velocity.x * dt
				if (entity.velocity.y < 0) {
					entity.sprite.y += entity.velocity.y * dt
				}
				entity.jumpBool = true
				entity.jumpDelay = Math.PI
				entity.addVelocity(0, dt)
				return
			}

			if (r1.y + r1.height / 2 < r2.y + dt && r1.y + r1.height / 2 > r2.y - dt)
			{
				entity.sprite.x += entity.velocity.x * dt
				r1.y = r2.y - r1.height / 2
				entity.velocity.y = 0
				return
			}
		}
	}

	entity.sprite.x += entity.velocity.x * dt
	entity.sprite.y += entity.velocity.y * dt

	if (entity.sprite.y + entity.sprite.height / 2 > Micro.height) {
		entity.sprite.y = Micro.height - entity.sprite.height / 2
		entity.jumpBool = true
		entity.jumpDelay = Math.PI
		return
	}
	entity.jumpBool = false
	entity.addVelocity(0, dt)
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
		sprite : new PIXI.Sprite(sprite.generateTexture(Micro.renderer)),
		// moveBy : Entity.moveBy,
		update : []
	}
	t.sprite.scale.x = sprite.scale.x
	t.sprite.scale.y = sprite.scale.y
	t.update.push(Entity.update)

	Entity.list.push(t)
	return t
}

})()
