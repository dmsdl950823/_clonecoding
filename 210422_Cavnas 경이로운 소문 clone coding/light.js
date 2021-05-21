class Particle {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.radius = 1.5
        this.speed = Math.random() * 3 + 0.5
    }

    draw () {
        cm.context.beginPath()
        cm.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        cm.context.fill()
    }
}

class Line {
    constructor (index, x, y) {
        this.index = index
        this.x = x
        this.y = y
        this.height = 300

        // particle defined
        this.particles = []
        for (let i = 0; i < 30; i++) {
            const particles = new Particle(this.x, this.y)
            this.particles.push(particles)
        }        
    }

    draw () {
        // line draw
        cm.context.beginPath()
        cm.context.moveTo(this.x, this.y)
        cm.context.lineTo(this.x, this.y - this.height)
        cm.context.stroke()

        /**
         * Line Color
         */
        // line color setting
        const gradientStartY = cm.canvasHeight - (this.height + (cm.canvasHeight - this.y))
        this.gradient = cm.context.createLinearGradient(
            0, gradientStartY, // from
            0, this.y // to
        )
        this.gradient.addColorStop(0, `rgba(${cm.colors[this.index][2]}, 0)`)
        this.gradient.addColorStop(0.2, `rgba(${cm.colors[this.index][1]}, 0.5)`)
        this.gradient.addColorStop(1, `rgba(${cm.colors[this.index][0]}, 1)`)

        cm.context.strokeStyle = this.gradient

        /**
         * Particle Color
         */
        // particle color setting
        this.gradient = cm.context.createLinearGradient(
            0, gradientStartY, // from
            0, this.y // to
        )
        this.gradient.addColorStop(0, `rgba(${cm.colors2[this.index][2]}, 0)`)
        this.gradient.addColorStop(0.2, `rgba(${cm.colors2[this.index][1]}, 0.5)`)
        this.gradient.addColorStop(1, `rgba(${cm.colors2[this.index][0]}, 1)`)

        cm.context.fillStyle = this.gradient

        // particle draw
        let particle
        for (let i = 0; i < this.particles.length; i++) {
            particle = this.particles[i]
            particle.y -= particle.speed
            // once a particle reach to the top, it comes back 0 height again.
            if (particle.y < this.y - this.height) {
                particle.y = this.y
            }
            particle.draw()
        }
    }
}

class Light {
    /**
     * @param index
     * @param {Number} x mouse clientX
     * @param {Number} y mouse clientY
     */
    constructor (index, x, y) {
        this.index = index
        this.x = x
        this.y = y
        this.yForOrder = this.y
        this.width = 20 // line width
        this.height = 300 // line height

        this.lines = []
        // store 5 lines (in one click)
        for (let i = 0; i < 5; i++) {
            const linePosition = (Math.random() * this.width + (this.width * 0.5)) + this.x
            this.lines.push(new Line(index, linePosition, this.y))
        }

    }

    draw () {
        // draw each line
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i]
            line.draw()
        }
    }
}