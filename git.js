var fs = require('fs');

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


exports.writeAuthor = function () {
	array = fs.readFileSync(".git/logs/HEAD")

	for (var i = array.length - 2; i > 0; i--) {
		if (array[i] == 10)
			break
	};

	array = array.slice(i + 1, array.length - 1)
	array = array.toString()
	var re = /(\S+)\s<(.+)>\s(.+)\scommit: (.+)/;
	array = array.match(re)
	console.log(array)
	array.shift()

	array[2] = timeConverter(array[2].split(" ")[0])

	fs.writeSync(fs.openSync("author.json", "w"), JSON.stringify(array) + "\n")
}
