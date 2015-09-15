//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Populator.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-06 05:36:58
// :ddddddddddhyyddddddddddd: Modified: 2015-08-12 00:57:11
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

Micro.Populator = function (World) {
	console.log('new Populator')

	this.Seeder = new Micro.Seeder()

	this.rule = {
		seedControl : null,
		contentControl : null,
		creationControl : null,
		completionControl : null
	}

	this.call = function () {

		this.Seeder.call(this.Seeder)

		for(var k in this.rule)
		{
			if (typeof(this.rule[k]) != 'function')
				console.log('Plz, behave using a Populator')

		}

		for (var i = 0; i < this.Seeder.export.length; i++) {
			this.rule.seedControl(this, this.Seeder.export[i])
			var element = this.rule.contentControl(this, this.Seeder.export[i])
			this.rule.creationControl(this, element)
		};

		this.rule.completionControl(this)

	}
}
