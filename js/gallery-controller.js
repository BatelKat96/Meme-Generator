'use strict'
var isShow


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
    document.querySelector('.' + isShow + '-section').hidden = true
    document.querySelector('.' + msg + '-nav').classList.add('active')
    document.querySelector('.' + msg + '-section').hidden = false
    isShow = msg
}

function onSearch(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="search-txt"]')
    const txt = elTxt.value.toLowerCase()
    onSetFilterBy(txt)
    renderGallery()
}


function onSetFilterBy(filterBy) {
    filterBy = setImgFilter(filterBy)
    renderSearchWords()
    renderGallery()
}


function renderSearchWords() {
    var keywordsMap = getKeywordsMap()
    console.log(':', keywordsMap)

    var keys = Object.keys(keywordsMap)
    var values = Object.values(keywordsMap)
    var strHTML = keys.map((key, i) => {
        var size = 16 + values[i] + 'px'
        return `
        <span class="${key}-key keys" data-trans="${key}" data-key="${key}" onclick="onSetFilterBy(dataset.key)" style="font-size:${size}" > ${key}</span>
        `
    })
    var elSearchWords = document.querySelector('.search-words')
    // console.log(':', elSearchWords)
    elSearchWords.innerHTML = strHTML.join('')

}

function onShowMore() {
    var elSearchWords = document.querySelector('.search-words')
    elSearchWords.classList.toggle('show-more')
    // elSearchWords.style.overflow = 'visible'

}


function createDataList() {
    var keywordsMap = getKeywordsMap()
    // console.log('keywordsMap:', keywordsMap)
    var keys = Object.keys(keywordsMap)
    console.log('values:', keys)

    var strHTML = keys.map(key => {
        return `
        <option value="${key}"></option>
        `
    })


    console.log('strHTML:', strHTML)

    var elDatalist = document.querySelector('#keywordsList')
    console.log('elDatalist:', elDatalist)

    elDatalist.innerHTML = strHTML.join('')
    // document.getElementById('#keywordsList').innerHTML = strHTML.join('')
}