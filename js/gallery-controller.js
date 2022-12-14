'use strict'


renderGallery()
function renderGallery() {
    var imgs = getImgs()

    var strHTML = imgs.map(img => {
        return `
        <div>
        <img onclick="onImgSelect(${img.id})" src="${img.url}" alt="${img.alt}">
        </div>
        `

    })

    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML.join('')
}



function onImgSelect(id) {
    renderMeme(id)
}