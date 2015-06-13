'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

$(function()
{
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
				t.push (

					(function (_name) {
					return function () {
						var re = /\/?(\w+)\./;
						$.getScript(_name).done(function () {
							Micro.Asset.load(re.exec(_name)[1])
						})
					}
					})(modname)

				)
			}
			if (index + 1 >= json.length)
				t.push ( function () {
					Micro.launch()
				} )
			else
				t.push ( function () {
					GetDepend(json, index + 1)
				} )

			$.getScript(name).done(t);
		}

	}

	$.ajaxSetup({
		async: true,
		cache: true
	});
	$.getJSON('depend.json').done(function (json) {GetDepend(json, 0)})
});
