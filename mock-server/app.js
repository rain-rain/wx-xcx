var app = require("express")()
var route = require("./route")
var fs = require("fs")
var path = require("path")

app.get('/', function (req, res) {
  res.send('Hello World')
})

for (var name in route) {
	var s = name.split(" ")
	var method = s[0].toLowerCase()
	var url = s[1]
	var mockFile = route[name]

	app[method](url, (function(mockFile) {
		return function(req, res) {
			res.setHeader('Content-Type', 'application/json')
			res.send(fs.readFileSync(path.join(__dirname + "/" + mockFile)))
		}
	})(mockFile))
}

app.listen(3000)