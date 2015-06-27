/*
* @Author: adebray
* @Date:   2015-06-07 16:35:53
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-27 19:50:26
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

Micro.keyArray = []
window.addEventListener('keydown', function (e) {
	Micro.keyArray[e.keyCode] = true
} )
window.addEventListener('keyup', function (e) {
	Micro.keyArray[e.keyCode] = false
} )

Micro.launch = function ()
{
	PIXI.loader.once('complete', function () {


		// Micro.Asset.newAt(Micro.Sprites['Sprute'][40], 400, 450)
		// Micro.Asset.newAt(Micro.Sprites['Sprute'][40], 400, 290)

		Micro.Asset.newAt(Micro.Sprites['mountain_2'][0], 0, Micro.height - Micro.Sprites['mountain_2'][0].height)
		Micro.Asset.newAt(Micro.Sprites['mountain_2'][0], Micro.Sprites['mountain_2'][0].width, Micro.height - Micro.Sprites['mountain_2'][0].height)

		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(0, Micro.height - Micro.size)
		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(160, Micro.height - Micro.size)
		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(400, 610)
		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(560, 610)
		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(560, 610)
		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(800, 550)
		Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(560, 450)
		Micro.Block.new(Micro.Sprites['Sprute'][38]).moveTo(400, 400)
		Micro.Asset.newAt(Micro.Sprites['Sprute'][40], 400, 450)

		// Micro.Asset.newAt(Micro.Sprites['Door'][0], -77, Micro.height - Micro.Sprites['Door'][0].width - 16)

		Micro.Door.newAt(Micro.Sprites['Door'][0], -77, Micro.height - Micro.Sprites['Door'][0].width - 16)
		// Micro.Door.newAt(Micro.Sprites['Door'][0], 100, 100).draw()

		Micro.Player.new(Micro.Sprites['dwarves'][1]).sprite.x = 64

		// Micro.Layer.list.debug.children[0].drawRect(10, 10, 100, 100)

		addAuthor();
		animate();
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

	// var text = new PIXI.Text(JSON.stringify(Micro.Player.list[0].velocity), {font : '24px Arial', fill : 0xff1010})
	// Micro.stage.addChild(text)

	draw(dt / 4)

	// Micro.stage.removeChild(text)

	Micro.time = Date.now()
	requestAnimationFrame(animate)
}
