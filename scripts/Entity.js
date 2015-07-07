//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Entity.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-07 04:03:26
// :ddddddddddhyyddddddddddd: Modified: 2015-07-07 04:03:48
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

// var test = new PIXI.Graphics();
// test.lineStyle(2, 0xacacac);
// // test.drawCircle(300, 300, 1);

// Micro.stage.addChild(test);

// (function () {

// var Entity = Micro.Entity

// Entity.list = []

// Entity.collides = function (r1, r2, x, y)
// {
// 	if (r1.x + x + r1.width > r2.x && r1.y + y + r1.height > r2.y &&
// 		r1.x + x < r2.x + r2.width && r1.y + y < r2.y + r2.height)
// 		return true
// 	else
// 		return false
// }

// Entity.update = function (dt, entity)
// {
// 	if (entity.jumpDelay < Math.PI)
// 	{
// 		entity.jumpDelay += dt / 200
// 		entity.addVelocity(0, -Math.cos(entity.jumpDelay) * 3)
// 		entity.jumpBool = false
// 	}
// 	else
// 	{
// 		entity.jumpDelay = Math.PI
// 	}

// 	var tmpBool = false

// 	Micro.Door.collidesWith(dt, entity)

// 	if (Micro.Block.collidesWith(dt, entity))
// 		tmpBool = true

// 	if (tmpBool)
// 		return


// 	entity.sprite.x += entity.velocity.x * dt
// 	entity.sprite.y += entity.velocity.y * dt

// 	entity.jumpBool = false
// 	entity.addVelocity(0, dt)

// }

Micro.entityList = []

Micro.Entity = function (texture)
{
//  ____________________________________
// /\                                   \
// \_|Entity is build upon Base         |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.Base.call(this, texture)

//  ____________________________________
// /\                                    \
// \_|Entity.jumpDelay && Entity.jumpBool|
//   |                                   |
//   |  Entity.jumpDelay is meant to be  |
//   |    decremented over time.         |
//   |  Entity.jumpBool is the trigger   |
//   |    allowing jump for an Entity    |
//   |   ________________________________|_
//    \_/_________________________________/


	this.jumpDelay = Math.PI
	this.jumpBool = false

	this.velocity = {
		x_max : 1,
		y_max : 2,
		x : 0,
		y : 1
	}
	this.addVelocity = function (x, y) {
		this.velocity.x += x
		this.velocity.y += y
		this.velocity.x = Math.clamp(this.velocity.x, -this.velocity.x_max, this.velocity.x_max)
		this.velocity.y = Math.clamp(this.velocity.y, -this.velocity.y_max, this.velocity.y_max)
	}

	this.sprite.anchor.x = 0.5
	this.sprite.anchor.y = 0.5

	this.update.push( function (dt, entity)
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


		if (entity.sprite.y + entity.sprite.height / 2 > Micro.height) {
			entity.sprite.y = Micro.height - entity.sprite.height / 2
			entity.jumpBool = true
		}
	})

	Micro.entityList.push(this)
}
