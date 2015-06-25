/*
* @Author: adebray
* @Date:   2015-06-07 16:35:53
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-25 19:31:25
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

Micro.renderer = new PIXI.CanvasRenderer(Micro.width, Micro.height);
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

		//Micro.Asset.newAt(Micro.Sprites['Sprute'][40], 400, 450)
		//Micro.Asset.newAt(Micro.Sprites['Sprute'][40], 400, 290)
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

		Micro.Asset.newAt(Micro.Sprites['Door'][0], -75, Micro.height - Micro.Sprites['Door'][0].width - 16)

		Micro.Player.new(Micro.Sprites['dwarves'][1]).sprite.x = 64



		addAuthor();
		animate();
	})
	PIXI.loader.load()
}

// function gravity(dt, entity)
// {
// 	entity.moveBy(0, dt)
// }

function update(dt)
{
	for (var i = 0; i < Micro.Player.list.length; i++) {
		Micro.Player.list[i].update(dt)
	};
	// for (var i = 0; i < Micro.Entity.list.length; i++) {
		// Micro.Entity.list[i].update(dt)
	// };
}

function addAuthor()
{
	var lenmax = Math.max(
		Math.max(Micro.author[0].length, Micro.author[1].length),
		Math.max(Micro.author[2].length, Micro.author[3].length)
	)

	console.log(lenmax)
	var string = Micro.author[0] + '\n' + Micro.author[1] + '\n' + Micro.author[2] + '\n' + Micro.author[3]

	var authorText = new PIXI.Text(string, {font : '14px courier', fill : 0xd8d8d8, align : 'center'})
	authorText.x = Micro.width - lenmax * 9
	authorText.y = 25
	Micro.stage.addChild(authorText)
}

function Removeauthor(authorText)
{
	Micro.stage.removeChild(authorText)
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

	Micro.renderer.render(Micro.stage)

	// Micro.stage.removeChild(text)

	Micro.time = Date.now()
	requestAnimationFrame(animate)
}
