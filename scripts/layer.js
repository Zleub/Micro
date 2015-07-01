/*
* @Author: adebray
* @Date:   2015-06-25 17:12:34
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-01 18:14:14
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
	Layer.list.ui.addChild(PauseMenu)

Layer.layoutUI = []
Layer.makeUI = function () {
	Layer.layout = Micro.Asset.newOn(Micro.Sprites['layout'][0], PauseMenu)
		Layer.layout.scale.x = 0.8
		Layer.layout.scale.y = 0.8
		Layer.layout.x = Micro.width / 2 - Layer.layout.width / 2
		Layer.layout.y = Micro.height / 2 - Layer.layout.height / 2
	Layer.layoutUI[37] = Micro.Asset.newOn(Micro.Sprites['usebutton'][0], PauseMenu)
		Layer.layoutUI[37].scale.x = 0.7
		Layer.layoutUI[37].scale.y = 0.7
		Layer.layoutUI[37].x = 597
		Layer.layoutUI[37].y = 397
	Layer.layoutUI[39] = Micro.Asset.newOn(Micro.Sprites['usebutton'][0], PauseMenu)
		Layer.layoutUI[39].scale.x = 0.7
		Layer.layoutUI[39].scale.y = 0.7
		Layer.layoutUI[39].x = 660
		Layer.layoutUI[39].y = 397

}

Micro.stage.addChild(Layer.list.background)
Micro.stage.addChild(Layer.list.foreground)
Micro.stage.addChild(Layer.list.ui)
Micro.stage.addChild(Layer.list.debug)

})()
