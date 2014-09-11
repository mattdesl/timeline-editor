var data = require('./data')
var group = require('./timeline-group')(data)
var arrayEase = require('./timeline-easing')
var rgba = require('color-style')
var lerp = require('lerp-array')

require('canvas-testbed')(render)

var time = 0
var dur = group.duration()

var widget = { 
	path: [ [50, 0], [25, 25], [15, 15] ], 
	rgb: [ 0, 0, 0 ], 
	// shape: [50, 50] 
}

var out = [ [0,0], [0,0], [0,0] ]

var eases = {
	array: arrayEase,
	path: function path(frame1, frame2, t) {
		var easeFunc = frame2.ease
		if (easeFunc) { //ease the time
			t = arrayEase.easings[easeFunc](t)
		}

		for (var i=0; i<frame1.value.length; i++) 
			lerp(frame1.value[i], frame2.value[i], t, out[i])
		return out
	}
}

function render(ctx, width, height, dt) {
	time += dt/1000
	if (time >= dur+1)
		time = 0
	ctx.clearRect(0,0, width, height)


	group.controls.forEach(function(control) {
		var ease = eases[control.type]
		var val = control.value(time, ease)

		widget[control.name] = val
	})

	ctx.strokeStyle = rgba(widget.rgb)	
	ctx.beginPath()
	ctx.moveTo(widget.path[0][0], widget.path[0][1])
	ctx.quadraticCurveTo(
				widget.path[1][0], widget.path[1][1],
				widget.path[2][0], widget.path[2][1])
	ctx.lineWidth = 5
	ctx.stroke()
}