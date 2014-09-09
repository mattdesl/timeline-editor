function Keyframe(opt) {
    opt = opt||{}

    this.time = opt.time || 0
    this.value = opt.value
}
module.exports = Keyframe