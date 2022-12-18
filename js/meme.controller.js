'use strict'

let gElCanvas
let gCtx
let gCurrImgMemeId

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    _createKeywordsMap()
    createDataList()
    renderSearchWords()
    addListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme(gCurrImgMemeId)
    })
}



function renderMeme(id) {
    gCurrImgMemeId = id
    const elImg = new Image()
    var meme = getMeme(id)
    elImg.src = meme.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
    }
}

function renderLines() {
    var lines = getMeme(gCurrImgMemeId).lines
    var selectedLineIdx = getMeme(gCurrImgMemeId).selectedLineIdx
    lines.forEach((line, i) => {
        drawText(line)
        if (i === selectedLineIdx) drawRect(getMeme(gCurrImgMemeId).lines[i])
    })
}

function drawText(obj) {

    if (!obj.x) obj.x = gElCanvas.width / 2
    var x = obj.x
    var y = obj.y
    var text = obj.txt
    var fontSize = obj.size + 'px'
    var fontFamily = obj.fontFamily
    var color = obj.color
    var strokeColor = obj.strokeColor
    var font = `${fontSize} ${fontFamily}`
    var align = obj.align

    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = font
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onMoveLine(diff) {
    moveLine(diff)
    renderMeme(gCurrImgMemeId)
}
function onSetLine(ev) {
    var elLine = ev.target.value
    setLine(elLine)
    renderMeme(gCurrImgMemeId)
}

function onSetSwitchLine() {
    var numLine = setSwitchLine()
    var elEditLine = document.querySelector('input[name="text"]')
    renderMeme(gCurrImgMemeId)
    elEditLine.value = getMeme(gCurrImgMemeId).lines[numLine].txt
}

function onAddLine() {
    renderLines()
    var numLine = addLine()
    var elEditLine = document.querySelector('input[name="text"]')
    document.querySelector('input[name="text"]').focus()
    elEditLine.value = getMeme(gCurrImgMemeId).lines[numLine].txt
    renderLines()
}

function onRemoveLine(ev) {
    ev.stopPropagation()
    if (confirm('Do you want to delete this line? ')) {
        removeLine()
        renderMeme(gCurrImgMemeId)
    }
}

function onSetFontSize(diff) {
    setFontSize(diff)
    renderMeme(gCurrImgMemeId)
}

function onAlignText(diff) {
    alignText(diff)
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

function onChangeFontFamily(font) {
    changeFontFamily(font)
    renderMeme(gCurrImgMemeId)
}




function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function drawRect(obj) {
    var x = obj.x
    var y = obj.y
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - gElCanvas.width / 2 + 10, y - 30, gElCanvas.width - 20, 60)
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}
