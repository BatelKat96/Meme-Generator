'use strict'

let gElCanvas
let gCtx
let gCurrImgMemeId

function onInit() {
    console.log('in:')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // renderMeme(102)
    console.log('dkkd:')

}


function renderMeme(id) {
    gCurrImgMemeId = id
    // console.log('gCurrImgMemeId:', gCurrImgMemeId)

    const elImg = new Image()
    var meme = getMeme(id)
    console.log('meme1:', meme)

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
        console.log('line:', line)
        console.log('i:', i)
        drawText(line, i)
    })
}


function drawText(obj, lineIdx) {
    // console.log('obj:', obj)
    console.log('lineIdx:', lineIdx)


    var x = gElCanvas.width / 2
    var y = gElCanvas.width / 2
    console.log('y:', y)

    var lineNum = obj.selectedLineIdx
    if (lineIdx === 0) {
        y = 50
    } else if (lineIdx === 1) {
        y = gElCanvas.width - 50
    } else if (lineIdx === 2) {
        x = gElCanvas.width / 2
        y = gElCanvas.width / 2
    } else {
        // x += lineIdx * 18
        y += lineIdx * 15
        console.log('y:', y)
    }
    var text = obj.txt
    console.log('text:', text)

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

function onSetLine(text) {
    setLine(text)
    // drawText(obj, x, y)
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
    setSwitchLine()
    renderMeme(gCurrImgMemeId)
}

function onAddLine() {
    addLine()
    var meme = getMeme(gCurrImgMemeId)
    console.log('meme:', meme)
    renderText()
}