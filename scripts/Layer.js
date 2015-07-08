//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Layer.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-07 05:35:55
// :ddddddddddhyyddddddddddd: Modified: 2015-07-07 22:55:50
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}
if (!('Layer' in Micro))
	Micro.Layer = {};

(function () {

//  _______________________________________
// /\                                      \
// \_|Entity.Layer                         |
//   |                                     |
//   |  For now, the Layer namespace       |
//   |    is organized in 4 PIXI.Container |
//   |    in order :                       |
//   |      Layer.list.background          |
//   |      Layer.list.foreground          |
//   |      Layer.list.ui                  |
//   |      Layer.list.debug               |
//   |   __________________________________|_
//    \_/___________________________________/


var Layer = Micro.Layer
	Layer.list = {}
	Layer.list.debug = new PIXI.Container()
	Layer.list.debug.addChild(
		new PIXI.Graphics().lineStyle(2, 0xacacac)
	)
	Layer.list.debug.reset = function () {
		Layer.list.debug.children[0].clear()
		Layer.list.debug.children[0].lineStyle(2, 0xacacac)
	}
	Layer.list.background = new PIXI.Container()
	Layer.list.foreground = new PIXI.Container()
	Layer.list.ui = new PIXI.Container()

var PauseMenu = new PIXI.Container()
	PauseMenu.visible = false

Layer.makeBindingList = function () {
	Layer.BindingList = new PIXI.Text(JSON.stringify(Micro.keyEnum, null, 2), {font : '21px courier', fill : 0xd8d8d8})
	PauseMenu.addChild(Layer.BindingList)
}

Layer.actualizeBindingList = function () {
	PauseMenu.removeChild(Layer.BindingList)
	Layer.makeBindingList()
}

Layer.list.ui.addChild(PauseMenu)

Micro.stage.addChild(Layer.list.background)
Micro.stage.addChild(Layer.list.foreground)
Micro.stage.addChild(Layer.list.ui)
Micro.stage.addChild(Layer.list.debug)

})()
