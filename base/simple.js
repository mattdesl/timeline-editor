module.exports = { 
	name: 'circle',
	controls: [
		{ name: 'position', keyframes: [
			{ time: 0, value: [0, 0] },
			{ time: 2, value: [100, 100], ease: 'bounceOut' },
			{ time: 4, value: [0, 100], ease: 'cubicIn' }
		] },
		{ name: 'color', type: 'array', keyframes: [
			{ time: 0, value: [255, 255, 255] },
			{ time: 2, value: [255, 189, 120], ease: 'cubicIn' },
			{ time: 3, value: [100, 189, 100] }
		] },
		{ name: 'alpha', defaultValue: [0.5] }
	]
}