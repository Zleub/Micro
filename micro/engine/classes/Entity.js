//      ./shddddddddhs+.
//          `--::-.`
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Entity.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-07 07:47:24
// :ddddddddddhyyddddddddddd: Modified: 2015-08-21 01:39:16
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

Micro.entityList = []

Micro.Entity = function (texture)
{
//  ____________________________________
// /\                                   \
// \_|An Entity is build upon Base      |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.Base.call(this, texture)

//  ____________________________________
// /\                                    \
// \_|Entity.sprite.anchor               |
//   |                                   |
//   |  Unlike Base's anchor,            |
//   |    Entity.anchor is centered      |
//   |   ________________________________|_
//    \_/_________________________________/

	this.sprite.anchor.x = 0.5
	this.sprite.anchor.y = 0.5

	//  ____________________________________
	// /\                                   \
	// \_|Entity.nearestBlock               |
	//   |                                  |
	//   |  nearestBlock is a reference to  |
	//   |    the nearest treeNode Block    |
	//   |   _______________________________|_
	//    \_/_________________________________/

	var that = this
	Micro.blockTree.forAny(
		function (Node) {
				if (Node.parent == undefined) {
					return false
				}
				else {
					return true
				}
			},
		function (Node) {
				// console.log(Node.content.sprite.x)
				var vec = new PIXI.Vector2(
						new PIXI.Point(Node.content.getCentrum().x, Node.content.getCentrum().y),
						new PIXI.Point(that.sprite.x, that.sprite.y)
					)
				if (that.magnitude == undefined) {
					that.magnitude = vec.magnitude
					that.nearestBlock = Node
				}
				else {
					if (vec.magnitude < that.magnitude) {
						that.magnitude = vec.magnitude
						that.nearestBlock = Node
					}
				}
			}
		)

	console.log("test: ", this.nearestBlock.content.sprite.x)

//  ____________________________________
// /\                                    \
// \_|Entity.update                      |
//   |                                   |
//   |  The standard behavior of an      |
//   |    Entity is to be able to move   |
//   |    horizontaly and to jump.       |
//   |   ________________________________|_
//    \_/_________________________________/

	this.update.push( function (dt, entity)
	{
		// ON GOING WORK
		// Micro.Watch = dt
		// dt = Micro.Var

		// entity.sprite.position.x = Math.round(entity.sprite.position.x)
		// entity.sprite.position.y = Math.round(entity.sprite.position.y)

		if (entity.sprite.y > 10000)
			Micro.Watch += 1;

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

		var Pmagnitude = undefined
		var Cmagnitude = undefined
		if (entity.nearestBlock.parent && entity.nearestBlock.parent.content)
			Pmagnitude = new PIXI.Vector2(
				new PIXI.Point(entity.sprite.x, entity.sprite.y),
				new PIXI.Point(
					entity.nearestBlock.parent.content.getCentrum().x,
					entity.nearestBlock.parent.content.getCentrum().y
				)
			).magnitude
		else {
			Pmagnitude = undefined
		}
		if (entity.nearestBlock.child && entity.nearestBlock.child.content)
			Cmagnitude = new PIXI.Vector2(
				new PIXI.Point(entity.sprite.x, entity.sprite.y),
				new PIXI.Point(
					entity.nearestBlock.child.content.getCentrum().x,
					entity.nearestBlock.child.content.getCentrum().y
				)
			).magnitude
		else {
			Cmagnitude = undefined
		}

		if (entity.collider[0].collidesWith(entity.nearestBlock.content.collider[0])) {
			if (entity.nearestBlock.content.collider[0].collideFunction(entity))
				return ;
		}
		// console.log(Pmagnitude)
		if (Pmagnitude && entity.collider[0].collidesWith(entity.nearestBlock.parent.content.collider[0])) {
			if (entity.nearestBlock.parent.content.collider[0].collideFunction(entity))
				return ;
		}
		if (Cmagnitude && entity.collider[0].collidesWith(entity.nearestBlock.child.content.collider[0])) {
			if (entity.nearestBlock.child.content.collider[0].collideFunction(entity))
				return ;
		}

		if (Pmagnitude && Pmagnitude < entity.magnitude) {
			entity.nearestBlock = entity.nearestBlock.parent
		}
		if (Cmagnitude && Cmagnitude < entity.magnitude) {
			entity.nearestBlock = entity.nearestBlock.child
		}

		entity.magnitude = new PIXI.Vector2(
				new PIXI.Point(entity.sprite.x, entity.sprite.y),
				new PIXI.Point(
					entity.nearestBlock.content.getCentrum().x,
					entity.nearestBlock.content.getCentrum().y
				)
			).magnitude


		// console.log(Pmagnitude, entity.magnitude, Cmagnitude)


		// for (var i = 0; i < Micro.blockList.length; i++) {
		// 	if (entity.collider[0].collidesWith(Micro.blockList[i].collider[0])) {
		// 		if (Micro.blockList[i].collider[0].collideFunction(entity))
		// 			return ;
		// 	}
		// };
		//
		// for (var i = 0; i < Micro.animationList.length; i++) {
		// 	if (entity.collider[0].collidesWith(Micro.animationList[i].collider[0])) {
		// 		if (Micro.animationList[i].collider[0].collideFunction(entity))
		// 			return ;
		// 	}
		// };

		entity.moveBy(entity.velocity.x, entity.velocity.y)

		entity.jumpBool = false
		entity.addVelocity(0, dt)

	})

	//  ______________________________________
	// /\                                     \
	// \_|Entity.collider                     |
	//   |                                    |
	//   |  The standard behavior of a Entity |
	//   |    collider is to stick to the     |
	//   |    Entity has a box. Crappy stuff. |
	//   |   _________________________________|_
	//    \_/___________________________________/

	var Collider = new Micro.Collider({
		x : this.sprite.x - this.sprite.width / 2,
		y : this.sprite.y - this.sprite.height / 2,
		width : this.sprite.width / 2,
		height : this.sprite.height / 2
	})

	Collider.update = function (entity) {

		if ('orientation' in entity) {

				if (entity.orientation == 'right') {
					this.shape.width = entity.sprite.width
					this.shape.x = entity.sprite.x - entity.sprite.width / 2
				}
				else if (entity.orientation == 'left') {
					this.shape.width = -entity.sprite.width
					this.shape.x = entity.sprite.x + entity.sprite.width / 2
				}
			}
			else {
				this.shape.width = entity.sprite.width
				this.shape.x = entity.sprite.x - entity.sprite.width / 2
			}

		this.shape.height = entity.sprite.height

		this.shape.y = entity.sprite.y - entity.sprite.height / 2

	}

	Collider.collideFunction = function (collider) {
		console.log('collideFunction of ', this)
	}

	this.collider.push( Collider )

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

//  ____________________________________
// /\                                    \
// \_|Entity.velocity                    |
//   |                                   |
//   |  The velocity describes to force  |
//   |    applied to an Entity every     |
//   |    call to update                 |
//   |  addVelocity is supplied for      |
//   |    each Entity                    |
//   |   ________________________________|_
//    \_/_________________________________/

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

	this.moveTo = function (x, y) {
		this.sprite.x = x
		this.sprite.y = y

		var that = this
		Micro.blockTree.forAny(
		function (Node) {
				if (Node.parent == undefined) {
					return false
				}
				else {
					return true
				}
			},
		function (Node) {
				var vec = new PIXI.Vector2(
						new PIXI.Point(Node.content.getCentrum().x, Node.content.getCentrum().y),
						new PIXI.Point(that.sprite.x, that.sprite.y)
					)
				if (that.magnitude == undefined) {
					that.magnitude = vec.magnitude
					that.nearestBlock = Node
				}
				else {
					if (vec.magnitude < that.magnitude) {
						that.magnitude = vec.magnitude
						that.nearestBlock = Node
					}
				}
			}
		)
		return this;
	}

//  ____________________________________
// /\                                   \
// \_|An Entity is added to             |
//   |  Micro.entityList upon creation  |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.entityList.push(this)
}
