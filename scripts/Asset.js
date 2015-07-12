//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Asset.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-11 18:24:27
// :ddddddddddhyyddddddddddd: Modified: 2015-07-11 19:16:24
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}
if (!('Sprites' in Micro))
	Micro.Sprites = {};

//  ____________________________________
// /\                                   \
// \_|Micro.Asset                       |
//   |                                  |
//   |  Micro.Asset is the loader for   |
//   |    assets as they are describe   |
//   |    in depend.json                |
//   |   _______________________________|_
//    \_/_________________________________/

if (!('Asset' in Micro))
	Micro.Asset = {};

//  _____________________________________
// /\                                    \
// \_|PIXI.loader.on                     |
//   |                                   |
//   |  This is standard use of the      |
//   |    PIXI.loader which offers a     |
//   |    clean callback after each load |
//   |   ________________________________|_
//    \_/__________________________________/

PIXI.loader.on('load', function (loader, res)
{
	var test = new PIXI.BaseTexture(res.data)

	window['_' + res.name].base = test

	var sprites = Micro.Asset.makeArray(test, res.name)

	for (var i = sprites.length - 1; i >= 0; i--) {
		if (window['_' + res.name].properties.scale)
		{
			sprites[i].scale.x = window['_' + res.name].properties.scale.x
			sprites[i].scale.y = window['_' + res.name].properties.scale.y
		}
	};

	Micro.Asset[res.name] = window['_' + res.name]
	window['_' + res.name] = undefined
	Micro.Sprites[res.name] = sprites
});

Micro.Asset.makeArray = function (baseTexture, id)
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

//  ____________________________________
// /\                                   \
// \_|Asset.load                        |
//   |                                  |
//   |  Asset.load add to particular    |
//   |    ressource to the PIXI.loader  |
//   |   _______________________________|_
//    \_/_________________________________/

Micro.Asset.load = function (id, callback)
{
	var status = this.status
	var loader = PIXI.loader
	loader.add(id, window['_' + id].image);

}

