var classes = require('dom-classes')

var Layer = require('./layer')
var Control = require('./control')
var editors = require('./editors')

function Layers(opt) {
    if (!(this instanceof Layers))
        return new Layers(opt)
    opt = opt||{}
    this.editors = opt.editors || editors

    this.element = document.createElement("div")
    classes.add(this.element, 'timeline-container')

    this.layers = []
}

Layers.prototype.create = function(layers) {
    layers.forEach(function(layerData) {
        var layer = new Layer(layerData, this.editors)
        this.layers.push(layer)
        this.element.appendChild(layer.element)
    }.bind(this))
}

module.exports = Layers