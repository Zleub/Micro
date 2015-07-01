/*
* @Author: adebray
* @Date:   2015-06-07 16:16:54
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-01 13:36:53
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

Entity.update = function (dt, entity)
{
	if (entity.jumpDelay < Math.PI)
	{
		entity.jumpDelay += dt / 200
		entity.addVelocity(0, -Math.cos(entity.jumpDelay) * 3)
		entity.jumpBool = false
	}
	else
	{
		entity.jumpDelay = Math.PI
	}

	var tmpBool = false

	Micro.Door.collidesWith(dt, entity)

	if (Micro.Block.collidesWith(dt, entity))
		tmpBool = true

	if (tmpBool)
		return


	entity.sprite.x += entity.velocity.x * dt
	entity.sprite.y += entity.velocity.y * dt

	entity.jumpBool = false
	entity.addVelocity(0, dt)

}

var id = 0

Entity.new = function (sprite)
{
	id += 1;
	var t = {
		id : id,
		jumpDelay : Math.PI,
		jumpBool : false,

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
	t.sprite.anchor.x = 0.5
	t.sprite.anchor.y = 0.5
	t.sprite.scale.x = sprite.scale.x
	t.sprite.scale.y = sprite.scale.y
	t.update.push(Entity.update)

	Micro.Layer.list.foreground.addChild(t.sprite)
	Entity.list.push(t)
	return t
}

})()
