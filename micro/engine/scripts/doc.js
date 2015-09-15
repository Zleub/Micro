//          `--::-.`
//      ./shddddddddhs+.
//    :yddddddddddddddddy:
//  `sdddddddddddddddddddds`
//  ydddh+sdddddddddy+ydddds  doc.js
// /ddddy:oddddddddds:sddddd/ By adebray - adebray
// sdddddddddddddddddddddddds
// sdddddddddddddddddddddddds Created: 2015-07-11 19:22:45
// :ddddddddddhyyddddddddddd: Modified: 2015-08-07 08:54:12
//  odddddddd/`:-`sdddddddds
//   +ddddddh`+dh +dddddddo
//    -sdddddh///sdddddds-
//      .+ydddddddddhs/.
//          .-::::-`

$( function () {

    $.getJSON('micro/engine/scripts/doc.json').done(function (json) {
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
