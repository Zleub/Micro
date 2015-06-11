'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

var loader = PIXI.loader

loader.add('dwarves', 'assets/dwarves.json')
loader.add('dwarves2', 'assets/dwarves.json')

document.body.onload = function () {
	console.log('caca')
	loader.on('load', function (loader, res) {
		Micro.Asset.load(res)
	})
	loader.once('complete', Micro.launch)
	loader.load()
}
