//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Base.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-06 22:51:08
// :ddddddddddhyyddddddddddd: Modified: 2015-07-07 04:58:23
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
//   |   _______________________________|_
//    \_/_________________________________/

	this.update = []
	this.collider = []

//  ____________________________________
// /\                                   \
// \_|Base.sprite refer to PIXI.Sprite  |
//   |   _______________________________|_
//    \_/_________________________________/

	this.sprite = new PIXI.Sprite(texture)

//  ____________________________________
// /\                                   \
// \_|Base.moveTo && Base.addTo         |
//   |                                  |
//   |  moveTo is sprite-related        |
//   |  addTo is layer-related          |
//   |   _______________________________|_
//    \_/_________________________________/

	this.moveTo = function (x, y) {
		this.sprite.x = x
		this.sprite.y = y
		return this
	}
	this.addTo = function (layer) {
		layer.addChild(this.sprite)
		return this
	}
}

