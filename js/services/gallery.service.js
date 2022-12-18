'use strict'
const STORAGE_KEYWORDS_KEY = 'keywordsMapDB'
var idNext = 101
var gFilterBy = { search: '' }
// var keys


const gImgs = [
    { id: idNext++, url: './imgs/1.jpg', keywords: ['man', 'angry', 'trump'], alt: 'Donald Trump grumpy' },
    { id: idNext++, url: './imgs/2.jpg', keywords: ['dog', 'cute', 'kiss'], alt: 'Puppies kissing' },
    { id: idNext++, url: './imgs/3.jpg', keywords: ['dog', 'baby', 'sleep'], alt: 'A baby and dog sleeping in bed' },
    { id: idNext++, url: './imgs/4.jpg', keywords: ['sleep', 'cat', 'computer'], alt: 'A cat sleeping on computer' },
    { id: idNext++, url: './imgs/5.jpg', keywords: ['baby', 'angry', 'beach'], alt: 'A determined boy' },
    { id: idNext++, url: './imgs/6.jpg', keywords: ['man', 'explain'], alt: 'An explainer' },
    { id: idNext++, url: './imgs/7.jpg', keywords: ['baby', 'surprised', 'shock'], alt: 'Baby in shock' },
    { id: idNext++, url: './imgs/8.jpg', keywords: ['man', 'listening', 'focus'], alt: 'Man listening' },
    { id: idNext++, url: './imgs/9.jpg', keywords: ['baby', 'laugh', 'conspirator'], alt: 'A baby laughs evilly' },
    { id: idNext++, url: './imgs/10.jpg', keywords: ['man', 'cheers', 'drink'], alt: 'A man make the toast' },
]
var gKeywordsMap



function getImgs() {
    const imgs = gImgs.filter(img => {
        var keys = img.keywords
        if (keys.some(key => key.toLowerCase().includes(gFilterBy.search))) return img
    })
    return imgs
}

function getKeywordsMap() {
    return gKeywordsMap
}


function setImgFilter(txt) {
    if (!txt) return
    gFilterBy = { search: txt }
    if (txt !== undefined) gFilterBy.search = txt
    gKeywordsMap[txt]++
    _saveKeywordsMapToStorage()
    return gFilterBy
}

function _createKeywordsMap() {
    gKeywordsMap = loadFromStorage(STORAGE_KEYWORDS_KEY)

    if (!gKeywordsMap) {
        gKeywordsMap = {}
        gImgs.forEach((img) => {
            var keysWord = img.keywords
            keysWord.forEach(key => {
                if (!gKeywordsMap[key]) gKeywordsMap[key] = 0
                gKeywordsMap[key]++
            })
        })
        _saveKeywordsMapToStorage()
        return gKeywordsMap
    }
}

function _saveKeywordsMapToStorage() {
    saveToStorage(STORAGE_KEYWORDS_KEY, gKeywordsMap)
}
