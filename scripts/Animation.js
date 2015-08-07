//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Animation.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-07 08:49:34
// :ddddddddddhyyddddddddddd: Modified: 2015-08-07 08:53:40
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

Micro.animationList = []

Micro.Animation = function (spriteArray) {
//  ____________________________________
// /\                                   \
// \_|An Animation is build upon Base   |
//   |   _______________________________|_
//    \_/_________________________________/

	Micro.Base.call(this, spriteArray[0]._texture)

//  ____________________________________
// /\                                   \
// \_|Animation Config                  |
//   |                                  |
//   |  An animation's config is build  |
//   |    upon a few variables :        |
//   |    - cadence : the rythm in sec  |
//   |      for each image.             |
//   |   _______________________________|_
//    \_/_________________________________/

	this.cadence = 0.2
	this.delay = 0
	this.index = 0

//  ____________________________________
// /\                                   \
// \_|Animation.update                  |
//   |                                  |
//   |  The default behavior of an      |
//   |    Animation is the iterate over |
//   |    the sprite array sent at      |
//   |    construction.                 |
//   |   _______________________________|_
//    \_/_________________________________/

	this.update.push(function (dt, animation) {
		if (animation.delay < 0)
		{
			animation.index += 1
			if (animation.index > spriteArray.length - 1)
				animation.index = 1
			animation.sprite._texture = spriteArray[animation.index]._texture
			animation.delay = animation.cadence
		}
		else {
			animation.delay -= dt / 1000
		}
	})



	Micro.animationList.push(this)
}
