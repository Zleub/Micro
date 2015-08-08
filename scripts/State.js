//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  State.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-06 05:30:44
// :ddddddddddhyyddddddddddd: Modified: 2015-08-08 07:38:55
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

//  _________________________________________
// /\                                        \
// \_|State.map                              |
//   |                                       |
//   |  State.map is an associative          |
//   |    object of [state] : function (dt)  |
//   |   ____________________________________|_
//    \_/______________________________________/

Micro.State.map = {
	'LOADING' : {

		'keydown' : function (code) {},
		'keyup' : function (code) {},


		'start' : function (dt) {console.log('LOADING start')},
		'update' : function (dt) {console.log('LOADING update')},
		'end' : function (dt) {console.log('LOADING end')}

	},
	'GAME' : {

		'keydown' : function (code) {
			if (code == Micro.keyEnum.escape)
				Micro.State.current = "MENU"
		},
		'keyup' : function (code) {},

		'start' : function () { console.log('GAME start') },

		'update' : function (dt) {

			for (var i = 0; i < Micro.baseList.length; i++) {
				for (var j = 0; j < Micro.baseList[i].update.length; j++) {
					Micro.baseList[i].update[j](dt, Micro.baseList[i])
		 		}
			}

			var testx = Math.round(Micro.width / 2 - Micro.entityList[0].sprite.position.x * Micro.Layer.list.foreground.scale.x)
			var testy = Math.round(Micro.height / 2 - Micro.entityList[0].sprite.position.y * Micro.Layer.list.foreground.scale.y)

			Micro.Layer.list.foreground.position.x = testx
			Micro.Layer.list.foreground.position.y = testy
			Micro.Layer.list.debug.position.x = testx
			Micro.Layer.list.debug.position.y = testy

			Micro.Layer.list.background.position.x = testx / 8 % 256
			Micro.Layer.list.background.position.y = testy / 8 % 256
			// Micro.Layer.list.debug.position.x = testx
			// Micro.Layer.list.background.position.y = testy

		},

		'end' : function () { console.log('GAME end') },
	},
	'MENU' : {

		'keydown' : function (code) {
			console.log('menu keydown', code)
			if (code == Micro.keyEnum.escape)
				Micro.State.current = "GAME"

			if (code == Micro.keyEnum.up || code == Micro.keyEnum.down)
			{
				if (Micro.B.sprite.y == Micro.height / 2 + 100)
					Micro.B.sprite.y = Micro.height / 2 - 100
				else
					Micro.B.sprite.y = Micro.height / 2 + 100
			}
		},
		'keyup' : function (code) {},


		'start' : function (dt) {
			console.log('MENU start')

			// Micro.Layer.actualizeBindingList()
			// Micro.Layer.list.ui.children[0].visible = true

		},
		'update' : function (dt) {


		},
		'end' : function (dt) {
			console.log('MENU end')

			// Micro.Layer.list.ui.children[0].visible = false

		}

	}
}

//  ____________________________________
// /\                                   \
// \_|State.current                     |
//   |                                  |
//   |  current is the current state    |
//   |    used by the engine.           |
//   |   _______________________________|_
//    \_/_________________________________/

Micro.State.state = 'LOADING'

Object.defineProperty(Micro.State, "current", {
	set : function (state) {
		this.map[this.state].end()
		this.state = state
		this.map[this.state].start()
	},
	get : function () {
		return this.state
	}
})

