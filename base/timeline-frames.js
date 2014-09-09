//Generic list of keyframes with timestamps and values

var lerpNumbers = require('./lerp-numbers')
var range = require('./range-of')

function sort(a, b) {
    return a.time - b.time
}

function closest(keyframes, time) {
    var prev = -1
    //get last keyframe to time
    for (var i=keyframes.length-1; i>=0; i--) {
        if (time >= keyframes[i].time) {
            prev = i
            break
        }
    }
    return prev
}

function Keyframes(frames) {
    if (!(this instanceof Keyframes)) 
        return new Keyframes(frames)
    this.frames = frames||[]
    this.sort()
}

//Finds the index of the nearest keyframe to the given time stamp.
//If radius is specified, it will return the nearest only within that radius
Keyframes.prototype.getIndex = function(time, radius) {
    radius = typeof radius === 'number' ? radius : Number.MAX_VALUE
    var minDist = Number.MAX_VALUE
    var nearest = -1
    for (var i=0; i<this.frames.length; i++) {
        var dist = Math.abs(this.frames[i].time - time)
        if (dist < minDist && dist <= radius) {
            minDist = dist
            nearest = i
        }
    }
    return nearest
}

//Gets the keyframe at the index
Keyframes.prototype.get = function(time, radius) {
    var idx = this.getIndex(time, radius)
    return idx === -1 ? null : this.frames[idx]
}

//lerps the value at the specified time stamp
//returns null if no keyframes exist
Keyframes.prototype.value = function(time, ease) {
    if (this.frames.length === 0)
        return null

    var prev = closest(this.frames, time) 

    //start or end keyframes
    if (prev === -1 || prev === this.frames.length-1) {
        if (prev < 0)
            prev = 0
        return this.frames[prev].value
    } 
    else {
        var startFrame = this.frames[prev]
        var endFrame = this.frames[prev+1]

        //clamp and get range
        time = Math.max(startFrame.time, Math.min(time, endFrame.time))
        var t = range(startFrame.time, endFrame.time, time)

        //We ease from left keyframe to right, with a custom easing
        //equation if specified
        if (typeof ease === 'function')
            return ease(startFrame, endFrame, t)

        //Otherwise we assume the values are simple numbers and lerp them
        return lerpNumbers(startFrame.value, endFrame.value, t)
    }
}

Keyframes.prototype.next = function(time, reverse) {
    if (this.frames.length <= 1)
        return null

    var cur = -1
    //get last keyframe to time
    for (var i=0; i<this.frames.length; i++) {
        if (time < this.frames[i].time) {
            cur = i
            break
        }
    }
    console.log(cur)
    return cur===-1 ? null : this.frames[cur]
}

Keyframes.prototype.previous = function(time, reverse) {
    if (this.frames.length <= 1)
        return null

    var cur = -1
    //get last keyframe to time
    for (var i=this.frames.length-1; i>=0; i--) {
        if (time > this.frames[i].time) {
            cur = i
            break
        }
    }
    return cur===-1 ? null : this.frames[cur]
}

//Adds a frame at the given time stamp
Keyframes.prototype.add = function(frame) {
    this.frames.push(frame)
    this.sort()
}

//sorts the keyframes. you should do this after 
//adding new keyframes that are not in linear time
Keyframes.prototype.sort = function() {
    this.frames.sort(sort)
}

module.exports = Keyframes