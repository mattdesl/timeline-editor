module.exports = { 
	name: 'circle',
	controls: [
		{ name: 'position', keyframes: [
			{ time: 0, value: [0, 0] },
			{ time: 2, value: [100, 100], ease: 'bounceOut' },
			{ time: 4, value: [0, 100], ease: 'cubicIn' }
		] },
		{ name: 'alpha', defaultValue: [0.5] }
	]
}