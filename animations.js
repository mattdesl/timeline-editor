var offset = require('mouse-event-offset')
var events = require('dom-events')
var classes = require('dom-classes')
var domify = require('domify')
var fs = require('fs')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

var layerHTML = fs.readFileSync(__dirname + '/html/layer-animation.html', 'utf8')
var controlHTML = fs.readFileSync(__dirname + '/html/control-animation.html', 'utf8')

function Animations(layerManager) {
    if (!(this instanceof Animations))
        return new Animations(layerManager)
    EventEmitter.call(this)

    this.layerManager = layerManager
    this.element = document.createElement("div")
    classes.add(this.element, 'animations-container')

    this.create()

    this.playheadElement = document.createElement("div")
    classes.add(this.playheadElement, 'playhead')
    this.element.appendChild(this.playheadElement)

    this.playhead = 0
    this.dragging = null
    
    

}

inherits(Animations, EventEmitter)

Animations.prototype._createKeyframe = function(parent, x) {
    var keyframe = document.createElement("figure")
    classes.add(keyframe, 'keyframe')
    keyframe.style.left = Math.round(x)+'px'
    parent.appendChild(keyframe)
}

Animations.prototype.properties = function() {
    var curTime = this.playhead

}

Animations.prototype._setupControlEvents = function(row) {
    events.on(row, 'mousedown', function(ev) {
        var rect = row.getBoundingClientRect()
        var x = offset(ev, { clientRect: rect }).x

        this.playhead = x/rect.width
        this.playheadElement.style.left = Math.round(x)+'px'

        this.dragging = ev.button||ev.which
        this.emit('set-playhead')
    }.bind(this))

    events.on(row, 'mousemove', function(ev) {
        if (this.dragging !== null && this.dragging === (ev.button||ev.which)) {
            var rect = row.getBoundingClientRect()
            var x = offset(ev, { clientRect: rect }).x

            this.playhead = x/rect.width
            this.playheadElement.style.left = Math.round(x)+'px'

            this.emit('set-playhead')
        }
    }.bind(this))

    events.on(row, 'mouseup', function(ev) {
        this.dragging = null
    }.bind(this))

    events.on(row, 'dblclick', function(ev) {
        var x = offset(ev).x
        this._createKeyframe(row, x)
        // this.emit('add-keyframe', x)
    }.bind(this))
}

Animations.prototype.create = function() {
    this.layerManager.layers.forEach(function(layer) {
        var container = domify(layerHTML)

        layer.on('opened', function() {
            console.log("LAYER OPEN")
            classes.remove(container, 'layer-open')
            classes.add(container, 'layer-open')
        }.bind(this, container))
        layer.on('closed', function() {
            classes.remove(container, 'layer-open')
        }.bind(this, container))

        layer.controls.forEach(function(c) {
            var controlRow = domify(controlHTML)

            this._setupControlEvents(controlRow)

            container.appendChild( controlRow )
        }.bind(this))


        this.element.appendChild( container )
    }.bind(this))
}

module.exports = Animations