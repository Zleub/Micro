//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  stdlib.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-11 03:21:37
// :ddddddddddhyyddddddddddd: Modified: 2015-08-07 08:54:56
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

var Micro = window['Micro'] || {}

Math.clamp = function (a,b,c) {
	return Math.max( b, Math.min(c,a) )
}

Math.getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}
