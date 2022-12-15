'use strict'

let gElCanvas
let gCtx
let gCurrImgMemeId

function onInit() {
    console.log('in:')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderMeme(id) {
    gCurrImgMemeId = id
    const elImg = new Image()
    var meme = getMeme(id)
    // console.log('meme1:', meme)

    elImg.src = meme.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}
function renderText() {
    var memeLines = getMeme(gCurrImgMemeId).lines
    console.log('meme2222:', memeLines)
    memeLines.forEach((line, i) => {
        drawText(line, i)
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
    elEditLine.value = getMeme(gCurrImgMemeId).lines[numLine].txt
    renderMeme(gCurrImgMemeId)
}

function onAddLine() {
    var numLine = addLine()
    var elEditLine = document.querySelector('input[name="text"]')
    elEditLine.value = getMeme(gCurrImgMemeId).lines[numLine].txt
    renderText()
}