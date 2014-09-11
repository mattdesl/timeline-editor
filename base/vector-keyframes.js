//At its core, we are just manipulating arrays. 
// 	color [ r, g, b, a ]
//  position [ x, y ]
//  alpha [ a ]

//Some of them may need a custom ease function, 
//e.g. color which tweens in HSV space.
//Animation run-times will want to use that function as well
//Some will be manipulated entirely outside of the timeline. 
//	e.g. 2D paths and 3D verts
//no type, assume array


layers: [
	{ 
		name: 'shape',
		controls: [
			{ name: 'fill', keyframes: [
				{ time: 0, value: [255, 255, 255], ease: 'quint' },
				{ time: 2, value: [255, 189, 120], ease: 'myEase' },
				{ time: 3, value: [100, 189, 100] }
			] },
			//this is a custom type, e.g. something that works with path-illustrator
			{ name: 'path', type: 'path', keyframes: [
				{ time: 1, value: [ [...] ] }, 
				{ time: 2, value: [ [...] ] }  
			] }
		]
	},
	{ 
		name: 'funky-box1',
		controls: [
			{ name: 'background-color', keyframes: [
				{ time: 0, value: [255, 255, 255], ease: 'quint' },
				{ time: 2, value: [255, 189, 120], ease: 'myEase' },
				{ time: 3, value: [100, 189, 100] }
			] },
			{ name: 'opacity', keyframes: [
				{ time: 1, value: [0] },   //floats are treated as arrays too
				{ time: 2, value: [1.0] }  
			] }
		]
	},
	{
		//e.g. a physics based particle scene, but with some controls
		//exposed to the designers
		name: 'particle-explosion',
		controls: [
			{ name: 'explode', keyframes: [
				{ time: 0, value: [0], ease: 'myEase' },
				{ time: 0, value: [100] },
			] },
			{ name: 'gravity', value: [0, -10, 0] }
		]
	}
]


//Additional GUI stuff:
//	- controls can be hidden/exposed to designer
//	- controls can be locked/unlocked
//	- controls can be editable/uneditable
//	- controls can be keyframmable-or-not (e.g. constants that should not change)

// api
var timeline = new Timeline(data)
timeline.playhead(250) //updates all controls' values

//traverses each control in the timeline
//this would be done every frame to update say a CSS value
timeline.traverse(function(layer, control) {
	//application-specific
	if (control.type === 'path') {
		widgets[layer.name].setPath(control.value)
		return
	}

	//e.g. 'background-color' => { 'background-color': rgba(255,155,155) }
	//	   'position' => { 'left': '0px', 'top': '5px' }
	widgets[layer.name].css( mapCSS(control.name, control.value) )
})