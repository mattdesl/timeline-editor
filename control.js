var fs = require('fs')
var html = fs.readFileSync(__dirname+'/html/control.html', 'utf8')
var hyperglue = require('hyperglue')
var $ = require('dom-select')
var classes = require('dom-classes')

function Control(data, editors) {
    if (!(this instanceof Control)) return new Control(data, editors)
    this.element = null
    this.enabled = true
    this.editor = null

    if (data)
        this.create(data, editors)
}

Control.prototype.dispose = function() {
    if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element)
        this.element = null
    }
}

Control.prototype.create = function(data, editors) {
    this.dispose()
    
    this.element = hyperglue(html, {
        '.name': data.name
    })  

    if (!data.type)
        data.type = 'default'

    if (data.type in editors) {
        this.editor = editors[data.type](data.options)
        $('.control-editor', this.element).appendChild(this.editor.element)
    } else
        throw new Error("no editor "+data.type+" for control: "+data)
}

Object.defineProperty(Control.prototype, "value", {
    get: function() {
        if (!this.editor)
            throw new Error("value can only be accessed after create()")
        return this.editor.value
    },
    set: function(value) {
        if (!this.editor)
            throw new Error("value can only be set after create()")
        this.editor.value = value
    }
})

module.exports = Control