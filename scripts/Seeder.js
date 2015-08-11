//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Seeder.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-06 05:32:45
// :ddddddddddhyyddddddddddd: Modified: 2015-08-11 15:31:57
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict' ;

var Micro = window['Micro'] || {}

Micro.Seeder = function () {
	this.rule = {
		quantity : 0,
		seed : null
	}

	this.call = function (Seeder) {
		Seeder.export = []

		for (var i = 0; i < this.rule.quantity; i++) {
			Seeder.export[i] = this.rule.seed()
		};
	}
}
