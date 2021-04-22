const cm = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0
}

function init () {

    cm.canvas = document.querySelector('#the-canvas')
    cm.context = cm.canvas.getContext('2d')
    const canvasContainer = document.querySelector('.canvas-container')
    // const dpr = window.devicePixelRatio > 1 ? 2 : 1 // 고해상도 처리 :: 6 분에 설명
    const dpr = 1

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
    const line = new Line(100, 400)

    function draw () {
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight)

        line.draw()
        requestAnimationFrame(draw)
    }

    window.addEventListener('resize', setSize)
    window.addEventListener('load', setup)
}

init()