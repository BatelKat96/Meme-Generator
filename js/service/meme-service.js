'use strict'

var idNext = 101
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Hello',
            size: '50',
            align: 'center',
            color: 'white',
            strokeColor: '',
            fontFamily: 'Impact'
        }


    ]
}

var gImgs = [
    { id: idNext++, url: './imgs/1.jpg', keywords: ['man', 'angry'], alt: 'Donald Trump grumpy' },
    { id: idNext++, url: './imgs/2.jpg', keywords: ['dog', 'cute'], alt: 'Puppies kissing' },
    { id: idNext++, url: './imgs/3.jpg', keywords: ['dog', 'baby'], alt: 'A baby and dog sleeping in bed' },
    { id: idNext++, url: './imgs/4.jpg', keywords: ['sleep', 'cat'], alt: 'A cat sleeping on computer' }
]


function getImgs() {
    return gImgs
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
function setSwitchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)

}

function addLine() {
    var newLine = _createLine()
    // console.log('newLine:', newLine)
    gMeme.lines.push(newLine)
    // console.log('gMeme:', gMeme)
    // console.log('gMeme:', gMeme.lines.length - 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    return (gMeme.lines.length - 1)
}


function _createLine() {
    var line = {
        txt: '" "',
        size: '50',
        align: 'center',
        color: 'white',
        strokeColor: '',
        fontFamily: 'Impact'
    }
    return line
}