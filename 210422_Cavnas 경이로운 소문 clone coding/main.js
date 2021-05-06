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

function draw () {
    console.log('drawing...')
    // frame 마다 darw() 메서드를 호출합니다.
    requestAnimationFrame(draw)
}

/**
 * 초기 캔버스 세팅
 */
function init () {
    cm.canvas = document.querySelector('#the-canvas')
    cm.context = cm.canvas.getContext('2d')

    // 캔버스 세팅
    const setUp = () => {
        setCanvasSize()
        draw()
    }

    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('load', setUp)
}

init()