//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Block.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-07 08:48:45
// :ddddddddddhyyddddddddddd: Modified: 2015-08-21 03:03:35
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

Micro.blockList = []
Micro.blockTree = new PIXI.TreeNode
Micro.Block = function (texture) {

//  ____________________________________
// /\                                   \
// \_|An Block is build upon Base       |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.Base.call(this, texture)

//  ____________________________________
// /\                                   \
// \_|Block.collider                    |
//   |                                  |
//   |  The default collider of a Block |
//   |    is the sprite-sized box.      |
//   |                                  |
//   |  The standard behavior is a      |
//   |    snap of an entity passing by  |
//   |    to the sprite edge.           |
//   |   _______________________________|_
//    \_/_________________________________/

	var Collider = new Micro.Collider({
		x : this.sprite.x - this.sprite.width / 2,
		y : this.sprite.y - this.sprite.height / 2,
		width : this.sprite.width,
		height : this.sprite.height
	})

	Collider.update = function (entity) {
			this.shape.x = entity.sprite.x
			this.shape.y = entity.sprite.y - Micro.dt * 2
			this.shape.width = entity.sprite.width
			this.shape.height = Micro.dt * 8
	}

	Collider.collideFunction = function (entity) {

		if ('sprite' in entity) {

			if (entity.sprite.x > this.shape.x && entity.sprite.x < this.shape.x + this.shape.width) {

				if (entity.sprite.y == this.shape.y + this.shape.height / 4 - entity.sprite.height / 2) {
					entity.moveBy(entity.velocity.x, 0)
					if (entity.velocity.y < 0) {
						entity.moveBy(0, entity.velocity.y)
					}
					entity.jumpBool = true
					entity.jumpDelay = Math.PI
					entity.velocity.y = 0
					return true
				}

				if (entity.sprite.y + entity.sprite.height / 2 > this.shape.y && entity.sprite.y + entity.sprite.height / 2 < this.shape.y + this.shape.height)
				{
					entity.moveBy(entity.velocity.x, 0)
					entity.sprite.y = this.shape.y + this.shape.height / 4 - entity.sprite.height / 2
					entity.velocity.y = 0
					return true
				}

			}
		}
		return false
	}

	this.collider.push(Collider)

	//  ____________________________________
	// /\                                   \
	// \_|Block.getCentrum                  |
	//   |                                  |
	//   |  A function to get the center    |
	//   |    of a Block                    |
	//   |   _______________________________|_
	//    \_/_________________________________/

	this.getCentrum = function () {
		return new PIXI.Point(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2)
	}

	this.Node = Micro.blockTree.addChild(this)

	Micro.blockList.push(this)
}
