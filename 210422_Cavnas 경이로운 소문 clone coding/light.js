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
        this.angle = 0

        this.lines = []
        // store 5 lines (in one click)
        for (let i = 0; i < 5; i++) {
            const linePosition =  this.x + (Math.random() * this.width - (this.width * 0.5))
            this.lines.push(new Line(index, linePosition, this.y))
        }

        this.gradient = cm.context.createLinearGradient(
            0, cm.canvasHeight - (this.height + (cm.canvasHeight - this.y)),
            0, this.y
        )
        this.gradient.addColorStop(1, `rgba(${cm.colors[index][1]}, 0.8)`)
        this.gradient.addColorStop(0.5, `rgba(${cm.colors[index][1]}, 0.5)`)
        this.gradient.addColorStop(0, `rgba(${cm.colors[index][1]}, 0)`)
    }

    draw () {
        // blur around lines 
        cm.context.fillStyle = this.gradient
        cm.context.strokeStyle = this.gradient
        
        const abs = Math.abs(Math.sin(this.angle * Math.PI / 180 * 30)) * 3

        cm.context.save()
        cm.context.filter = 'blur(20px)'
        
        // blink ellipse effect 1
        cm.context.beginPath()
        cm.context.ellipse(
            this.x, this.y,
            this.width * 2 + abs,
            this.width * 0.5 + abs,
            0, 0, Math.PI * 2
        )
        cm.context.fill()
        this.angle ++
        if (this.angle === 80) this.angle = 0

        // blink ellipse effect 2
        cm.context.filter = 'blur(15px)'
        cm.context.beginPath()
        cm.context.ellipse(
            this.x,
            this.y,
            this.width + abs,
            this.width * 0.25 + abs,
            0, 0, Math.PI * 2
        )
        cm.context.fill()
        
        // pillar
        cm.context.fillRect(
            this.x - this.width * 0.5,
            cm.canvasHeight - (this.height + (cm.canvasHeight - this.y)),
            this.width,
            this.height
        )

        cm.context.restore()


        // draw each line
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i]
            line.draw()
        }
    }
}