var Micro = window['Micro'] || {}

Math.clamp = function (a,b,c) {
	return Math.max( b, Math.min(c,a) )
}

Math.getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

