/*
* @Author: adebray
* @Date:   2015-06-07 16:31:23
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-05 17:27:06
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Sprites' in Micro))
	Micro.Sprites = {};
if (!('Asset' in Micro))
	Micro.Asset = {};

(function () {

var Asset = Micro.Asset

PIXI.loader.on('load', function (loader, res)
{
	var test = new PIXI.BaseTexture(res.data)

	window['_' + res.name].base = test

	var sprites = Asset.makeArray(test, res.name)

	for (var i = sprites.length - 1; i >= 0; i--) {
		if (window['_' + res.name].properties.scale)
		{
			sprites[i].scale.x = window['_' + res.name].properties.scale.x
			sprites[i].scale.y = window['_' + res.name].properties.scale.y
		}
	};

	Asset[res.name] = window['_' + res.name]
	window['_' + res.name] = undefined
	Micro.Sprites[res.name] = sprites
});

Asset.makeArray = function (baseTexture, id)
{
	var sprites = []

	for (var i = 0; i < baseTexture.height ; i = i + window['_' + id].height) {
		for (var j = 0; j < baseTexture.width ; j = j + window['_' + id].width) {
			sprites.push(
				new PIXI.Sprite(
					new PIXI.Texture(
						baseTexture,
						new PIXI.Rectangle(
							j, i,
							window['_' + id].width, window['_' + id].height
						)
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
	loader.add(id, window['_' + id].image);

}

})();
