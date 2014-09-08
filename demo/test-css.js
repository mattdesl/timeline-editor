var fs = require('fs')
var domify = require('domify')
// var tableHTML = fs.readFileSync(__dirname+'/table.html', 'utf8')
var classes = require('dom-classes')
var css = fs.readFileSync(__dirname+'/style.css', 'utf8')
require('insert-css')(css)

var template = require('./table.hbs')

var data = require('./data')

require('domready')(function() {
    var table = domify( template(data) )


    var main = document.createElement("div")
    classes.add(main, 'main')

    document.body.appendChild(main)
    main.appendChild(table)

})