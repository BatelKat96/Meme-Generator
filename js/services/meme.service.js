'use strict'

var gLineId = 0
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            lineId: gLineId++,
            txt: '" "',
            size: '50',
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            fontFamily: 'Impact',
            y: 50
        }
    ]
}


function getMeme(id) {
    var meme = gImgs.find(img => img.id === id)
    gMeme.selectedImgId = meme.id
    gMeme.url = meme.url
    return gMeme
}

function setLine(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}


function moveLine(diff) {
    if (diff > 0) {
        gMeme.lines[gMeme.selectedLineIdx].y++
    } else {
        gMeme.lines[gMeme.selectedLineIdx].y--
    }
}

function setSwitchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    return gMeme.selectedLineIdx
}

function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[gMeme.selectedLineIdx].y = 50
    }
    else if (gMeme.selectedLineIdx === 1) {
        gMeme.lines[gMeme.selectedLineIdx].y = gElCanvas.width - 50
    } else if (gMeme.selectedLineIdx === 2) {
        gMeme.lines[gMeme.selectedLineIdx].y = gElCanvas.width / 2
    } else {
        gMeme.lines[gMeme.selectedLineIdx].y = gElCanvas.width / 2 + gMeme.selectedLineIdx * 15
    }
    return (gMeme.lines.length - 1)

}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function setFontSize(diff) {
    if (diff > 0) gMeme.lines[gMeme.selectedLineIdx].size++
    else gMeme.lines[gMeme.selectedLineIdx].size--
}

function alignText(diff) {
    if (diff > 0) {
        gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    } else if (diff < 0) {
        gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    } else {
        gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    }

}

function setColorStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setColorText(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font
}



function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            onSuccess(url)
        })
}

function _createLine() {
    var line = {
        lineId: gLineId++,
        txt: '" "',
        size: '50',
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        fontFamily: 'Impact',
        x: gElCanvas.width / 2
    }
    return line
}