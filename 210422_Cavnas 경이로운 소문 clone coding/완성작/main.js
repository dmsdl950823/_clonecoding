

const cm = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0,
    playedFrame: 0,
    colors: [
        '222, 35, 18', // red
        '238, 150, 63',
        '246, 228, 0',
        '110, 210, 70',
        '65, 145, 255',
        '185, 22, 226'
    ],
    colors2: [
        '255, 160, 150',
        '255, 200, 150',
        '255, 250, 180',
        '195, 255, 170',
        '200, 220, 255',
        '239, 173, 255'
    ],
    charactorSrc: {
        somun: './images/sprite-somun.png',
        ji: './images/sprite-ji.png',
        bg: './images/BG City.jpg'
    }
}

function init () {

    cm.canvas = document.querySelector('#the-canvas')
    cm.context = cm.canvas.getContext('2d')
    const canvasContainer = document.querySelector('.canvas-container')
    // const dpr = window.devicePixelRatio > 1 ? 2 : 1 // 고해상도 처리 :: 6 분에 설명
    const dpr = 1
    const mouse = { x: 0, y: 0 } // 마우스 위치 저장
    const lights = []
    const charactors = []
    const allItems = []
    let indexOfLight = 0
    
    // 💋💋💋💋
    // 캔버스 사이즈 설정
    function setSize () {
        cm.canvasWidth = canvasContainer.clientWidth
        cm.canvasHeight = canvasContainer.clientHeight
        cm.canvas.width = cm.canvasWidth
        cm.canvas.height = cm.canvasHeight
        if (dpr > 1) cm.context.scale(dpr, dpr)
    }

    // 🤦‍♀️
    function setCharactors () {
        const somun = new Charactor(
            cm.charactorSrc.somun,
            'underAttack',
            (cm.canvasWidth * 0.5) - 256 + 64,
            (cm.canvasHeight * 0.5) - 64
        )
        const ji = new Charactor(
            cm.charactorSrc.ji,
            'attack',
            (cm.canvasWidth * 0.5) - 64,
            (cm.canvasHeight * 0.5) - 64
        )

        charactors.push(somun)
        charactors.push(ji)

        for (let i = 0; i < charactors.length; i++) {
            allItems.push(charactors[i])
        }
        // console.log(allItems)
    }


    function setup () {
        setSize()
        setCharactors()
        draw()
    }

    // 🤦‍♀️
    function setZOrder () {
        // 버블 정렬 - sorting
        let temp
        for (let i = 0; i < allItems.length; i++) {
            for (let j = 0; j < allItems.length - i; j++) {
                if (j < allItems.length - 1) {
                    if (allItems[j].yForOrder > allItems[j + 1].yForOrder) {
                        temp = allItems[j]
                        allItems[j] = allItems[j + 1]
                        allItems[j + 1] = temp
                    }
                }
            }
        }

        console.log(allItems)
    }

    // 요소 추가
    function draw () {
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight)

        // let light
        // let charactor
        // 🤦‍♀️
        let item
        let scaleRatio

        for (let i = 0; i < allItems.length; i++) {
            item = allItems[i]
            if (item instanceof Charactor) {
                // item.draw() // 주석 😢
            } else {
                scaleRatio = item.y / cm.canvasHeight + 1
                
                cm.context.save()
                cm.context.translate(item.x, item.y)
                cm.context.scale(scaleRatio, scaleRatio)
                cm.context.translate(-item.x, -item.y)
                item.draw()
                cm.context.restore()
            }
        }

        // for (let i = 0; i < charactors.length; i++) {
        //     charactor = charactors[i]
        //     charactor.draw()
        // }

        // for (let i = 0; i < lights.length; i++) {
        //     light = lights[i]
        //     scaleRatio = light.y / cm.canvasHeight + 1
        //     cm.context.save()
        //     cm.context.translate(light.x, light.y)
        //     cm.context.scale(scaleRatio, scaleRatio)
        //     cm.context.translate(-light.x, -light.y)
        

        //     light.draw()
        //     cm.context.restore()
        // }

        cm.playedFrame++
        if (cm.playedFrame > 1000000) {
            cm.playedFrame = 0
        }

        requestAnimationFrame(draw)
    }
    
    cm.canvas.addEventListener('click', function (e) {
        if (indexOfLight >= cm.colors.length) return
        
        mouse.x = e.clientX - cm.canvas.getBoundingClientRect().left
        mouse.y = e.clientY - cm.canvas.getBoundingClientRect().top

        const light = new Light (indexOfLight, mouse.x, mouse.y)
        lights.push(light)
        allItems.push(light)

        indexOfLight++

        if (indexOfLight >= cm.colors.length) {
            charactors[0].updateAction('attack')
            charactors[1].updateAction('underAttack')
        }

        setZOrder()
    })

    window.addEventListener('resize', setSize)
    window.addEventListener('load', setup)
}

init()