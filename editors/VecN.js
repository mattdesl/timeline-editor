var numberEditor = require('number-editor')
var classes = require('dom-classes')

function VecN(count, opt) {
    if (!(this instanceof VecN))
        return new VecN(count, opt)
    opt = opt||{}
    this.element = document.createElement("div")
    classes.add(this.element, 'number-editor-group')
    this.editors = []
    count = count||1
    for (var i=0; i<count; i++) {
        var editor = numberEditor(opt)
        classes.add(editor.element, 'number-editor')

        this.editors.push( editor )
        this.element.appendChild(editor.element)
    }
}

Object.defineProperty(VecN.prototype, "value", {
    get: function() {
        return this.editors.map(function(e) {
            return e.value
        })
    },
    set: function(array) {
        array.forEach(function(v, i) { 
            this.editors[i].value = v
        }.bind(this))
    }
})

module.exports = VecN