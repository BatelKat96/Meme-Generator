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
            strokeColor: '',
            fontFamily: 'Impact'
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

function setSwitchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    return gMeme.selectedLineIdx
}

function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    console.log('gMeme:', gMeme)
    return (gMeme.lines.length - 1)

}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function setColorText(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setColorStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFontSize(diff) {
    if (diff > 0) gMeme.lines[gMeme.selectedLineIdx].size++
    else gMeme.lines[gMeme.selectedLineIdx].size--
}


function alignText(diff) {
    console.log(':', gMeme.lines[gMeme.selectedLineIdx])

    if (diff > 0) {
        gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    } else if (diff < 0) {
        gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    } else {
        gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    }

}
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
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
        strokeColor: '',
        fontFamily: 'Impact'
    }
    return line
}