'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

$(function()
{
	function GetDepend(json)
	{
		console.log(json)
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
							var re = /\/?(\w+)\./;
							$.getScript(_name).done(function () {
								Micro.Asset.load(re.exec(_name)[1])
							})
						}
						})(modname)

					)
				}
				console.log(name)
				// if (i == json.length - 1)
				// 	t.push ( animate )

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
	$.getJSON('test.json').done(GetDepend)
});

// document.body.onload = function () {
// 	console.log('caca')
// 	loader.on('load', function (loader, res) {
// 		Micro.Asset.load(res)
// 	})
// 	loader.once('complete', Micro.launch)
// 	loader.load()
// }
