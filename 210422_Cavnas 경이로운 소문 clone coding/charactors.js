class Charactor {
    constructor (imgSrc, action, x, y) {
        this.width = 256
        this.height = 256
        this.action = action,
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = imgSrc
    }

    setAction () {

    }

    draw () {
    }
}