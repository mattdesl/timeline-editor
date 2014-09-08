var create = require('../')
var data = require('./data')

var fs = require('fs')
var css1 = fs.readFileSync(__dirname+'/style.css', 'utf8')
var css2 = fs.readFileSync(__dirname+'/../css/style.css', 'utf8')
require('insert-css')(css1 + '\n' + css2)

var classes = require('dom-classes')
var style = require('dom-style')

require('domready')(function() {
    var element = document.createElement('div')
    document.body.appendChild(element)
    style(element, {
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '100px',
        height: '100px',
        background: 'red',
        opacity: '1.0'
    })


    var timeline = create(data)
    timeline.open(0)
    document.body.appendChild(timeline.element)
})