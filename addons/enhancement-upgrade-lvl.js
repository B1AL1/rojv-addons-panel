(function () {
    let rojvAddonMenuLocalStorage = JSON.parse(localStorage.getItem('rojvAddonMenu'))
    let addonName = 'enhancement-upgrade-lvl'
    const style = document.createElement('style')
    style.innerHTML = `
        [enhancement-upgrade-lvl] {
            position: relative;
            float: right;
            padding-right: 2px;
            font-size: 10px;
        }
        [enhancement-upgrade-lvl="1"] {
            color: ${rojvAddonMenuLocalStorage.addons[addonName].settings['enhancement-upgrade-lvl-1'].value} !important;
        }
        [enhancement-upgrade-lvl="2"] {
            color: ${rojvAddonMenuLocalStorage.addons[addonName].settings['enhancement-upgrade-lvl-2'].value} !important;
        }
        [enhancement-upgrade-lvl="3"] {
            color: ${rojvAddonMenuLocalStorage.addons[addonName].settings['enhancement-upgrade-lvl-3'].value} !important;
        }
        [enhancement-upgrade-lvl="4"] {
            color: ${rojvAddonMenuLocalStorage.addons[addonName].settings['enhancement-upgrade-lvl-4'].value} !important;
        }
        [enhancement-upgrade-lvl="5"] {
            color: ${rojvAddonMenuLocalStorage.addons[addonName].settings['enhancement-upgrade-lvl-5'].value} !important;
        }
        [enhancement-upgrade-lvl]>p {
            text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;
        }
    `
    document.head.appendChild(style)

    const _itemsAfterUpdate = Engine.items.afterUpdate
    Engine.items.afterUpdate = (items, loc) => {
        _itemsAfterUpdate(items, loc)
        let locationItems = Engine.items.fetchLocationItems(Object.keys(loc)[0])
        for (let i in items) {
            items[i].parsedStats = typeof items[i].stat == 'string' ? items[i].parsedStats = items[i].stat.split(';').reduce((acc, curr) => {
                const [key, value] = curr.split('=')
                acc[key] = value
                return acc
            }, {}) : items[i].stat
            if (items[i].parsedStats?.enhancement_upgrade_lvl > 0) {
                let locationItem = locationItems.find((item) => item.hid == items[i].hid)
                if ($(`.item-id-${locationItem.id}>.enhancement-upgrade`).attr(`enhancement-upgrade-lvl`)) {
                    $(`.item-id-${locationItem.id}>.enhancement-upgrade`).attr(`enhancement-upgrade-lvl`, items[i].parsedStats.enhancement_upgrade_lvl)
                    $(`.item-id-${locationItem.id}>.enhancement-upgrade`).html(`<p>+${items[i].parsedStats.enhancement_upgrade_lvl}</p>`)
                } else {
                    $(`.item-id-${locationItem.id}`).append(`<div class="enhancement-upgrade" enhancement-upgrade-lvl="${items[i].parsedStats.enhancement_upgrade_lvl}"><p>+${items[i].parsedStats.enhancement_upgrade_lvl}</p></div>`)
                }
            }
        }
    }
})()