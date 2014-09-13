var data = require('./simple')
var group = require('./timeline-group')(data)
var ease = require('./timeline-easing')

require('canvas-testbed')(render)

var time = 0
var dur = group.duration()

var widget = { position: [0, 0], alpha: [1], shape: [50, 50] }

function render(ctx, width, height, dt) {
	time += dt/1000
	if (time >= dur+1)
		time = 0
	ctx.clearRect(0,0, width, height)

	group.controls.forEach(function(control) {
		widget[control.name] = control.value(time, ease)
	})

	ctx.globalAlpha = widget.alpha[0]
	ctx.fillRect(widget.position[0], widget.position[1],
				widget.shape[0], widget.shape[1])
}