// - name
// - value (float, color, array, boolean, etc)
// - keyframes

var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var lerp = require('lerp')

function sort(a, b) {
    return a.time - b.time
}

function range(min, max, value) {
  return (value - min) / (max - min)
}

function Control(opt) {
    if (!(this instanceof Control)) 
        return new Control(opt)
    EventEmitter.call(this)
    opt = opt||{}

    this.keyframes = opt.keyframes || []
    this.name = opt.name || ''
    this.value = opt.value
}

inherits(Control, EventEmitter)

//Finds the index of the nearest keyframe to the given time stamp.
//If radius is specified, it will return the nearest only within that radius
Control.prototype.indexOfKeyframeAt = function(time, radius) {
    radius = typeof radius === 'number' ? radius : Number.MAX_VALUE
    var minDist = Number.MAX_VALUE
    var nearest = -1
    for (var i=0; i<this.keyframes.length; i++) {
        var dist = Math.abs(this.keyframes[i].time - time)
        if (dist < minDist && dist <= radius) {
            minDist = dist
            nearest = i
        }
    }
    return nearest
}

//convenience
Control.prototype.keyframeAt = function(time, radius) {
    var idx = this.indexOfKeyframeAt(time, radius)
    return idx === -1 ? null : this.keyframes[idx]
}

//lerps the value at the specified time stamp
Control.prototype.getValueAt = function(time) {
    if (this.keyframes.length === 0)
        return this.value

    var prev = -1
    //get last keyframe to time
    for (var i=this.keyframes.length-1; i>=0; i--) {
        if (time >= this.keyframes[i].time) {
            prev = i
            break
        }
    }

    //start or end keyframes
    if (prev === -1 || prev === this.keyframes.length-1) {
        if (prev < 0)
            prev = 0
        return this.keyframes[prev].value
    } 
    else {
        var startFrame = this.keyframes[prev]
        var endFrame = this.keyframes[prev+1]

        //clamp and get range
        time = Math.max(startFrame.time, Math.min(time, endFrame.time))
        var t = range(startFrame.time, endFrame.time, time)

        //ease using the left keyframe
        if (typeof startFrame.ease === 'function')
            return startFrame.ease(startFrame.value, endFrame.value, t)
        
        return lerp(startFrame.value, endFrame.value, t)
    }
}

Control.prototype.updateKeyframes = function() {
    this.keyframes.sort(sort)
}

Control.prototype.addKeyframe = function(time) {
    this.keyframes.push({ time: time, value: this.value })
}

module.exports = Control