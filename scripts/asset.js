/*
* @Author: adebray
* @Date:   2015-06-07 16:31:23
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-25 17:53:30
*/

'use strict';

var Micro = window['Micro'] || {}
if (!('Sprites' in Micro))
	Micro.Sprites = {};
if (!('Asset' in Micro))
	Micro.Asset = {};

(function () {

var Asset = Micro.Asset

Asset.makeArray = function (baseTexture, id)
{
	var base = baseTexture
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

PIXI.loader.on('load', function (loader, res)
{
	var test = new PIXI.BaseTexture(res.data)

	window['_' + res.name].base = test

	var sprites = Asset.makeArray(test, res.name)

	for (var i = sprites.length - 1; i >= 0; i--) {
		if (window['_' + res.name].properties.scale)
		{
			console.log("test", res.name)
			sprites[i].scale.x = window['_' + res.name].properties.scale.x
			sprites[i].scale.y = window['_' + res.name].properties.scale.y
		}
	};

	Asset[res.name] = window['_' + res.name]
	window['_' + res.name] = undefined
	Micro.Sprites[res.name] = sprites
	// Micro.stage.addChild(Micro.Sprites[res.name][1]);
});


Asset.load = function (id, callback)
{
	var status = this.status
	var loader = PIXI.loader
	loader.add(id, window['_' + id].image);

}

Asset.new = function (sprite) {
	var tmp = new PIXI.Sprite(sprite.generateTexture(Micro.renderer))
	tmp.scale.x = sprite.scale.x
	tmp.scale.y = sprite.scale.y
	Micro.stage.addChild(tmp)
	return tmp
}

Asset.newAt = function (sprite, x, y) {
	var tmp = new PIXI.Sprite(sprite.generateTexture(Micro.renderer))
	tmp.scale.x = sprite.scale.x
	tmp.scale.y = sprite.scale.y
	tmp.x = x
	tmp.y = y
	Micro.stage.addChild(tmp)
	return tmp
}

})();
