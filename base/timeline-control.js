//a "control" maintains a set of tweenable values
//for e.g.:
//  position [x, y]
//  color [r, g, b, a]
//  alpha [a]

var keyframes = require('keyframes')

var DEFAULT_TYPE = 'array'

//Changing the playhead will update this control's value.
function Control(data) {
	if (!(this instanceof Control)) 
		return new Control(data)

	this.keyframes = keyframes()
	this.value = null
	this.type = DEFAULT_TYPE
	this.name = ''
	if (data)
		this.load(data)
}

Control.prototype.dispose = function() {
	this.keyframes.clear()
}

//updates displayed value based on playhead position
Control.prototype.load = function(data) {
	this.dispose()

	if (!data)
		return
	
	this.name = data.name
	this.type = typeof data.type === 'string' ? data.type : DEFAULT_TYPE
	this.value = data.value
	if (data.keyframes)
		this.keyframes.frames = data.keyframes
}

Control.prototype.interpolate = function(time, ease) {
	if (this.keyframes.count === 0)
		return this.value
	return this.keyframes.value(time, ease)
}

module.exports = Control