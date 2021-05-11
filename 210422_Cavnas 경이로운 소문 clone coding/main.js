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
 * 초기 캔버스 세팅
 */
function init () {
    cm.canvas = document.querySelector('#the-canvas')
    cm.context = cm.canvas.getContext('2d')
    const lights = []

    // 캔버스 세팅
    const setUp = () => {
        setCanvasSize()
        draw()
    }

    // 클릭 이벤트
    cm.canvas.addEventListener('click', e => {
        const mouse = { x: 0, y: 0 }
        mouse.x = e.clientX - cm.canvas.getBoundingClientRect().left
        mouse.y = e.clientY - cm.canvas.getBoundingClientRect().top

        const light = new Light(mouse.x, mouse.y)
        lights.push(light)
    })

    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('load', setUp)

    // draw 메서드
    function draw () {
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight)
        
        for (let i = 0; i < lights.length; i++) {
            const light = lights[i]
            light.draw()
        }
        
        // frame 마다 darw() 메서드를 호출합니다.
        requestAnimationFrame(draw)
    }
}

init()