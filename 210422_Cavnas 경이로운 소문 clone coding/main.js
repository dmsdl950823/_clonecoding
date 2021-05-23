const cm = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0,
    playedFrame: 0,
    colors: [
        ['222, 35, 18', '255, 158, 2', '239, 255, 2'], // red
        ['238, 150, 63', '238, 235, 63', '635, 238, 63'],
        ['246, 228, 0', '189, 246, 0', '98, 227, 0'],
        ['110, 210, 70', '0, 168, 106', '0, 153, 168'],
        ['65, 145, 255', '97, 0, 209', '143, 0, 163'],
        ['185, 22, 226', '226, 22, 210', '226, 22, 135']
    ],
    colors2: [
        ['255, 160, 150', '255, 208, 150', '253, 255, 150'],
        ['255, 200, 150', '255, 237, 150', '247, 255, 150'],
        ['255, 250, 180', '245, 255, 180', '222, 255, 180'],
        ['195, 255, 170', '180, 255, 185', '180, 255, 222'],
        ['200, 220, 255', '200, 208, 255', '211, 200, 255'],
        ['239, 173, 255', '255, 149, 240', '255, 176, 210']
    ],
    charactorImg: {
        somun: './images/sprite-somun.png',
        ji: './images/sprite-ji.png',
        bg: './images/BG City.jpg'
    }
}


/**
 * window 사이즈가 변경될 때마다 캔버스의 사이즈 및 비율을 설정합니다.
 */
function setCanvasSize () {
    const canvasContainer = document.querySelector('.canvas-container')
    const dpr = 1
    // const dpr = window.devicePixelRatio > 1 ? 2 : 1 // 고해상도 설정

    cm.canvasWidth = canvasContainer.clientWidth
    cm.canvasHeight = canvasContainer.clientHeight

    cm.canvas.width = cm.canvasWidth
    cm.canvas.height = cm.canvasHeight

    // canvas 해상도, 비율 설정
    if (dpr > 1) cm.context.scale(dpr, dpr)
}

/**
 * 버블 정렬 (순서 정의)
 * @param {Array} items allItems 
 */
function setZOrder (items) {
    let temp
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (j < items.length - 1) {
                if (items[j].yForOrder > items[j + 1].yForOrder) {
                    temp = items[j]
                    items[j] = items[j + 1]
                    items[j + 1] = temp
                }
            }
        }
    }
    return items
}

/**
 * 초기 캔버스 세팅
 */
function init () {
    cm.canvas = document.querySelector('#the-canvas')
    cm.context = cm.canvas.getContext('2d')
    const lights = []
    const charactors = []
    const allItems = []
    let indexOfLight = 0

    // 캔버스 세팅
    const setUp = () => {
        setCanvasSize()
        draw()
        setCharactors()
    }

    // 캐릭터 생성
    function setCharactors () {
        const somun = new Charactor(
            cm.charactorImg.somun,
            'underAttack',
            (cm.canvasWidth * 0.5) - 256 + 64,
            (cm.canvasHeight * 0.5) - 64
        )
        const ji = new Charactor(
            cm.charactorImg.ji,
            'attack',
            (cm.canvasWidth * 0.5) - 64,
            (cm.canvasHeight * 0.5) - 64
        )

        charactors.push(somun)
        charactors.push(ji)

        charactors.forEach(charactor => {
            allItems.push(charactor)
        })
    }

    // 클릭 이벤트
    cm.canvas.addEventListener('click', e => {
        const mouse = { x: 0, y: 0 }
        mouse.x = e.clientX - cm.canvas.getBoundingClientRect().left
        mouse.y = e.clientY - cm.canvas.getBoundingClientRect().top

        indexOfLight++
        if (indexOfLight === cm.colors.length) indexOfLight = 0

        if (indexOfLight >= 5) {
            charactors[0].updateAction('attack')
            charactors[1].updateAction('underAttack')
        }

        const light = new Light(indexOfLight, mouse.x, mouse.y)
        lights.push(light)
        allItems.push(light)

        setZOrder(allItems)
        console.log(allItems)
    })

    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('load', setUp)

    // draw 메서드
    function draw () {
        
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight)

        // // light draw
        // for (let i = 0; i < lights.length; i++) {
        //     const light = lights[i]
        //     light.draw()
        // }

        // // charactor draw
        // for (let i = 0; i < charactors.length; i++) {
        //     const charactor = charactors[i]
        //     charactor.draw()
        // }

        // light, charactor draw
        let item
        let scaleRatio

        allItems.forEach(item => {
            if (item instanceof Charactor) item.draw()
            else {
                // 멀리있을수록 line 의 너비를 작게 그립니다
                scaleRatio = item.y / cm.canvasHeight + 1

                cm.context.save()
                cm.context.translate(item.x, item.y)
                cm.context.scale(scaleRatio, scaleRatio)
                cm.context.translate(-item.x, -item.y)
                item.draw()
                cm.context.restore()
            }
        })


        cm.playedFrame++
        if (cm.playedFrame > 1000000) {
            cm.playedFrame = 0
        }
        
        // frame 마다 darw() 메서드를 호출합니다.
        requestAnimationFrame(draw)
    }
}

init()