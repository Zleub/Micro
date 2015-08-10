function GetTemplate(json, id) {
	if (json[id]) {
		$.get(json[id] + '.article', function (data) {
			elem = window.document.createElement('div')
			elem.innerHTML = data;
			$('.main').append(elem);
			$('pre code').each( function(i, block) {
				hljs.highlightBlock(block);
			})

		})
		GetTemplate(json, id + 1)
	}
}

$.getJSON('blog/public.json').done(
	function (json) { GetTemplate(json, 0) } )
