var lerp = require('lerp-array')

var easings = {
	cubicIn: function(t) {
		return t * t * t
	},
	linear: function(t) {
		return t
	},
	expoOut: function(t) {
		return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
	},
	bounceOut: function(t) {
		var a = 4.0 / 11.0
		var b = 8.0 / 11.0
		var c = 9.0 / 10.0

		var ca = 4356.0 / 361.0
		var cb = 35442.0 / 1805.0
		var cc = 16061.0 / 1805.0

		var t2 = t * t

		return t < a
			? 7.5625 * t2
			: t < b 
			  ? 9.075 * t2 - 9.9 * t + 3.4
			  	: t < c
			  	  ? ca * t2 - cb * t + cc
				  : 10.8 * t * t - 20.52 * t + 10.72
	}
}

//For optimization:
//Keyframes easing functions could be cached

module.exports = function(frame1, frame2, t) {
	var easeFunc = frame2.ease
	if (easeFunc) { //ease the time
		t = easings[easeFunc](t)
	}

	return lerp(frame1.value, frame2.value, t)
}

module.exports.easings = easings