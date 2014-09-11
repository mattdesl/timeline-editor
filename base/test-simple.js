var data = require('./simple')
var group = require('./timeline-group')(data)
var ease = require('./timeline-easing')

require('canvas-testbed')(render)

var time = 0
var dur = group.duration()

var widget = { position: [0, 0], alpha: 1, shape: [50, 50] }

function render(ctx, width, height, dt) {
	time += dt/1000
	if (time >= dur+1)
		time = 0
	ctx.clearRect(0,0, width, height)
	
	//.. the element
	var element = { position: [0, 0], color: [255, 0, 255] }

	//loop through each control..
	// animation.controls.forEach(function(control) {
	// 	//get interpolation at time stamp in timeline
	// 	element[control.name] = control.value(time, easings)
	// })

	ctx.fillStyle = rgbStr( element.color )
	ctx.fillRect( element.position[0], element.position[1], 50)

	//now draw or manipulate CSS values with the properties of widget
 
	// ctx.globalAlpha(widget.alpha)
	// ctx.fillRect(widget.position[0], widget.position[1],
	// 			widget.shape[0], widget.shape[1])
}