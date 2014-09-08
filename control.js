var fs = require('fs')
var html = fs.readFileSync(__dirname+'/html/control.html', 'utf8')
var hyperglue = require('hyperglue')
var $ = require('dom-select')
var classes = require('dom-classes')
var events = require('dom-events')

var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

function sort(a, b) {
    return a.time - b.time
}
function range(min, max, value) {
  return (value - min) / (max - min)
}

function Control(data, editors) {
    if (!(this instanceof Control)) return new Control(data, editors)
    EventEmitter.call(this)
    this.element = null
    this.enabled = true
    this.editor = null
    this.keyframes = []

    if (data)
        this.create(data, editors)
}

inherits(Control, EventEmitter)

Control.prototype.dispose = function() {
    if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element)
        this.element = null
    }
    this.keyframes.length = 0
}

Control.prototype.update = function(time) {
    //no keyframes..
    if (this.keyframes.length === 0)
        return

    var prev = -1
    //get closest keyframe to time
    for (var i=this.keyframes.length-1; i>=0; i--) {
        if (time >= this.keyframes[i].time) {
            prev = i
            break
        }
    }
    console.log(prev)
    //no lerp
    if (prev === -1 || prev === this.keyframes.length-1) {
        if (prev < 0)
            prev = 0
        this.value = this.keyframes[prev].value
    } 
    //simple lerp for now
    else {
        this.value = this.keyframes[prev].value
        var t = range(this.keyframes[prev].time, this.keyframes[prev+1].time, time)
        this.editor.lerp(this.keyframes[prev+1].value, t)
    }
}

Control.prototype.addKeyframe = function(time) {
    this.keyframes.push({ time: time, value: this.value })
    this.keyframes.sort(sort)
}

Control.prototype.create = function(data, editors) {
    this.dispose()
    
    this.element = hyperglue(html, {
        '.name': data.name
    })  
    this.name = data.name

    this.keyframes = data.keyframes || []

    if (!data.type)
        data.type = 'default'

    if (data.type in editors) {
        this.editor = editors[data.type](data.options)
        $('.control-editor', this.element).appendChild(this.editor.element)
    } else
        throw new Error("no editor "+data.type+" for control: "+data)


    //TODO: eventually make a "skeleton" of everything that
    //doesn't actually depend on the DOM
    var toggle = $('.keyframe-toggle', this.element)
    events.on(toggle, 'click', function(ev) {
        this.emit('toggle-keyframe')
    }.bind(this))

    this.editor.on('change', function() {
        this.emit('change')
    }.bind(this))
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