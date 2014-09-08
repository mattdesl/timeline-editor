function Keyframe(opt) {
    opt = opt||{}

    this.time = opt.time || 0
    this.value = opt.value
    this.ease = opt.ease // a function
}
module.exports = Keyframe