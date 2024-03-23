// ==UserScript==
// @name         Groove Kolor Podziału
// @version      1.0
// @description  Zmienia kolor podziału łupu, w zależności od rangi przedmiotu
// @author       Rojvu
// @match        https://grooove.pl/*/item-*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grooove.pl
// @grant        none
// ==/UserScript==

!function () {
    let divideCatchers = document.querySelectorAll('.divide.catcher')

    let itemsMap = new Map()

    document.querySelectorAll('.loot.col-md-3 a.itemborder img').forEach((item) => {
        let dataStats = item.getAttribute('data-stats')
        if (dataStats) {
            let statsArray = dataStats.split('||')
            let name = statsArray[0]
            let stats = statsArray[1].split(';').reduce((acc, curr) => {
                const [key, value] = curr.split('=')
                acc[key] = value
                return acc
            }, {})

            itemsMap.set(name, stats)
        }
    })

    divideCatchers.forEach((element) => {
        let item = element.firstChild
        if (item && item.nodeType === Node.TEXT_NODE && item.textContent.trim()) {
            let itemName = item.textContent.trim()
            let stats = itemsMap.get(itemName)
            if (stats) {
                let span = document.createElement('span')
                switch (stats.rarity) {
                    case 'unique':
                        span.style.color = '#fffb00'
                        break
                    case 'heroic':
                        span.style.color = '#38b8eb'
                        break
                    case 'upgraded':
                        span.style.color = '#ff59af'
                        break
                    case 'legendary':
                        span.style.color = '#ff8400'
                        break
                }
                span.textContent = itemName + ' '
                element.replaceChild(span, item)
            } else {
                console.log(`Stats not found for item: ${itemName}`)
            }
        } else {
            console.log('Item or its text content is undefined or empty.')
        }
    })

}()