//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Base.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-06 22:51:08
// :ddddddddddhyyddddddddddd: Modified: 2015-07-08 19:54:44
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

Micro.Base = function (texture) {

//  ____________________________________
// /\                                   \
// \_|Base.update && Base.collider      |
//   |                                  |
//   |  Base implement update and       |
//   |    collider as two array         |
//   |    processed by the engine       |
//   |  update comes with a standard    |
//   |    collider update loop          |
//   |   _______________________________|_
//    \_/_________________________________/

	this.update = [
		function (dt, entity) {
			for (var i = 0; i < entity.collider.length; i++) {
				entity.collider[i].update(entity.sprite)
			}
		}]
	this.collider = []

//  ____________________________________
// /\                                   \
// \_|Base.sprite refer to PIXI.Sprite  |
//   |   _______________________________|_
//    \_/_________________________________/

	this.sprite = new PIXI.Sprite(texture)

//  ____________________________________
// /\                                   \
// \_|Base.moveTo && Base.moveBy        |
//   |                                  |
//   |  moveTo is an absolute move in   |
//   |    orthognal space               |
//   |  moveBy is an relative move in   |
//   |    orthognal space. It take      |
//   |    Micro.dt into account         |
//   |   _______________________________|_
//    \_/_________________________________/

	this.moveTo = function (x, y) {
		this.sprite.x = x
		this.sprite.y = y
		// for (var i = 0; i < this.collider.length; i++) {
		// 	this.collider[i].shape.x = x
		// 	this.collider[i].shape.y = y
		// };
		return this
	}
	this.moveBy = function (x, y) {
		this.sprite.x += x * Micro.dt
		this.sprite.y += y * Micro.dt
		for (var i = 0; i < this.collider.length; i++) {
			this.collider[i].shape.x += x * Micro.dt
			this.collider[i].shape.y += y * Micro.dt
		};
		return this
	}

//  ____________________________________
// /\                                   \
// \_|Base.addTo                        |
//   |                                  |
//   |  addTo is a layer management     |
//   |    commodity                     |
//   |   _______________________________|_
//    \_/_________________________________/

	this.addTo = function (layer) {
		layer.addChild(this.sprite)
		return this
	}

//  ____________________________________
// /\                                   \
// \_|Base.scale                        |
//   |                                  |
//   |  scale is a JS traditional       |
//   |    setter, must be feed with     |
//   |    PIXI.scale object             |
//   |   _______________________________|_
//    \_/_________________________________/

	Object.defineProperty(this, "scale", { set: function (scale) {
		if ('x' in scale && 'y' in scale) {
			this.sprite.scale.x = scale.x
			this.sprite.scale.y = scale.y
		}
	}})

}

