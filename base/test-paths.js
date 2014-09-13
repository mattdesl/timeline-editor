var data = require('./data')
var group = require('./timeline-group')(data)
var arrayEase = require('./timeline-easing')
var rgba = require('color-style')
var lerp = require('lerp-array')
var drawPath = require('path-illustrator-client/draw-path')

require('canvas-testbed')(render)

var time = 0
var dur = group.duration()

var widget = { 
	path: null, 
	rgb: [ 0, 0, 0 ], 
	// shape: [50, 50] 
}


function lerpPath(path1, path2, t) {
	if (path1.points.length !== path2.points.length
		|| path1.closed !== path2.closed)
		throw new Error('paths must be parallel')

	var out = { closed: path1.closed, points: new Array(path1.points.length) }
	for (var i=0; i<path1.points.length; i++) {
		var p1 = path1.points[i]
		var p2 = path2.points[i]

		out.points[i] = { 
			curve: p1.curve, 
			position: lerp(p1.position, p2.position, t),
			controls: [
				lerp(p1.controls[0], p2.controls[0], t),
				lerp(p1.controls[1], p2.controls[1], t)
			]
		}
	}
	return out
}

var eases = {
	array: arrayEase,
	path: function path(frame1, frame2, t) {
		var easeFunc = frame2.ease
		if (easeFunc) { //ease the time
			t = arrayEase.easings[easeFunc](t)
		}
		
		return lerpPath(frame1.value, frame2.value, t)
	}
}

require('dom-events').on(window, 'click', function(ev) {
	time = 0
})

function path(ctx, widget) {
	ctx.fillStyle = rgba(widget.fill)	
	ctx.lineWidth = widget.edge
	ctx.strokeStyle = rgba(widget.stroke)	
	ctx.globalAlpha = widget.alpha[0]
	
	ctx.beginPath()
	if (widget.path)
		drawPath(ctx, widget.path)
	ctx.closePath()
}

function render(ctx, width, height, dt) {
	dt = Math.max(dt, 30)

	time += dt/1000
	if (time >= dur+1)
		time = 0
	ctx.clearRect(0,0, width, height)
	ctx.save()

	group.controls.forEach(function(control) {
		var ease = eases[control.type]
		var val = control.interpolate(time, ease)

		widget[control.name] = val
	})
	ctx.font = "16px 'Helvetica', sans-serif"
	ctx.fillText('click to animate', 10, 20)

	path(ctx, widget)
	ctx.fill()
	ctx.clip()

	var chrs = widget.textchr[0]
	var str = 'hello, world'
	str = str.substring(0, Math.min(str.length, ~~(chrs*str.length)))
		
	var size = widget.textSize[0]
	ctx.font = size+"px 'Helvetica', sans-serif"

	ctx.fillStyle = 'rgba(0,0,0,0.25)'
	ctx.globalAlpha = widget.textAlpha[0]
	ctx.fillText(str, widget.text2[0], widget.text2[1])

	ctx.fillStyle = 'white'
	ctx.fillText(str, widget.text[0], widget.text[1])
	ctx.restore()

	path(ctx, widget)
	ctx.stroke()
}



