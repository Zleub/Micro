//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Entity.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-07 20:32:57
// :ddddddddddhyyddddddddddd: Modified: 2015-07-09 20:34:47
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
// /\                                    \
// \_|Entity.update                      |
//   |                                   |
//   |  Since Base's update is an array  |
//   |    one should push an             |
//   |    Entity's update in order to    |
//   |    get it processed               |
//   |   ________________________________|_
//    \_/_________________________________/

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

		for (var i = 0; i < Micro.blockList.length; i++) {
			if (entity.collider[0].collidesWith(Micro.blockList[i].collider[0])) {
				if (Micro.blockList[i].collider[0].collideFunction(entity))
					return ;
			}
		};

		entity.moveBy(entity.velocity.x, entity.velocity.y)

		entity.jumpBool = false
		entity.addVelocity(0, dt)

	})

	//  ______________________________________
	// /\                                     \
	// \_|Entity.collider                     |
	//   |                                    |
	//   |  Since Base's collider is an array |
	//   |    one should push an              |
	//   |    Entity's collider in order to   |
	//   |    get it processed                |
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

//  ____________________________________
// /\                                   \
// \_|An Entity is added to             |
//   |  Micro.entityList upon creation  |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.entityList.push(this)
}


