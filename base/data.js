module.exports = { 
	name: 'shape',
	controls: [
		{ name: 'text', keyframes: [
			{ time: 0.0, value: [100,160] },
			{ time: 1.1, ease: 'expoOut', value: [148,185] },
		] },
		{ name: 'text2', keyframes: [
			{ time: 0.0, value: [110,180] },
			{ time: 1.1, ease: 'expoOut', value: [149,186] },
		] },
		{ name: 'textAlpha', keyframes: [
			{ time: 1.8, value: [1] },
			{ time: 2.0, value: [0] },
		] },
		{ name: 'textSize', keyframes: [
			{ time: 0.0, value: [80] },
			{ time: 1.0, ease: 'expoOut', value: [26] },
		] },
		{ name: 'textchr', keyframes: [
			{ time: 0.0, value: [0] },
			{ time: 0.25, value: [1] },
		] },
		{ name: 'alpha', keyframes: [
			{ time: 2.8, value: [1] },
			{ time: 3.1, value: [0] },
		] },
		{ name: 'edge', keyframes: [
			{ time: 0.5, value: 8 },
			{ time: 1.5, ease: 'expoOut', value: 2 },
			{ time: 2, ease: 'expoOut', value: 2 },
			{ time: 4, ease: 'expoOut', value: 0 },
		] },
		{ name: 'fill', keyframes: [
			{ time: 0, value: [255, 255, 100] },
			{ time: 1, ease: 'expoOut', value: [180, 120, 190] },
			{ time: 2.0, ease: 'expoOut', value: [180, 120, 190] },
			{ time: 3, ease: 'expoOut', value: [200, 200, 200] }
		] },
		{ name: 'stroke', keyframes: [
			{ time: 0, value: [0, 0, 120] },
			{ time: 2, ease: 'expoOut', value: [0, 0, 0] },
		] },
		//this is a custom type, e.g. something that works with path-illustrator
		{ name: 'path', type: 'path', keyframes: [
			{ time: 0, value: {"points":[{"position":[156,212],"controls":[[233,183],[79,241]],"curve":false},{"position":[149,141],"controls":[[17,7],[17,7]],"curve":false},{"position":[293,145],"controls":[[0,9],[0,9]],"curve":false},{"position":[293,213],"controls":[[-2,-5],[-2,-5]],"curve":false},{"position":[270,215],"controls":[[3,-4],[3,-4]],"curve":false},{"position":[248,217],"controls":[[-13,-14],[-13,-14]],"curve":false},{"position":[229,217],"controls":[[-17,-5],[-17,-5]],"curve":false}],"closed":true}  },
			{ time: 0.5, ease: 'expoOut', value: {"points":[{"position":[138,221],"controls":[[215,192],[61,250]],"curve":false},{"position":[122,129],"controls":[[-10,-5],[-10,-5]],"curve":false},{"position":[297,137],"controls":[[4,1],[4,1]],"curve":false},{"position":[300,219],"controls":[[5,1],[5,1]],"curve":false},{"position":[266,226],"controls":[[-1,7],[-1,7]],"curve":false},{"position":[258,242],"controls":[[-3,11],[-3,11]],"curve":false},{"position":[239,227],"controls":[[-7,5],[-7,5]],"curve":false}],"closed":true} },
			{ time: 1.0, ease: 'expoOut', value: {"points":[{"position":[125,225],"controls":[[202,196],[48,254]],"curve":false},{"position":[106,125],"controls":[[-26,-9],[-26,-9]],"curve":false},{"position":[307,119],"controls":[[14,-17],[14,-17]],"curve":false},{"position":[303,228],"controls":[[8,10],[8,10]],"curve":false},{"position":[266,231],"controls":[[-1,12],[-1,12]],"curve":false},{"position":[262,253],"controls":[[1,22],[1,22]],"curve":false},{"position":[244,229],"controls":[[-2,7],[-2,7]],"curve":false}],"closed":true} },
			{ time: 2, ease: 'expoOut', value: {"points":[{"position":[125,225],"controls":[[202,196],[48,254]],"curve":false},{"position":[106,125],"controls":[[-26,-9],[-26,-9]],"curve":false},{"position":[307,119],"controls":[[14,-17],[14,-17]],"curve":false},{"position":[303,228],"controls":[[8,10],[8,10]],"curve":false},{"position":[266,231],"controls":[[-1,12],[-1,12]],"curve":false},{"position":[262,253],"controls":[[1,22],[1,22]],"curve":false},{"position":[244,229],"controls":[[-2,7],[-2,7]],"curve":false}],"closed":true} },
			{ time: 2.8, ease: 'expoOut', value: {"points":[{"position":[125,225],"controls":[[202,196],[48,254]],"curve":false},{"position":[124,225],"controls":[[-8,91],[-8,91]],"curve":false},{"position":[303,224],"controls":[[10,88],[10,88]],"curve":false},{"position":[303,225],"controls":[[8,7],[8,7]],"curve":false},{"position":[274,225],"controls":[[7,6],[7,6]],"curve":false},{"position":[260,224],"controls":[[-1,-7],[-1,-7]],"curve":false},{"position":[242,224],"controls":[[-4,2],[-4,2]],"curve":false}],"closed":true} },
			// { time: 3.5, ease: 'expoOut', value: {"points":[{"position":[242,225],"controls":[[319,196],[165,254]],"curve":false},{"position":[239,225],"controls":[[107,91],[107,91]],"curve":false},{"position":[278,225],"controls":[[-15,89],[-15,89]],"curve":false},{"position":[279,227],"controls":[[-16,9],[-16,9]],"curve":false},{"position":[274,225],"controls":[[7,6],[7,6]],"curve":false},{"position":[260,224],"controls":[[-1,-7],[-1,-7]],"curve":false},{"position":[254,225],"controls":[[8,3],[8,3]],"curve":false}],"closed":true}  }
		] }
		// { name: 'path', type: 'path', keyframes: [
		// 	{ time: 0, value: {"points":[{"position":[132,128],"controls":[[128,134],[136,122]],"curve":true},{"position":[258,125],"controls":[[254,117],[262,133]],"curve":true},{"position":[260,137],"controls":[[264,134],[256,140]],"curve":true},{"position":[236,138],"controls":[[0,0],[0,0]],"curve":false},{"position":[224,140],"controls":[[-1,-10],[-1,-10]],"curve":false},{"position":[213,140],"controls":[[0,0],[0,0]],"curve":false},{"position":[131,138],"controls":[[137,145],[125,131]],"curve":true}],"closed":true}   },
		// 	{ time: .5, ease: 'expoOut', value: {"points":[{"position":[132,87],"controls":[[128,93],[136,81]],"curve":true},{"position":[254,86],"controls":[[250,78],[258,94]],"curve":true},{"position":[260,137],"controls":[[264,134],[256,140]],"curve":true},{"position":[236,138],"controls":[[0,0],[0,0]],"curve":false},{"position":[234,160],"controls":[[9,10],[9,10]],"curve":false},{"position":[213,140],"controls":[[0,0],[0,0]],"curve":false},{"position":[131,138],"controls":[[137,145],[125,131]],"curve":true}],"closed":true} },
		// 	{ time: 1.5, ease: 'bounceOut', value: {"points":[{"position":[155,79],"controls":[[134,93],[176,65]],"curve":true},{"position":[261,77],"controls":[[231,50],[291,104]],"curve":true},{"position":[266,133],"controls":[[276,124],[256,142]],"curve":true},{"position":[236,138],"controls":[[0,0],[0,0]],"curve":false},{"position":[234,160],"controls":[[9,10],[9,10]],"curve":false},{"position":[213,140],"controls":[[0,0],[0,0]],"curve":false},{"position":[146,136],"controls":[[162,151],[130,121]],"curve":true}],"closed":true}  },
		// 	{ time: 2.5, ease: 'expoOut', value: {"points":[{"position":[189,98],"controls":[[176,110],[202,86]],"curve":true},{"position":[242,94],"controls":[[224,84],[260,104]],"curve":true},{"position":[250,128],"controls":[[252,123],[248,133]],"curve":true},{"position":[236,138],"controls":[[0,0],[0,0]],"curve":false},{"position":[220,142],"controls":[[-5,-8],[-5,-8]],"curve":false},{"position":[206,141],"controls":[[-7,1],[-7,1]],"curve":false},{"position":[183,131],"controls":[[190,141],[176,121]],"curve":true}],"closed":true}  },
		// 	{ time: 3, ease: 'expoOut', value: {"points":[{"position":[204,105],"controls":[[201,108],[207,102]],"curve":true},{"position":[242,104],"controls":[[238,102],[246,106]],"curve":true},{"position":[260,143],"controls":[[263,141],[257,145]],"curve":true},{"position":[235,155],"controls":[[-1,17],[-1,17]],"curve":false},{"position":[223,145],"controls":[[221,139],[225,151]],"curve":false},{"position":[212,157],"controls":[[-1,17],[-1,17]],"curve":false},{"position":[187,143],"controls":[[191,147],[183,139]],"curve":true}],"closed":true}   },
		// ] }
		// { name: 'path', type: 'path', keyframes: [
		// 	{ time: 0, value: {"points":[{"position":[191,140],"controls":[[183,140],[199,140]],"curve":true},{"position":[268,141],"controls":[[270,136],[266,146]],"curve":true},{"position":[118,144],"controls":[[125,149],[111,139]],"curve":true}],"closed":true}   },
		// 	{ time: 1, ease: 'expoOut', value: {"points":[{"position":[190,82],"controls":[[182,82],[198,82]],"curve":true},{"position":[268,141],"controls":[[270,136],[266,146]],"curve":true},{"position":[118,144],"controls":[[125,149],[111,139]],"curve":true}],"closed":true}   },
		// 	{ time: 2, ease: 'expoOut', value: {"points":[{"position":[190,82],"controls":[[181,63],[199,101]],"curve":true},{"position":[232,143],"controls":[[242,142],[222,144]],"curve":true},{"position":[118,144],"controls":[[116,154],[120,134]],"curve":true}],"closed":true}   },
		// 	{ time: 3, ease: 'bounceOut', value: {"points":[{"position":[190,82],"controls":[[163,60],[217,104]],"curve":true},{"position":[188,165],"controls":[[230,148],[146,182]],"curve":true},{"position":[124,110],"controls":[[118,153],[130,67]],"curve":true}],"closed":true}  },
		// ] }
	]
}







