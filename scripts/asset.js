/*
* @Author: adebray
* @Date:   2015-06-07 16:31:23
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-11 02:01:58
*/

'use strict';

console.log('begin')

var Micro = window['Micro'] || {}
if (!('Sprites' in Micro))
	Micro.Sprites = {};
if (!('Asset' in Micro))
	Micro.Asset = {};

(function () {

var Asset = Micro.Asset

Asset.new = function (jsfile)
{
	require(jsfile, 'assets/' + jsfile + '.js', Asset.onLoad)
}

Asset.makeArray = function (res, id)
{
	var base = res[id].texture.baseTexture
	var sprites = []

	for (var i = 0; i < base.height; i = i + window['_' + id].height) {
		for (var j = 0; j < base.width; j = j + window['_' + id].width) {
			sprites.push( new PIXI.Sprite(
				new PIXI.Texture(
					base,
					new PIXI.Rectangle(j, i, window['_' + id].width, window['_' + id].height)
					)
				)
			)
		}
	}
	return(sprites)
}

Asset.load = function (id, callback)
{
	var status = this.status
	var loader = PIXI.loader
	console.log("Asset.onLoad", this)
	loader.add(id, window['_' + id].image);
	loader.once('complete', function (loader, res)
	{
		console.log("Check this up", loader, res)
		window['_' + id].base = res[id].texture.baseTexture

		var sprites = Asset.makeArray(res, id)

		for (var i = sprites.length - 1; i >= 0; i--) {
			if (window['_' + id].properties.scale)
			{
				sprites[i].scale.x = window['_' + id].properties.scale.x
				sprites[i].scale.y = window['_' + id].properties.scale.y
			}
		};

		Asset[id] = window['_' + id]
		window['_' + id] = undefined
		Micro.Sprites[id] = sprites
		Micro.stage.addChild(Micro.Sprites[id][1]);
		if (callback)
			callback()
	});
	loader.load();

}

console.log('END')

})();
