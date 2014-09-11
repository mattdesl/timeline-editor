module.exports = { 
	name: 'shape',
	controls: [
		{ name: 'rgb', type: 'array', keyframes: [
			{ time: 0, value: [255, 255, 255] },
			{ time: 2, value: [255, 189, 120], ease: 'cubicIn' },
			{ time: 3, value: [100, 189, 100] }
		] },
		//this is a custom type, e.g. something that works with path-illustrator
		{ name: 'path', type: 'path', keyframes: [
			{ time: 1, value: [ [150, 100], [25, 25], [50, 15] ] }, 
			{ time: 2, value: [ [150, 100], [15, 25], [55, 150] ], ease: 'bounceOut' }  
		] }
	]
}