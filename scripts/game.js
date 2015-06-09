'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

var loader = PIXI.loader
loader.after( function (resource, next) {
	if (!resource.data) {
		return next();
	}
	else if (resource.url.split('.').pop() == "js")
	{
		console.log("I got a new distant script:", resource.url)
		var elem = document.createElement('script');
		elem.type = 'text/javascript';
		elem.text = resource.data;

		document.body.appendChild(elem);
		next()
	}
	else
	{
		next()
	}
})

function test1() {console.log("test function 1")}
function test2() {console.log("test function 2")}

loader.add('Engine', 'scripts/engine.js')
loader.add('Entity', 'scripts/entity.js')
loader.add('Environment', 'scripts/environment.js')
loader.add('Asset', 'scripts/asset.js')

loader.once('complete', function (_1, _2) {
	console.log('once eedn')

	loader.on('load', function (loader, resource) {
		console.log(window['_dwarves'])
		console.log('on complete', loader, resource)
		Micro.Asset.onLoad(resource.name)
	})

	// loader.once('complete', function () {
	// 	console.log('once complete')
	// 	console.log(Micro.Sprites['dwarves'])
	// 	console.log("animate")
	// })

	loader.add('dwarves', 'assets/dwarves.js')
	loader.add('PrtWeed', 'assets/PrtWeed.js')
	loader.load()

	// Micro.Asset.new('dwarves')
	// Micro.Asset.new('PrtWeed')
	// console.log(Micro.Sprites['dwarves'])
	// Micro.stage.addChild(Micro.Sprites['dwarves'][1])

})
loader.load()
