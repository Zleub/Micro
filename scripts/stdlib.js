//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  stdlib.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-11 03:21:37
// :ddddddddddhyyddddddddddd: Modified: 2015-08-12 01:31:11
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

//  ____________________________________
// /\                                   \
// \_|PIXI.Vector2                      |
//   |                                  |
//   |  PIXI.Vector2 is a custom        |
//   |    Vector2 implementation for    |
//   |    distance rationalisation      |
//   |   _______________________________|_
//    \_/_________________________________/

PIXI.Vector2 = function (pt1, pt2) {
	if (!(pt1 instanceof PIXI.Point) || !(pt1 instanceof PIXI.Point))
		console.log('Malformed PIXI.Vector2')

	this.x = pt1.x - pt2.x
	this.y = pt2.y - pt2.y
	this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y)
}

PIXI.TreeNode = function (content, parent) {
	this.content = content
	this.parent = parent

	this.addChild = function (newchild) {
		if ('child' in this) {
			return this.child.addChild(newchild)
		} else {
			this.child = new PIXI.TreeNode(newchild)
			this.child.parent = this
			return this.child
		}
	}

	this.forAny = function (predicate, f) {
		if (predicate(this))
			f(this)
		if (this.child)
			this.child.forAny(predicate, f)
	}

	this.getLast = function () {
		if (!this.child)
			return this
		else
			return this.child.getLast()
	}
}

Micro.Wrapper = {}

Micro.creationWrapper = function ( name, f) {
	Micro.Wrapper[name] = f
}
