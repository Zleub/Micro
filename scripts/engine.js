//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  engine.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-08-07 08:15:25
// :ddddddddddhyyddddddddddd: Modified: 2015-08-15 20:30:13
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

var Micro = window['Micro'] || {}

Micro.Var = 12
Micro.Watch = 0

Micro.lastPressed = 0

Micro.time = Date.now();
Micro.size = 16
Micro.width = Micro.size * 60
Micro.height = Micro.size * 40 + Micro.size / 2

Micro.renderer = new PIXI.WebGLRenderer(Micro.width, Micro.height);
document.body.appendChild(Micro.renderer.view);
if (window.innerHeight > Micro.height)
	Micro.renderer.view.style.marginTop = window.innerHeight / 2 - Micro.height / 1.5 +'px';
if (parseInt(Micro.renderer.view.style.marginTop) < 30)
	Micro.renderer.view.style.marginTop = '30px'

window.addEventListener('resize', function () {
	if (window.innerHeight > Micro.height)
		Micro.renderer.view.style.marginTop = window.innerHeight / 2 - Micro.height / 1.5 +'px';
	if (parseInt(Micro.renderer.view.style.marginTop) < 30)
		Micro.renderer.view.style.marginTop = '30px'
} )

Micro.scale = 1
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
	Micro.lastPressed = e.keyCode
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
	for (var i = 0; i < 10; i++) {
		var player = new Micro.Player(Micro.Sprites['dwarves'][Math.getRandomInt(0, 264)]._texture)
			player.addTo(Micro.Layer.list.foreground)
			player.scale = Micro.Sprites['dwarves'][0].scale
			player.moveTo(Math.getRandomInt(10, 1024), 0)
			// player.moveTo(128, 0)
	};
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

Micro.makeGUI = function () {
	Micro.State.current = 'GAME'

	var gui = new dat.GUI({ autoPlace: false, width: 150 });
	gui.closed = true

	$('.container').append(gui.domElement)

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
	gui.add(Micro, "lastPressed").listen()
	var f2 = gui.addFolder('KeyMap');
	for (var k in Micro.keyEnum) {
		f2.add(Micro.keyEnum, k)
	}

	gui.add(Micro, "scale")
	gui.add(Micro, "applyScale")

	var elem = document.getElementsByClassName('close-button')

	for (var i = 0; i < elem.length; i++) {
		elem[i].style['height'] = '24px';
		elem[i].parentElement.style['padding-top'] = '10px';
	};
}

Micro.applyScale = function () {
	Micro.Layer.list.foreground.scale = new PIXI.Point(Micro.scale, Micro.scale)
}

Micro.launch = function ()
{
	PIXI.loader.once('complete', function () {

		var test = new PIXI.Vector2(
			new PIXI.Point(Math.getRandomInt(-150, 150), Math.getRandomInt(-150, 150)),
			new PIXI.Point(Math.getRandomInt(-150, 150), Math.getRandomInt(-150, 150))
		)

		console.log(new PIXI.TreeNode(test))

		addAuthor()

		Micro.TutoA.make()
		// for (var i = 0; i < 800; i++) {
		// 	Micro.addPlayer()
		// };

		Micro.State.current = 'GAME'

		Micro.makeGUI()

		Micro.LTIME = Date.now() - Micro.time
		Micro.time = Date.now()

		animate()
	})
	PIXI.loader.load()
}

var lock = false
Micro.update = function (dt)
{
	// Micro.Watch = dt
	Micro.State.map[Micro.State.current].update(dt)


	// if (lock == false && Micro.entityList[0].sprite.y > 1500) {

	// 	Micro.Wrapper.stdblock(Micro.entityList[0].sprite.x - 40, Micro.entityList[0].sprite.y + 60)
	// 	lock = true
	// }
	if (Micro.entityList[0].sprite.y > 3000) {
		Micro.entityList[0].sprite.y = 0
		// Micro.entityList[0].sprite.x = 128
	}

}

Micro.draw = function (dt) {

	// Micro.blockList[0].collider[0].draw(Micro.Layer.list.debug.children[0])

	if (Micro.debug) {

		Micro.blockTree.forAny(
			function (Node) {
				if (Node.parent == undefined || Node.parent.content == undefined)
					return false
				else
					return true
			},
			function (Node) {
				var Pcenter = Node.parent.content.getCentrum()
				var center = Node.content.getCentrum()

				Micro.Layer.list.debug.children[Micro.Layer.list.debug.children.length - 1].moveTo(Pcenter.x, Pcenter.y)
				Micro.Layer.list.debug.children[Micro.Layer.list.debug.children.length - 1].lineTo(center.x, center.y)
			}
		)

		for (var i = Micro.entityList.length - 1; i >= 0; i--) {
			Micro.Layer.list.debug.children[Micro.Layer.list.debug.children.length - 1].moveTo(Micro.entityList[i].sprite.x, Micro.entityList[i].sprite.y)
			Micro.Layer.list.debug.children[Micro.Layer.list.debug.children.length - 1].lineTo(Micro.entityList[i].nearestBlock.content.getCentrum().x, Micro.entityList[i].nearestBlock.content.getCentrum().y)
		};


		for (var i = 0; i < Micro.baseList.length; i++) {
			if (Micro.baseList[i].getCentrum)
				Micro.Layer.list.debug.children[Micro.Layer.list.debug.children.length - 1].drawRect(Micro.baseList[i].getCentrum().x, Micro.baseList[i].getCentrum().y, 10, 10 )

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
	Micro.dt = 4

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
