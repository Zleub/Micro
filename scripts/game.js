'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

$(function()
{
	function GetDepend(json)
	{
		for (var i = 0; i < json.length; i++)
		{
			var obj = json[i]
			for (var name in obj)
			{
				var t = []
				var array = obj[name]
				for (var mod in array)
				{
					var modname = array[mod]
					t.push (

						(function (_name) {
						return function () {
							console.log(_name)
							$.getScript(_name)
						}
					})(modname)

					)
				}
				console.log(name)
				$.getScript(name).done(t);
			}
			// if (json[i].length != 1)
			// 	console.log("Depend drop : ", json[i])
		};
	}

	$.ajaxSetup({
		async: true,
		cache: true
	});
	$.getJSON('test.json' ).done(GetDepend)
});

