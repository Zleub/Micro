var div = document.createElement('div')
div.setAttribute('class', 'menu')

var ul = document.createElement('ul')
addtomenu = function (ul, href, text) {
	var li = document.createElement('li')
		li.setAttribute('class', 'cell')
	var a = document.createElement('a')
		a.setAttribute('href', href)
		a.text = text

	li.appendChild(a)
	ul.appendChild(li)
}

$.get("web/scripts/menu.json", function(d) {
	d = JSON.parse(d)
	addtomenu(ul, "/", "ADEBRAY.OVH")
	addtomenu(ul, "http://github.com/Zleub/Micro", "GitHub")

	d.forEach(function (data) {
		if (data.split('.')[0] != 'index' && data.split('.')[0][0]) {
			var str = data.split('.')[0][0].toUpperCase() + data.split('.')[0].substr(1)
			addtomenu(ul, data, str)
		}
	})
	div.appendChild(ul)
	$('body').prepend(div)
})
