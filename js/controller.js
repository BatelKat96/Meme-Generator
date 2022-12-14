'use strict'
let gElCanvas
let gCtx

function onInit() {
    console.log('in:')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log(gCtx);

    renderMeme(102)
}

