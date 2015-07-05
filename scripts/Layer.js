/*
* @Author: adebray
* @Date:   2015-06-25 17:12:34
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-05 16:03:51
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Layer' in Micro))
	Micro.Layer = {};

(function () {

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
