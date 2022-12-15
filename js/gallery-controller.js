'use strict'
var isShow

renderGallery()
function renderGallery() {
    var imgs = getImgs()

    var strHTML = imgs.map(img => {
        return `
        <div>
        <img  class="img-gallery" onclick="onImgSelect(${img.id})" src="${img.url}" alt="${img.alt}">
        </div>
        `
    })

    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML.join('')
}


function onImgSelect(id) {
    document.querySelector('.meme-section').hidden = false
    document.querySelector('.about-section').hidden = true
    document.querySelector('.gallery-section').hidden = true
    document.querySelector('.gallery-nav').classList.remove('active')
    document.querySelector('.meme-nav').classList.add('active')
    isShow = 'meme'
    resizeCanvas()
    renderMeme(id)
    console.log('isShow:', isShow)
}

function onChangeLayut(msg) {
    document.querySelector('.' + isShow + '-nav').classList.remove('active')
    // console.log(' document.querySelector( + isShow +', document.querySelector('.' + isShow + '-nav'))
    document.querySelector('.' + isShow + '-section').hidden = true
    // console.log('document.querySelector( + isShow + -section):', document.querySelector('.' + isShow + '-section'))
    document.querySelector('.' + msg + '-nav').classList.add('active')
    document.querySelector('.' + msg + '-section').hidden = false
    isShow = msg

}