'use strict'

var idNext = 101
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Hello',
            size: '50px',
            align: 'left',
            color: 'red',
            fontFamily: 'Impact'
        }
    ]
}

var gImgs = [
    { id: idNext++, url: '././imgs/1.jpg', keywords: ['man', 'angry'], alt: 'Donald Trump grumpy' },
    { id: idNext++, url: '././imgs/2.jpg', keywords: ['dog', 'cute'], alt: 'Puppies kissing' },
    { id: idNext++, url: '././imgs/3.jpg', keywords: ['dog', 'baby'], alt: 'A baby and dog sleeping in bed' },
    { id: idNext++, url: '././imgs/4.jpg', keywords: ['sleep', 'cat'], alt: 'A cat sleeping on computer' }
];

function getImgs() {
    return gImgs
}

// console.log('getMeme(id):', getMeme(103))


function getMeme(id) {
    var meme = gImgs.find(img => img.id === id)
    gMeme.selectedImgId = meme.id
    gMeme.url = meme.url

    return gMeme
}

function setLine(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    return gMeme
}