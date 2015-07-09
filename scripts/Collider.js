//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  Collider.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-07 20:30:05
// :ddddddddddhyyddddddddddd: Modified: 2015-07-09 17:58:11
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

'use strict';

var Micro = window['Micro'] || {}

function testCircleRectangle(rectangle, circle) {
	return rectangle.contains(circle.x, circle.y) ||
			rectangle.contains(circle.x + circle.radius, circle.y ) ||
			rectangle.contains(circle.x - circle.radius, circle.y ) ||
			rectangle.contains(circle.x, circle.y + circle.radius) ||
			rectangle.contains(circle.x, circle.y - circle.radius) ||
			rectangle.contains(circle.x + Math.sqrt(3) / 2 * circle.radius, circle.y + circle.radius / 2) ||
			rectangle.contains(circle.x + Math.sqrt(3) / 2 * circle.radius, circle.y - circle.radius / 2) ||
			rectangle.contains(circle.x - Math.sqrt(3) / 2 * circle.radius, circle.y + circle.radius / 2) ||
			rectangle.contains(circle.x - Math.sqrt(3) / 2 * circle.radius, circle.y - circle.radius / 2) ||
			rectangle.contains(circle.x + circle.radius / 2, circle.y  + Math.sqrt(3) / 2 * circle.radius) ||
			rectangle.contains(circle.x - circle.radius / 2, circle.y  + Math.sqrt(3) / 2 * circle.radius) ||
			rectangle.contains(circle.x + circle.radius / 2, circle.y  - Math.sqrt(3) / 2 * circle.radius) ||
			rectangle.contains(circle.x - circle.radius / 2, circle.y  - Math.sqrt(3) / 2 * circle.radius) ||
			circle.contains(rectangle.x, rectangle.y) ||
			circle.contains(rectangle.x + rectangle.width, rectangle.y) ||
			circle.contains(rectangle.x, rectangle.y + rectangle.height) ||
			circle.contains(rectangle.x + rectangle.width, rectangle.y + rectangle.height)
}

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
		// \_|Collider.update                       |
		//   |                                      |
		//   |    update is a standard way to       |
		//   |    maintain a collider moving        |
		//   |   ___________________________________|_
		//    \_/_____________________________________/

		this.update = function (sprite) {
			// console.log("Collider.update :", this)
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
					return testCircleRectangle(this.shape, Collider.shape)
				}
				else if (Collider.shape instanceof PIXI.Rectangle) {
					return testCircleRectangle(Collider.shape, this.shape)
				}

				if (this.shape instanceof PIXI.Circle && Collider.shape instanceof PIXI.Circle) {
					return Math.pow(Collider.shape.x - this.shape.x, 2) + Math.pow(this.shape.y - Collider.shape.y, 2) <= Math.pow(this.shape.radius + Collider.shape.radius, 2)
				}
			}
		}

		//  ____________________________________
		// /\                                   \
		// \_|Collider.collideFunction          |
		//   |                                  |
		//   |  collideFunction is a container  |
		//   |    for run-time reactions        |
		//   |   _______________________________|_
		//    \_/_________________________________/

		this.collideFunction = function (entity) {
			console.log('collideFunction of ', this)
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
