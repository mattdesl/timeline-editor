var Control = require('./timeline-control')

function indexOfName(list, name) {
	for (var i=0; i<list.length; i++)
		if (list[i].name === name)
			return i
	return -1
}

//A Group contains multiple controls
function Group(data) {
	if (!(this instanceof Group)) 
		return new Group(data)

	this.name = undefined
	this.controls = []

	if (data)
		this.load(data)
}

Group.prototype.dispose = function() {
	this.controls.forEach(function(c) {
		c.dispose()
	})
	this.controls.length = 0 
}

Group.prototype.duration = function() {
	var maxTime = 0
	for (var j=0; j<this.controls.length; j++) {
		var control = this.controls[j]
		var frames = control.keyframes.frames
		for (var i=0; i<frames.length; i++) 
			maxTime = Math.max(frames[i].time, maxTime)
	}
	return maxTime
}

//Returns the first control by the specified name or index
Group.prototype.control = function(name) {
	var idx = typeof name === 'number' ? name : indexOfName(this.groups, name)
	return idx<0 ? undefined : this.controls[idx]
}

//updates displayed value based on playhead position
Group.prototype.load = function(data) {
	this.dispose()

	if (!data || !data.controls)
		return

	this.name = data.name
	this.controls = data.controls.map(function(c) {
		return new Control(c)
	})
}

module.exports = Group