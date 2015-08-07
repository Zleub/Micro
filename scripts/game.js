//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  game.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-05 18:13:08
// :ddddddddddhyyddddddddddd: Modified: 2015-08-07 08:54:31
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

var Micro = window['Micro'] || {}

$(function()
{
	function MakeDepend(_name) {

		return function () {
			var re = /(\w+)\/?(\w+)\./;
			if (re.exec(_name)[1] == 'assets')
				$.getScript(_name).done(function () {
					Micro.Asset.load(re.exec(_name)[2])
				})
			else
				$.getScript(_name).done(function () {})
		}
	}

	function GetDepend(json, index)
	{
		if (index >= json.length)
			return

		var obj = json[index]
		for (var name in obj)
		{
			var t = []

			var array = obj[name]
			for (var mod in array)
			{
				var modname = array[mod]
				t.push ( MakeDepend(modname) )
			}

			if (index + 1 >= json.length)
				t.push ( function () {
					Micro.launch()
				} )
			else
				t.push ( function () {
					GetDepend(json, index + 1)
				} )

			if (name.split(".")[1] == 'json')
				$.getJSON(name).done(function (data) {Micro[name.split(".")[0]] = data}, t);
			else
				$.getScript(name).done(t);
		}

	}

	$.ajaxSetup({
		async: true,
		cache: true
	});

	$.getJSON('depend.json').done(function (json) {GetDepend(json, 0)})
});
