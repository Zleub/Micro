/*
* @Author: adebray
* @Date:   2015-06-07 16:35:53
* @Last Modified by:   adebray
* @Last Modified time: 2015-06-11 22:32:38
*/

var Micro = window['Micro'] || {}

console.log('start')

Micro.time = Date.now();
Micro.size = 16
Micro.width = Micro.size * 60
Micro.height = Micro.size * 40

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

function gravity(dt, sprite)
{
	sprite.y += dt;
	if (sprite.y + sprite.height > Micro.height)
		sprite.y = Micro.height - sprite.height
}

// function require(id, filename, callback)
// {
// 	console.log('require: ' + filename)

// 	var elem = document.createElement('script');
// 	elem.type = 'text/javascript';
// 	elem.src = filename;

// 	document.body.appendChild(elem);
// 	elem.onload = function () {
// 		callback(id)
// 		if (!(id in Micro))
// 			Micro[id] = true
// 	}
// }

function update(dt)
{
	if (!('Sprites' in Micro))
	{
		console.log('return')
		return
	}
	// console.log(dt)
	if (Micro.Sprites['dwarves'])
		gravity(dt, Micro.Sprites['dwarves'][1]);

	if (Micro.keyArray[37] && Micro.Sprites['dwarves'])
		Micro.Sprites['dwarves'][1].x -= dt;
	if (Micro.keyArray[39] && Micro.Sprites['dwarves'])
		Micro.Sprites['dwarves'][1].x += dt;
}
function animate()
{
	console.log('animate')
	var dt = Date.now() - Micro.time

	update(dt)
	Micro.renderer.render(Micro.stage);
	requestAnimationFrame(animate);
	Micro.time = Date.now()
}
// $('body').data('Micro', Micro);
console.log('end')

animate()
