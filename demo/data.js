module.exports = [
    { 
        name: 'box', visible: true, solo: false, locked: false, 
        controls: [
            { name: 'position', enabled: true, type: 'vec2',
            keyframes: [
                { timestamp: 0.2, value: [0, 0] },
                { timestamp: 0.9, value: [100, 100] }
            ] },
            { name: 'size', enabled: true, type: 'vec2' },
            { name: 'opacity', enabled: true, type: 'float', options: { min: 0, max: 1, decimals: 2, step: 0.01 } }
        ]
    },

    { 
        name: 'shape fill', visible: true, solo: false, locked: false, 
        controls: [
            { name: 'size', enabled: true, type: 'vec2' }
        ]
    }

    // { 
    //     name: 'text', visible: true, solo: false, locked: false, 
    //     controls: [
    //         { name: 'size', enabled: true, type: 'vec2' }
    //     ]
    // }
]