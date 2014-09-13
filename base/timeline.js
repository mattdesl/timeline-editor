var Group = require('./timeline-group')
var Easings = require('./timeline-easings')

//low level timeline util which assumes nothing about values/etc
function Timeline(opt) {
	if (!(this instanceof Timeline)) 
		return new Timeline(opt)
	opt = opt||{}

	this.groups = []

	if (opt.data)
		this.load(opt.data)
}

function indexOfName(list, name) {
	for (var i=0; i<list.length; i++)
		if (list[i].name === name)
			return i
	return -1
}


Timeline.prototype.dispose = function(data) {
	this.groups.length = 0
}

Timeline.prototype.load = function(data) {
	this.dispose()
	if (data && data.groups)  {
		this.groups = data.groups.map(function(group) {
			return new Group(group)
		})
	}
}

Timeline.prototype.ease = function(frame1, frame2, alpha) {
	
}

Timeline.prototype.duration = function() {
	var maxTime = 0
	this.traverse(function(group, control) {
		var frames = control.keyframes.frames
		for (var i=0; i<frames.length; i++) {
			maxTime = Math.max(frames[i].time, maxTime)
		}
	})
	return maxTime
}

//Returns the first group by the specified name or index
Timeline.prototype.group = function(name) {
	var idx = typeof name === 'number' ? name : indexOfName(this.groups, name)
	return idx<0 ? undefined : this.groups[idx]
}

//Traverses each control node in this timeline
Timeline.prototype.traverse = function(callback) {
	if (typeof callback !== 'function')
		throw new Error(callback+" is not a function")
	for (var i=0; i<this.groups.length; i++) {
		var group = this.groups[i]
		if (group.controls) {
			for (var j=0; j<group.controls.length; j++) {
				var control = group.controls[j]
				callback(group, control)
			}
		}
	}
}

module.exports = Timeline