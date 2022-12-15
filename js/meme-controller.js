'use strict'

let gElCanvas
let gCtx
let gCurrImgMemeId

function onInit() {
    console.log('in:')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    addListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme(gCurrImgMemeId)
    })
}

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }


function renderMeme(id) {
    gCurrImgMemeId = id
    const elImg = new Image()
    var meme = getMeme(id)

    elImg.src = meme.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}

function renderText() {
    var memeLines = getMeme(gCurrImgMemeId).lines
    var selectedLineIdx = getMeme(gCurrImgMemeId).selectedLineIdx
    memeLines.forEach((line, i) => {
        drawText(line, i)
        if (i === selectedLineIdx) drawRect(getMeme(gCurrImgMemeId).lines[i])
    })
}

function drawText(obj, lineIdx) {
    var x = gElCanvas.width / 2
    var y = gElCanvas.width / 2


    if (lineIdx === 0) {
        y = 50
    } else if (lineIdx === 1) {
        y = gElCanvas.width - 50

    } else if (lineIdx === 2) {
        x = gElCanvas.width / 2
        y = gElCanvas.width / 2
    } else {
        y += lineIdx * 15
    }

    obj.x = x
    obj.y = y
    // console.log('obj:', obj)
    // console.log('getMeme(gCurrImgMemeId):', getMeme(gCurrImgMemeId))

    var text = obj.txt
    var fontSize = obj.size + 'px'
    var fontFamily = obj.fontFamily
    var color = obj.color
    var strokeColor = obj.strokeColor
    var font = `${fontSize} ${fontFamily}`

    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = font
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLine(ev) {
    var elLine = ev.target.value
    setLine(elLine)
    renderMeme(gCurrImgMemeId)
}

function onSetColorText(color) {
    setColorText(color)
    renderMeme(gCurrImgMemeId)
}
function onSetColorStroke(color) {
    setColorStroke(color)
    renderMeme(gCurrImgMemeId)
}

function onSetFontSize(diff) {
    setFontSize(diff)
    renderMeme(gCurrImgMemeId)
}
function onSetSwitchLine() {
    var numLine = setSwitchLine()
    var elEditLine = document.querySelector('input[name="text"]')
    renderMeme(gCurrImgMemeId)
    elEditLine.value = getMeme(gCurrImgMemeId).lines[numLine].txt
}


function onAddLine() {
    renderText()
    var numLine = addLine()
    var elEditLine = document.querySelector('input[name="text"]')
    document.querySelector('input[name="text"]').focus()
    elEditLine.value = getMeme(gCurrImgMemeId).lines[numLine].txt
    renderText()
}

function drawRect(obj) {
    var x = obj.x
    var y = obj.y
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - gElCanvas.width / 2 + 10, y - 30, gElCanvas.width - 20, 60)
}