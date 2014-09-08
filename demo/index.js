var create = require('../')
var data = require('./data')

var fs = require('fs')
var css1 = fs.readFileSync(__dirname+'/style.css', 'utf8')
var css2 = fs.readFileSync(__dirname+'/../css/style.css', 'utf8')
require('insert-css')(css1 + '\n' + css2)

var classes = require('dom-classes')
var style = require('dom-style')

function styleMap(control) {
    if (control.name === 'position') {
        return { 
            left: control.value[0]+'px',
            top: control.value[1]+'px'
        }
    }
    else if (control.name === 'size') {
        return {
            width: control.value[0]+'px',
            height: control.value[1]+'px'
        }
    }

    var ret = {}
    ret[control.name] = control.value
    return ret
}

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



    function updateControl(c) {
        var s = styleMap(c)
        style(element, s)   
    }

    timeline.layerManager.layers[0].controls.forEach(function(c) {
        c.on('change', updateControl.bind(this, c))
    })

    timeline.animations.on('set-playhead', function() {
        timeline.layerManager.layers[0].controls.forEach(updateControl)
    })

    document.body.appendChild(timeline.element)
})