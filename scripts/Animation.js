'use strict';

var Micro = window['Micro'] || {}

Micro.animationList = []

Micro.Animation = function (spriteArray) {
	Micro.Base.call(this, spriteArray[0]._texture)

	this.cadence = 0.2
	this.delay = 0
	this.index = 0

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
