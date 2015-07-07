//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Collider.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-07 20:30:05
// :ddddddddddhyyddddddddddd: Modified: 2015-07-07 20:33:28
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

Micro.Collider = function (shape) {

	//  ________________________________________
	// /\                                       \
	// \_|A Collider constructor only support   |
	//   |    math shapes :                     |
	//   |                                      |
	//   |    Point : {x, y}                    |
	//   |    Circle : {x, y, radius}           |
	//   |    Rectangle : {x, y, width, height} |
	//   |   ___________________________________|_
	//    \_/_____________________________________/

	if (typeof shape == 'object' && 'x' in shape && 'y' in shape) {
		if ('radius' in shape) {
			this.shape = new PIXI.Circle(shape.x, shape.y, shape.radius)
		}
		else if ('width' in shape && 'height' in shape) {
			this.shape = new PIXI.Rectangle(shape.x, shape.y, shape.width, shape.height)
		}
		else {
			this.shape = new PIXI.Point(shape.x, shape.y)
		}

		//  ________________________________________
		// /\                                       \
		// \_|Collider.collidesWith                 |
		//   |                                      |
		//   |    collidesWith is used for by a     |
		//   |    Collider to detect collision with |
		//   |    another Collider.shape            |
		//   |   ___________________________________|_
		//    \_/_____________________________________/

		this.collidesWith = function (Collider) {
			if (this != Collider) {
				if (this.shape instanceof PIXI.Point && Collider.shape instanceof PIXI.Point) {
					return this.shape.equals(Collider.shape)
				}
				else if (this.shape instanceof PIXI.Point) {
					return Collider.shape.contains(this.shape.x, this.shape.y)
				}
				else if (Collider.shape instanceof PIXI.Point) {
					return this.shape.contains(Collider.shape.x, Collider.shape.y)
				}

				if (this.shape instanceof PIXI.Rectangle && Collider.shape instanceof PIXI.Rectangle) {
					return this.shape.x <= Collider.shape.x + Collider.shape.width &&
							Collider.shape.x <= this.shape.x + this.shape.width &&
							this.shape.y <= Collider.shape.y + Collider.shape.height &&
							Collider.shape.y <= this.shape.y + this.shape.height
				}
				else if (this.shape instanceof PIXI.Rectangle) {
					return this.shape.contains(Collider.shape.x, Collider.shape.y) ||
							Collider.shape.contains(this.shape.x, this.shape.y) ||
							Collider.shape.contains(this.shape.x + this.shape.width, this.shape.y) ||
							Collider.shape.contains(this.shape.x, this.shape.y + this.shape.height) ||
							Collider.shape.contains(this.shape.x + this.shape.width, this.shape.y + this.shape.height)
				}
				else if (Collider.shape instanceof PIXI.Rectangle) {
					return Collider.shape.contains(this.shape.x, this.shape.y) ||
							this.shape.contains(Collider.shape.x, Collider.shape.y) ||
							this.shape.contains(Collider.shape.x + Collider.shape.width, Collider.shape.y) ||
							this.shape.contains(Collider.shape.x, Collider.shape.y + Collider.shape.height) ||
							this.shape.contains(Collider.shape.x + Collider.shape.width, Collider.shape.y + Collider.shape.height)
				}
			}
		}

		//  ________________________________________
		// /\                                       \
		// \_|Collider.draw                         |
		//   |                                      |
		//   |    draw is used to render a          |
		//   |    geometrical shape on a layer      |
		//   |    mostly for debug purpose          |
		//   |   ___________________________________|_
		//    \_/_____________________________________/

		this.draw = function (layer) {
			if (this.shape instanceof PIXI.Point) {
				layer.drawCircle(this.shape.x, this.shape.y, 1)
			}
			else if (this.shape instanceof PIXI.Circle) {
				layer.drawCircle(this.shape.x, this.shape.y, this.shape.radius)
			}
			else if (this.shape instanceof PIXI.Rectangle) {
				layer.drawRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height)
			}
			return this
		}
	}
}
