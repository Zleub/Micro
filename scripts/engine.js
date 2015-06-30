/*
* @Author: adebray
* @Date:   2015-06-07 16:35:53
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-30 11:00:40
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
document.body.appendChild(Micro.renderer.view);
Micro.renderer.view.style.marginTop = window.innerHeight / 2 - Micro.height / 2 +'px';

Micro.stage = new PIXI.Container();

Micro.loader = PIXI.loader;

Micro.menuBool = true
Micro.keyArray = []
window.addEventListener('keydown', function (e) {
	Micro.keyArray[e.keyCode] = true
} )
window.addEventListener('keyup', function (e) {
	Micro.keyArray[e.keyCode] = false

	if (e.keyCode == 27 && Micro.menuBool == true) {
		Micro.Layer.list.ui.alpha = 0
		Micro.menuBool = false
	}
	else if (e.keyCode == 27 && Micro.menuBool == false) {
		Micro.Layer.list.ui.alpha = 1
		Micro.menuBool = true
	}
} )

Micro.launch = function ()
{
	PIXI.loader.once('complete', function () {

		Micro.TutoA.make()
		addAuthor()
		animate()
	})
	PIXI.loader.load()
}

function update(dt)
{
	for (var i = 0; i < Micro.Entity.list.length; i++) {
		for (var j = 0; j < Micro.Entity.list[i].update.length; j++) {
			Micro.Entity.list[i].update[j](dt, Micro.Entity.list[i])
		}
	};

	Micro.Layer.list.foreground.position.x = Micro.width / 2 - Micro.Player.list[0].sprite.position.x
	Micro.Layer.list.foreground.position.y = Micro.height / 2 - Micro.Player.list[0].sprite.position.y

	if (Micro.Player.list[0].sprite.y > 3000) {
		Micro.Player.list[0].sprite.y = 0
		Micro.Player.list[0].sprite.x = 128
	}
}

var time = 0

function draw(dt) {

	if (Micro.debug) {

		if (time > 1) {
			time = 0;
			Micro.Layer.list.debug.reset()
		}

		time += dt / 1000

		for (var i = 0; i < Micro.Block.list.length; i++)
		{
			Micro.Block.list[i].rectangle.y = Micro.Block.list[i].sprite.y - dt
			Micro.Block.list[i].rectangle.height = dt * 2
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

	var text = new PIXI.Text(JSON.stringify(Micro.Player.list[0].velocity), {font : '24px Arial', fill : 0xff1010})
	Micro.stage.addChild(text)

	draw(dt / 4)

	Micro.stage.removeChild(text)

	Micro.time = Date.now()
	requestAnimationFrame(animate)
}
