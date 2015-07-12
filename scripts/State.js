//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  State.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-11 18:23:21
// :ddddddddddhyyddddddddddd: Modified: 2015-07-12 17:59:55
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

var Micro = window['Micro'] || {}

//  ____________________________________
// /\                                   \
// \_|Micro.State                       |
//   |                                  |
//   |  The State is the standard way   |
//   |    to set the engine on a        |
//   |    particular update function    |
//   |   _______________________________|_
//    \_/_________________________________/

Micro.State = {}

Micro.State.enum = {
	'IDLE' : 0,
	'LOADING' : 1,
	'GAME' : 2,
	'MENU' : 3
}

//  ____________________________________
// /\                                   \
// \_|State.current                     |
//   |                                  |
//   |  current is the current state    |
//   |    used by the engine.           |
//   |   _______________________________|_
//    \_/_________________________________/

Micro.State.current = 'LOADING'

//  _________________________________________
// /\                                        \
// \_|State.map                              |
//   |                                       |
//   |  State.map is an associative          |
//   |    object of [state] : function (dt)  |
//   |   ____________________________________|_
//    \_/______________________________________/

Micro.State.map = {
	'LOADING' : function (dt) {console.log('test')},
	'GAME' : function (dt) {
		for (var i = 0; i < Micro.baseList.length; i++) {
			for (var j = 0; j < Micro.baseList[i].update.length; j++) {
				Micro.baseList[i].update[j](dt, Micro.baseList[i])
			}
		};

		var testx = Micro.width / 2 - Micro.entityList[0].sprite.position.x
		var testy = Micro.height / 2 - Micro.entityList[0].sprite.position.y

		Micro.Layer.list.foreground.position.x = testx
		Micro.Layer.list.foreground.position.y = testy
		Micro.Layer.list.debug.position.x = testx
		Micro.Layer.list.debug.position.y = testy

		Micro.Layer.list.background.position.x = testx / 8 % 256
		Micro.Layer.list.background.position.y = testy / 8 % 256
		// Micro.Layer.list.debug.position.x = testx
		// Micro.Layer.list.background.position.y = testy
	},
	MENU : function (dt) {}
}
