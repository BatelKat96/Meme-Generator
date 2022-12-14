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
    // console.log('meme1:', meme)

    elImg.src = meme.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme, gElCanvas.width / 2, 50)
    }
}



function drawText(obj, x, y) {
    // console.log('obj:', obj)
    var lineNum = obj.selectedLineIdx
    var text = obj.lines[lineNum].txt
    var fontSize = obj.lines[lineNum].size
    var fontFamily = obj.lines[lineNum].fontFamily
    var font = `${fontSize} ${fontFamily}`


    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = font
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLine(text) {
    setLine(text)
    renderMeme(gCurrImgMemeId)
}