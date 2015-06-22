/*
* @Author: adebray
* @Date:   2015-06-07 16:35:53
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-22 16:35:28
*/

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

		var dup = new PIXI.Sprite(Micro.Sprites['Sprute'][14].generateTexture(Micro.renderer))
		dup.scale.x = Micro.Sprites['Sprute'][14].scale.x
		dup.scale.y = Micro.Sprites['Sprute'][14].scale.y
		Micro.Block.new(dup).moveTo(200, 500)

		var dup2 = new PIXI.Sprite(Micro.Sprites['Sprute'][14].generateTexture(Micro.renderer))
		dup2.scale.x = Micro.Sprites['Sprute'][14].scale.x
		dup2.scale.y = Micro.Sprites['Sprute'][14].scale.y
		Micro.Block.new(dup2).moveTo(400, 610)
		Micro.Block.new(Micro.Sprites['Sprute'][14]).moveTo(0, Micro.height - Micro.size)

		// dupeSprite[c] = new PIXI.Sprite(PIXI.Texture.fromFrame(sprites.sprite));
		// Micro.Block.new(new PIXI.Sprite(Micro.Sprites['Sprute'][14]))

		Micro.Player.new(Micro.Sprites['dwarves'][1])

		addAuthor();
		animate();
	})
	PIXI.loader.load()
}

function gravity(dt, entity)
{
	entity.moveBy(0, dt)
}

function update(dt)
{
	for (var i = 0; i < Micro.Player.list.length; i++) {
		Micro.Player.list[i].update(dt)
	};
	for (var i = 0; i < Micro.Entity.list.length; i++) {
		gravity(dt, Micro.Entity.list[i])
	};
}

function addAuthor()
{
	var string = Micro.author[0] + '\n' + Micro.author[1] + '\n' + Micro.author[2] + ' : ' + Micro.author[3]

	var authorText = new PIXI.Text(string, {font : '14px Arial', fill : 0xff1010, align : 'right'})
	authorText.x = Micro.width - 200
	authorText.y = 10
	Micro.stage.addChild(authorText)


}

function Removeauthor(authorText)
{
	Micro.stage.removeChild(authorText)
}

function animate()
{
	var dt = Date.now() - Micro.time

	update(dt)
	// console.log(author())
	// var text = new PIXI.Text(Micro.Player.list[0].jumpBool ,{font : '24px Arial', fill : 0xff1010, align : 'center'})
	// var authorText = new PIXI.Text(author().substr(2, author().length - 4), {font : '24px Arial', fill : 0xff1010})

	// // Micro.stage.addChild(text)
	// Micro.stage.addChild(authorText)

	// authorText = Writeauthor()
	Micro.renderer.render(Micro.stage)
	// Micro.stage.removeChild(text)
	// Removeauthor(authorText)

	Micro.time = Date.now()
	requestAnimationFrame(animate)
}
