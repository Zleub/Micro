/*
* @Author: adebray
* @Date:   2015-06-07 16:35:53
* @Last Modified by:   adebray
* @Last Modified time: 2015-07-01 20:38:50
*/

(function(){
	Math.clamp = function (a,b,c) {
		return Math.max( b, Math.min(c,a) )
	}
})();

var Micro = window['Micro'] || {}

console.log('start')

Micro.time = Date.now();
Micro.size = 16
Micro.width = Micro.size * 60
Micro.height = Micro.size * 40 + Micro.size / 2

Micro.renderer = new PIXI.WebGLRenderer(Micro.width, Micro.height);
// Micro.renderer.view.attributes["id"] = "MicroGame"
document.body.appendChild(Micro.renderer.view);
Micro.renderer.view.style.marginTop = window.innerHeight / 2 - Micro.height / 2 +'px';

Micro.stage = new PIXI.Container();

Micro.loader = PIXI.loader;

Micro.menuBool = false
Micro.keyEnum = {
	'space' : 32,
	'left' : 37,
	'right' : 39
}
Micro.keyArray = []
window.addEventListener('keydown', function (e) {
	Micro.keyArray[e.keyCode] = true

	if (e.keyCode == 27 && Micro.menuBool == true) { // On PauseMenu OFF
		Micro.Layer.list.ui.children[0].visible = false
		Micro.menuBool = false
	}
	else if (e.keyCode == 27 && Micro.menuBool == false) { // On PauseMenu ON
		Micro.Layer.makeBindingList()
		Micro.Layer.list.ui.children[0].visible = true
		Micro.menuBool = true
	}
} )
window.addEventListener('keyup', function (e) {
	Micro.keyArray[e.keyCode] = false

} )

Micro.keypressed = function (key) {
	if (typeof key == 'number')
		return Micro.keyArray[key]
	else
		return Micro.keyArray[Micro.keyEnum[key]]
}

// Micro.renderer.view.addEventListener('click', function() { }, false);

Micro.launch = function ()
{
	PIXI.loader.once('complete', function () {

		Micro.TutoA.make()
		addAuthor()

		var cacatest = new PIXI.extras.TilingSprite(Micro.Sprites.mountain_2[0]._texture, 400, 400)

		cacatest.x = -150
		cacatest.y = -150

		cacatest.scale.x = 4
		cacatest.scale.y = 4
		Micro.Layer.list.background.addChild(cacatest)

		Micro.Layer.makeUI()

		animate()
	})
	PIXI.loader.load()
}

function update(dt)
{
	if (Micro.menuBool)
		return

	for (var i = 0; i < Micro.Entity.list.length; i++) {
		for (var j = 0; j < Micro.Entity.list[i].update.length; j++) {
			Micro.Entity.list[i].update[j](dt, Micro.Entity.list[i])
		}
	};

	var testx = Micro.width / 2 - Micro.Player.list[0].sprite.position.x
	var testy = Micro.height / 2 - Micro.Player.list[0].sprite.position.y

	Micro.Layer.list.foreground.position.x = testx
	Micro.Layer.list.foreground.position.y = testy

	Micro.Layer.list.background.position.x = testx / 8
	Micro.Layer.list.background.position.y = testy / 8

	if (Micro.doortest.Irectangle.contains(Micro.Player.list[0].sprite.x, Micro.Player.list[0].sprite.y)
		|| new PIXI.Rectangle(Micro.Firetest.x, Micro.Firetest.y, Micro.Firetest.width, Micro.Firetest.height).contains(Micro.Player.list[0].sprite.x, Micro.Player.list[0].sprite.y))
		Micro.test.visible = true
	else
		Micro.test.visible = false

	if (Micro.Player.list[0].sprite.y > 3000) {
		Micro.Player.list[0].sprite.y = 0
		Micro.Player.list[0].sprite.x = 128
	}
}

var cmp = 0

function draw(dt) {

	if (Micro.debug) {

		if (cmp > 0.1) {
			cmp = 0;
			Micro.Layer.list.debug.reset()
		}

		cmp += dt / 1000

		for (var i = 0; i < Micro.Block.list.length; i++)
		{
			Micro.Block.list[i].rectangle.y = Micro.Block.list[i].sprite.y - dt * 2
			Micro.Block.list[i].rectangle.height = dt * 2 * 2
			Micro.Block.list[i].draw()
		}

		for (var i = Micro.Door.list.length - 1; i >= 0; i--) {
			Micro.Door.list[i].draw()
		};

		Micro.Layer.list.debug.children[0].drawCircle(Micro.Player.list[0].sprite.x, Micro.Player.list[0].sprite.y, 1)

	}

	Micro.renderer.render(Micro.stage)
}

function addAuthor()
{
	var lenmax = Math.max(
		Math.max(Micro.author[0].length, Micro.author[1].length),
		Math.max(Micro.author[2].length, Micro.author[3].length)
	)

	var string = 'Last Update Box ._.\n' + Micro.author[0] + '\n' + Micro.author[1] + '\n' + Micro.author[2] + '\n' + Micro.author[3]

	var authorText = new PIXI.Text(string, {font : '14px courier', fill : 0xd8d8d8, align : 'center'})
	authorText.x = Micro.width - lenmax * 9
	authorText.y = 25
	Micro.Layer.list.ui.addChild(authorText)
}

function animate()
{
	var dt = Date.now() - Micro.time

	update(dt / 4)
	update(dt / 4)
	update(dt / 4)
	update(dt / 4)

	// var text = new PIXI.Text(JSON.stringify(Micro.Player.list[0].velocity), {font : '24px Arial', fill : 0xff1010})
	// Micro.stage.addChild(text)

	draw(dt / 4)

	// Micro.stage.removeChild(text)

	Micro.time = Date.now()
	requestAnimationFrame(animate)
}
