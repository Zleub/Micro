/*
* @Author: adebray
* @Date:   2015-06-13 17:26:31
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-04 19:33:21
*/

'use strict';

var Micro = window['Micro'] || {}

Micro.Block = function (texture) {

//  ____________________________________
// /\                                   \
// \_|An Block is build upon Base      |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.Base.call(this, texture)

	this.collider.push( new Collider )

}
// if (!('Block' in Micro))
// 	Micro.Block = {};

// (function () {

// var Block = Micro.Block

// Block.list = []

// Block.collidesWith = function (dt, entity) {
// 	for (var i = 0; i < Block.list.length; i++)
// 	{
// 		// console.log(entity)
// 		var r1 = entity.sprite
// 		var r2 = Block.list[i].sprite

// 		Block.list[i].rectangle.y = r2.y - dt * 2
// 		Block.list[i].rectangle.height = dt * 2

// 		if (r1.x > r2.x && r1.x < r2.x + r2.width)
// 		{
// 			if (r1.y == r2.y - r1.height / 2) {
// 				entity.sprite.x += entity.velocity.x * dt
// 				if (entity.velocity.y < 0) {
// 					entity.sprite.y += entity.velocity.y * dt
// 				}
// 				entity.jumpBool = true
// 				entity.jumpDelay = Math.PI
// 				entity.velocity.y = 0
// 				return true
// 			}

// 			if (r1.y + r1.height / 2 < r2.y && r1.y + r1.height / 2 > r2.y - dt * 2)
// 			{
// 				Micro.Layer.list
// 				entity.sprite.x += entity.velocity.x * dt
// 				r1.y = r2.y - r1.height / 2
// 				entity.velocity.y = 0
// 				return true
// 			}
// 		}
// 	}
// 	return false
// }

// Block.moveTo = function (x, y)
// {
// 	this.sprite.x = x
// 	this.sprite.y = y
// 	this.rectangle.x = x
// 	this.rectangle.y = y
// 	return this
// }

// Block.draw = function () {
// 	Micro.Layer.list.debug.children[0].drawRect(
// 		this.rectangle.x,
// 		this.rectangle.y,
// 		this.rectangle.width,
// 		this.rectangle.height
// 	)
// }

// Block.new = function (sprite) {
// 	var t = {
// 		sprite : new PIXI.Sprite(sprite.generateTexture(Micro.renderer)),
// 		moveBy : Micro.Entity.moveBy,
// 		moveTo : Block.moveTo,
// 		draw : Block.draw
// 	}
// 	t.sprite.scale.x = sprite.scale.x
// 	t.sprite.scale.y = sprite.scale.y

// 	t.rectangle = new PIXI.Rectangle(t.sprite.x, t.sprite.y, t.sprite.width, t.sprite.height)

// 	Block.list.push(t)
// 	Micro.Layer.list.foreground.addChild(t.sprite)
// 	return t
// }

// })()
