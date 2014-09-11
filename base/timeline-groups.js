var Group = require('./timeline-group')

//low level timeline util which assumes nothing about values/etc
function Groups(data) {
	if (!(this instanceof Timeline)) 
		return new Timeline(data)
	this.groups = []

	if (data)
		this.load(data)
}

function indexOfName(list, name) {
	for (var i=0; i<list.length; i++)
		if (list[i].name === name)
			return i
	return -1
}

Timeline.prototype.load = function(data) {
	this.groups.length = 0

	if (data && data.groups)  {
		this.groups = data.groups.map(function(layer) {
			return new Layer(layer)
		})
	}
}

Timeline.prototype.ease = function(frame1, frame2, alpha) {
	//The first frame dictates the easing function. 
	
}

Timeline.prototype.duration = function() {
	var maxTime = 0
	this.traverse(function(layer, control) {
		var frames = control.keyframes.frames
		for (var i=0; i<frames.length; i++) {
			maxTime = Math.max(frames[i].time, maxTime)
		}
	})
	return maxTime
}

//Returns the first layer by the specified name or index
Timeline.prototype.layer = function(name) {
	var idx = typeof name === 'number' ? name : indexOfName(this.groups, name)
	return idx<0 ? undefined : this.groups[idx]
}

Timeline.prototype.traverse = function(callback) {
	if (typeof callback !== 'function')
		throw new Error(callback+" is not a function")
	for (var i=0; i<this.groups.length; i++) {
		var layer = this.groups[i]
		if (layer.controls) {
			for (var j=0; j<layer.controls.length; j++) {
				var control = layer.controls[j]
				callback(layer, control)
			}
		}
	}
}

module.exports = Timeline