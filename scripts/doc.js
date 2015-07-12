$( function () {

    $.getJSON('scripts/doc.json').done(function (json) {
       for (var k in json) {
            var elem = document.createElement('div')
            var text = ''
            for (var i = 0; i < json[k].length; i++) {
                if (i == 0) {
                    text += '<h3>' + k + '</h3>' + '<br>'
                    text += json[k][i] + '<br>'
                }
                else
                    text += json[k][i] + '<br>'
            }
            elem.innerHTML = text
            elem.setAttribute('class', 'doc')
            document.body.appendChild(elem)
       }
    })
})
