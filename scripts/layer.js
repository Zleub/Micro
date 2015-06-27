/*
* @Author: adebray
* @Date:   2015-06-25 17:12:34
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 16:28:15
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Layer' in Micro))
	Micro.Layer = {};

(function () {

var Layer = Micro.Layer
	Layer.list = {}
	Layer.list.debug = new PIXI.Container()
	Layer.list.debug.addChild(new PIXI.Graphics().lineStyle(2, 0xacacac))
	Layer.list.background = new PIXI.Container()
	Layer.list.foreground = new PIXI.Container()
	Layer.list.ui = new PIXI.Container()

Micro.stage.addChild(Layer.list.background)
Micro.stage.addChild(Layer.list.foreground)
Micro.stage.addChild(Layer.list.ui)
Micro.stage.addChild(Layer.list.debug)

})()
