//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  engine.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-07 08:15:25
// :ddddddddddhyyddddddddddd: Modified: 2015-08-07 08:54:22
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

var Micro = window['Micro'] || {}

Micro.Var = 12
Micro.Watch = 0
// Micro.debug = true

Micro.time = Date.now();
Micro.size = 16
Micro.width = Micro.size * 60
Micro.height = Micro.size * 40 + Micro.size / 2

Micro.renderer = new PIXI.WebGLRenderer(Micro.width, Micro.height);
document.body.appendChild(Micro.renderer.view);
Micro.renderer.view.style.marginTop = window.innerHeight / 2 - Micro.height / 2 +'px';
if (Micro.renderer.view.style.marginTop < 55)
	Micro.renderer.view.style.marginTop = 55

Micro.stage = new PIXI.Container();

Micro.menuBool = false
Micro.keyEnum = {
	'escape' : 27,
	'space' : 32,
	'left' : 37,
	'up' : 38,
	'right' : 39,
	'down' : 40,
	'action' : 69
}

Micro.keyArray = []
window.addEventListener('keydown', function (e) {
	Micro.keyArray[e.keyCode] = true
	Micro.State.map[Micro.State.current].keydown(e.keyCode)
} )
window.addEventListener('keyup', function (e) {
	Micro.keyArray[e.keyCode] = false
	Micro.State.map[Micro.State.current].keyup(e.keyCode)
} )

Micro.keypressed = function (key) {
	if (typeof key == 'number')
		return Micro.keyArray[key]
	else
		return Micro.keyArray[Micro.keyEnum[key]]
}

Micro.keyreset = function (key) {
	if (typeof key == 'number')
		Micro.keyArray[key] = false
	else
		Micro.keyArray[Micro.keyEnum[key]] = false
}

Micro.addPlayer = function () {
	var player = new Micro.Player(Micro.Sprites['dwarves'][Math.getRandomInt(0, 264)]._texture)
		player.addTo(Micro.Layer.list.foreground)
		player.scale = Micro.Sprites['dwarves'][0].scale
		player.moveTo(Math.getRandomInt(0, 1024), 0)
		// player.moveTo(128, 0)
}

Micro.switchDebug = function () {
	if (this.debug)
		this.debug = false
	else
		this.debug = true
}

Micro.clearDebug = function () {
	Micro.Layer.list.debug.reset()
}

Micro.autoJump = function () {
	Micro.keyArray[32] = true
}

Micro.launch = function ()
{
	PIXI.loader.once('complete', function () {

		var test = new Micro.Populator
		test.Seeder.rule.quantity = 12
		test.Seeder.rule.seed = function () { return Math.getRandomInt(-1, 4) }

		test.rule.seedControl = function () {}
		test.rule.contentControl = function () {}
		test.rule.creationControl = function () {}
		test.rule.completionControl = function () {}
		test.call()
		console.log(test)

		addAuthor()

		Micro.TutoA.make()
		// for (var i = 0; i < 250; i++) {
		// 	Micro.addPlayer()
		// };

		Micro.State.current = 'GAME'

		var gui = new dat.GUI();
		gui.closed = true

		var f1 = gui.addFolder('Coord.');
		f1.add(Micro.entityList[0].sprite, "x").listen()
		f1.add(Micro.entityList[0].sprite, "y").listen()
		gui.add(Micro.State, "current", ["GAME", "MENU"]).listen()
		gui.add(Micro.Layer.list.ui.children[1], "visible").listen()
		gui.add(Micro, "Var").listen()
		gui.add(Micro, "Watch").listen()
		gui.add(Micro.entityList, "length").listen()
		gui.add(Micro, "addPlayer")
		gui.add(Micro, "switchDebug")
		gui.add(Micro, "clearDebug")
		gui.add(Micro, "autoJump")

		var elem = document.getElementsByClassName('close-button')

		for (var i = 0; i < elem.length; i++) {
			elem[i].style['height'] = '24px';
			elem[i].parentElement.style['padding-top'] = '10px';
		};


		Micro.LTIME = Date.now() - Micro.time
		Micro.time = Date.now()

		animate()
	})
	PIXI.loader.load()
}

Micro.update = function (dt)
{
	Micro.Watch = dt
	Micro.State.map[Micro.State.current].update(dt)

	if (Micro.entityList[0].sprite.y > 3000) {
		Micro.entityList[0].sprite.y = 0
		Micro.entityList[0].sprite.x = 128

	}
}

Micro.draw = function (dt) {

	// Micro.blockList[0].collider[0].draw(Micro.Layer.list.debug.children[0])

	if (Micro.debug) {

		for (var i = 0; i < Micro.baseList.length; i++) {
			for (var j = 0; j < Micro.baseList[i].collider.length; j++) {
				Micro.baseList[i].collider[j].draw(Micro.Layer.list.debug.children[Micro.Layer.list.debug.children.length - 1])
			}
		};

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
	Micro.dt = (Date.now() - Micro.time) / 4

	Micro.update(Micro.dt)
	Micro.update(Micro.dt)
	Micro.update(Micro.dt)
	Micro.update(Micro.dt)

	var text_tmp = Micro.LTIME / 1000
	var text = new PIXI.Text(text_tmp, {font : '24px Arial', fill : 0xff1010})
	Micro.stage.addChild(text)

	Micro.draw(Micro.dt)

	Micro.stage.removeChild(text)

	Micro.time = Date.now()
	requestAnimationFrame(animate)
}
