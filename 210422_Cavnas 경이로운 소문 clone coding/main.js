const cm = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0,
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
    ]
}

function init () {

    cm.canvas = document.querySelector('#the-canvas')
    cm.context = cm.canvas.getContext('2d')
    const canvasContainer = document.querySelector('.canvas-container')
    // const dpr = window.devicePixelRatio > 1 ? 2 : 1 // 고해상도 처리 :: 6 분에 설명
    const dpr = 1
    const mouse = { x: 0, y: 0 } // 마우스 위치 저장
    const lights = []
    let indexOfLight = 0
    
    // 캔버스 사이즈 설정
    function setSize () {
        cm.canvasWidth = canvasContainer.clientWidth
        cm.canvasHeight = canvasContainer.clientHeight
        cm.canvas.width = cm.canvasWidth
        cm.canvas.height = cm.canvasHeight
        if (dpr > 1) cm.context.scale(dpr, dpr)
    }

    function setup () {
        setSize()
        draw()
    }

    // 요소 추가
    function draw () {
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight)

        for (let i = 0; i < lights.length; i++) {
            lights[i].draw()
        }

        requestAnimationFrame(draw)
    }
    
    cm.canvas.addEventListener('click', function (e) {
        if (indexOfLight >= cm.colors.length) return
        
        mouse.x = e.clientX - cm.canvas.getBoundingClientRect().left
        mouse.y = e.clientY - cm.canvas.getBoundingClientRect().top

        const light = new Light (indexOfLight, mouse.x, mouse.y)
        lights.push(light)

        indexOfLight++
    })

    window.addEventListener('resize', setSize)
    window.addEventListener('load', setup)
}

init()