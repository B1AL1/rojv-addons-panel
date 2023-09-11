(function () {
    // const style = document.createElement('style')
    // style.innerHTML = `
    //     [enhancement-upgrade-lvl] {
    //         position: relative;
    //         float: right;
    //         padding-right: 2px;
    //         font-size: 10px;
    //     }

    //     [enhancement-upgrade-lvl="1"] {
    //         color: #9da1a7 !important;
    //     }

    //     [enhancement-upgrade-lvl="2"] {
    //         color: #fffb00 !important;
    //     }

    //     [enhancement-upgrade-lvl="3"] {
    //         color: #38b8eb !important;
    //     }

    //     [enhancement-upgrade-lvl="4"] {
    //         color: #ff59af !important;
    //     }

    //     [enhancement-upgrade-lvl="5"] {
    //         color: #ff8400 !important;
    //     }

    //     [enhancement-upgrade-lvl]>p {
    //         text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;
    //     }
    // `
    // document.head.appendChild(style)

    // const _itemsAfterUpdate = Engine.items.afterUpdate
    // Engine.items.afterUpdate = (items, loc) => {
    //     _itemsAfterUpdate(items, loc)
    //     let locationItems = Engine.items.fetchLocationItems(Object.keys(loc)[0])
    //     for (let i in items) {
    //         items[i].parsedStats = typeof items[i].stat == 'string' ? items[i].parsedStats = items[i].stat.split(';').reduce((acc, curr) => {
    //             const [key, value] = curr.split('=')
    //             acc[key] = value
    //             return acc
    //         }, {}) : items[i].stat
    //         if (items[i].parsedStats?.enhancement_upgrade_lvl > 0) {
    //             let locationItem = locationItems.find((item) => item.hid == items[i].hid)
    //             if ($(`.item-id-${locationItem.id}>.enhancement-upgrade`).attr(`enhancement-upgrade-lvl`)) {
    //                 $(`.item-id-${locationItem.id}>.enhancement-upgrade`).attr(`enhancement-upgrade-lvl`, items[i].parsedStats.enhancement_upgrade_lvl)
    //                 $(`.item-id-${locationItem.id}>.enhancement-upgrade`).html(`<p>+${items[i].parsedStats.enhancement_upgrade_lvl}</p>`)
    //             } else {
    //                 $(`.item-id-${locationItem.id}`).append(`<div class="enhancement-upgrade" enhancement-upgrade-lvl="${items[i].parsedStats.enhancement_upgrade_lvl}"><p>+${items[i].parsedStats.enhancement_upgrade_lvl}</p></div>`)
    //             }
    //         }
    //     }
    // }

    // const interface = (function () {
    //     if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
    //         return 'new'
    //     } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
    //         return 'old'
    //     }
    // })()

    // if (interface == 'new') {

    // } else if (interface == 'old') {

    // }

    // const _items = new Set()

    // const parseInput = window.parseInput
    // window.parseInput = (data, callback) => {
    //     parseInput(data, callback)
    //     console.log(data)
    //     console.log(g.item)
    //     if (data.hasOwnProperty("item")) {
    //         for (let i in data.item) {
    //             data.item[i].parsedStats = typeof data.item[i].stat == 'string' ? data.item[i].parsedStats = data.item[i].stat.split(';').reduce((acc, curr) => {
    //                 const [key, value] = curr.split('=')
    //                 acc[key] = value
    //                 return acc
    //             }, {}) : data.item[i].stat
    //             _items.add(data.item[i])
    //             if (data.item[i].parsedStats?.enhancement_upgrade_lvl > 0) {
    //                 console.log(`div#item${data.item[i].id}`)
    //                 if ($(`#item${data.item[i].id}`).attr(`enhancement-upgrade-lvl`)) {
    //                     $(`div#item${data.item[i].id}>.enhancement-upgrade`).attr(`enhancement-upgrade-lvl`, data.item[i].parsedStats.enhancement_upgrade_lvl)
    //                     $(`div#item${data.item[i].id}>.enhancement-upgrade`).html(`<p>+${data.item[i].parsedStats.enhancement_upgrade_lvl}</p>`)
    //                 } else {
    //                     $(`div#item${data.item[i].id}`).append(`<div class="enhancement-upgrade" enhancement-upgrade-lvl="${data.item[i].parsedStats.enhancement_upgrade_lvl}"><p>+${data.item[i].parsedStats.enhancement_upgrade_lvl}</p></div>`)
    //                 }
    //             }
    //         }
    //     }
    // }

    // const itemProxyHandler = {
    //     set(...args) {
    //         const ret = Reflect.set(...args)
    //         const [object, property] = args
    //         console.log(object, property)
    //         return ret
    //     },
    // }

    // window.hero = new Proxy(hero.proxy, heroProxyHandler)



    // const _finishStep = g.gameLoader.finishStep
    // g.gameLoader.finishStep = (step) => {
    //     console.log(step)
    //     //_finishStep(step)
    // }



    // const addEnhancementUpgradeLvl = (items) => {
    //     items.forEach(item => {
    //         if (item.parsedStats?.enhancement_upgrade_lvl > 0) {
    //             if (!$(`.item-id-${item.id}>div`).hasClass(`enhancement-upgrade-lvl-${item.parsedStats.enhancement_upgrade_lvl}`)) {
    //                 $(`.item-id-${item.id}`).append(`<div class="enhancement-upgrade-lvl-${item.parsedStats.enhancement_upgrade_lvl}"><p>+${item.parsedStats.enhancement_upgrade_lvl}</p></div>`)
    //             }
    //         }
    //     })
    // }


    // const _items = new Set()

    // const parseJSON = Engine.communication.parseJSON
    // Engine.communication.parseJSON = (data, ...args) => {
    // if (typeof data.item !== 'undefined') {
    //     for (var i in data.item) {
    //         data.item[i].parsedStats = typeof data.item[i].stat == 'string' ? data.item[i].parsedStats = data.item[i].stat.split(';').reduce((acc, curr) => {
    //             const [key, value] = curr.split('=')
    //             acc[key] = value
    //             return acc
    //         }, {}) : data.item[i].stat
    //         if (data.item[i].parsedStats?.enhancement_upgrade_lvl) {
    //             _items.add(data.item[i])
    //         }
    //     }
    // }
    // if (data.hasOwnProperty("chat")) {
    //     for (let channel in data.chat.channels) {
    //         let messages = data.chat.channels[channel].msg
    //         messages?.forEach((message) => {
    //             if (message.code?.includes('TPL')) {
    //                 let itemTplSplit = message.code.substring(message.code.lastIndexOf('TPL'), message.code.lastIndexOf(':')).split('#')
    //                 _g(`chat&getContent=${itemTplSplit[0]}%23${itemTplSplit[1]}`, (e) => {
    //                     let item = e.item_tpl[itemTplSplit[1]]
    //                     item.stat = item.stat?.split(';').reduce((acc, curr) => {
    //                         const [key, value] = curr.split('=')
    //                         acc[key] = value
    //                         return acc
    //                     }, {})
    //                     const htmlMessages = document.querySelectorAll(`.linked-chat-item`)
    //                     htmlMessages.forEach((message) => {
    //                         if (message.innerText.includes(item.name)) {
    //                             message.classList.add(`linked-chat-item-rarity-${item.stat.rarity}`)
    //                         }
    //                     })
    //                 })
    //             } else if (message.msg?.includes('ITEM#')) {
    //                 let messageCopy = message.msg
    //                 while (messageCopy.includes('ITEM#')) {
    //                     let itemTplSplit = messageCopy.substring(messageCopy.lastIndexOf('ITEM'), messageCopy.lastIndexOf(':')).split('#')
    //                     _g(`chat&getContent=${itemTplSplit[0]}%23${itemTplSplit[1]}`, (e) => {
    //                         let item = {}
    //                         for (let i in e.item) {
    //                             if (e.item[i].hid == itemTplSplit[1]) {
    //                                 item = e.item[i]
    //                             }
    //                         }
    //                         item.stat = item.stat?.split(';').reduce((acc, curr) => {
    //                             const [key, value] = curr.split('=')
    //                             acc[key] = value
    //                             return acc
    //                         }, {})
    //                         const htmlMessages = document.querySelectorAll(`.linked-chat-item`)
    //                         htmlMessages.forEach((message) => {
    //                             if (message.innerText.includes(item.name)) {
    //                                 message.classList.add(`linked-chat-item-rarity-${item.stat.rarity}`)
    //                             }
    //                         })
    //                     })
    //                     messageCopy = messageCopy.replace(`ITEM#${itemTplSplit[1]}:`, '')
    //                 }
    //             }
    //         })
    //     }
    // }
    //     parseJSON.apply(Engine.communication, [data, ...args])
    // }

    // const _items = new Set()

    // const _dispatcherOnItem = Engine.communication.dispatcher.on_item
    // Engine.communication.dispatcher.on_item = (items) => {
    //     for (const item in items) {
    //         _items.add(items[item])
    //     }
    //     return _dispatcherOnItem(items)
    // }

    // const _messages = Engine.chatLinkedItemsManager.parseReceiveMessageWithLinkedItem
    // Engine.chatLinkedItemsManager.parseReceiveMessageWithLinkedItem = (message, e, i) => {
    //     let messages = _messages(message, e, i)
    //     if (message.includes('TPL')) {
    //         _items.forEach((item) => {
    //             if (message.includes(item.name)) {
    //                 messages.forEach((msg) => {
    //                     if (msg[0].className.includes('linked-chat-item')) {
    //                         if (msg[0].innerText.includes(item.name)) {
    //                             item.stat = typeof item.stat == 'string' ? item.stat = item.stat.split(';').reduce((acc, curr) => {
    //                                 const [key, value] = curr.split('=')
    //                                 acc[key] = value
    //                                 return acc
    //                             }, {}) : item.stat
    //                             msg.addClass(`linked-chat-item-rarity-${item.stat.rarity}`)
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //     } else if (message.includes('ITEM#')) {
    //         let messageCopy = message
    //         while (messageCopy.includes('ITEM#')) {
    //             let itemName = messageCopy.substring(messageCopy.lastIndexOf('"', messageCopy.lastIndexOf('"') - 1) + 1, messageCopy.lastIndexOf('"'))
    //             let itemHid = messageCopy.substring(messageCopy.lastIndexOf('ITEM'), messageCopy.lastIndexOf(':'))
    //             _items.forEach((item) => {
    //                 if (itemName.includes(item.name)) {
    //                     messages.forEach((msg) => {
    //                         if (msg[0].className.includes('linked-chat-item')) {
    //                             if (msg[0].innerText.includes(item.name)) {
    //                                 item.stat = typeof item.stat == 'string' ? item.stat = item.stat.split(';').reduce((acc, curr) => {
    //                                     const [key, value] = curr.split('=')
    //                                     acc[key] = value
    //                                     return acc
    //                                 }, {}) : item.stat
    //                                 msg.addClass(`linked-chat-item-rarity-${item.stat.rarity}`)
    //                             }
    //                         }
    //                     })
    //                 }
    //             })
    //             messageCopy = messageCopy.replace(`"${itemName}"`, '').replace(`${itemHid}:`, '')
    //         }
    //     }

    //     return messages
    // }

    // const _dispatcherOnChat = Engine.communication.dispatcher.on_chat
    // Engine.communication.dispatcher.on_chat = (data) => {
    //     _dispatcherOnChat(data)
    //     if (window.Engine.logOff) return
    //     for (let channel in data.channels) {
    //         let messages = data.channels[channel].msg
    //         messages?.forEach((message) => {
    //             if (message.code?.includes('TPL')) {
    //                 let itemTplSplit = message.code.substring(message.code.lastIndexOf('TPL'), message.code.lastIndexOf(':')).split('#')
    //                 _g(`chat&getContent=${itemTplSplit[0]}%23${itemTplSplit[1]}`, (e) => {
    //                     let item = e.item_tpl[itemTplSplit[1]]
    //                     item.stat = item.stat?.split(';').reduce((acc, curr) => {
    //                         const [key, value] = curr.split('=')
    //                         acc[key] = value
    //                         return acc
    //                     }, {})
    //                     const htmlMessages = document.querySelectorAll(`.linked-chat-item`)
    //                     htmlMessages.forEach((message) => {
    //                         if (message.innerText.includes(item.name)) {
    //                             message.classList.add(`linked-chat-item-rarity-${item.stat.rarity}`)
    //                         }
    //                     })
    //                 })
    //             } else if (message.msg?.includes('ITEM#')) {
    //                 let messageCopy = message.msg
    //                 while (messageCopy.match(/ITEM#[a-z0-9]+:/)?.length > 0) {
    //                     let itemTplSplit = messageCopy.substring(messageCopy.lastIndexOf('ITEM'), messageCopy.lastIndexOf(':')).split('#')
    //                     _g(`chat&getContent=${itemTplSplit[0]}%23${itemTplSplit[1]}`, (e) => {
    //                         let item = {}
    //                         for (let i in e.item) {
    //                             if (e.item[i].hid == itemTplSplit[1]) {
    //                                 item = e.item[i]
    //                             }
    //                         }
    //                         item.stat = item.stat?.split(';').reduce((acc, curr) => {
    //                             const [key, value] = curr.split('=')
    //                             acc[key] = value
    //                             return acc
    //                         }, {})
    //                         const htmlMessages = document.querySelectorAll(`.linked-chat-item`)
    //                         htmlMessages.forEach((message) => {
    //                             if (message.innerText.includes(item.name)) {
    //                                 message.classList.add(`linked-chat-item-rarity-${item.stat.rarity}`)
    //                             }
    //                         })
    //                     })
    //                     messageCopy = messageCopy.replace(`ITEM#${itemTplSplit[1]}:`, '')
    //                 }
    //             }
    //         })
    //     }
    // }

    // const parseJSON = Engine.communication.parseJSON
    // Engine.communication.parseJSON = (data, ...args) => {
    //     console.log(data)
    //     console.log(args)
    //     parseJSON.apply(Engine.communication, [data, ...args])
    // }

    // const _addWidgetButtons = Engine.widgetManager.addWidgetButtons
    // Engine.widgetManager.addWidgetButtons = (a, b, c, d) => {
    //     console.log(a)
    //     console.log(b)
    //     console.log(c)
    //     console.log(d)
    //     _addWidgetButtons(a, b, c, d)
    // }


    //_g('party&a=accept&answer=1')
    // function start() {
    //     if (Engine && Engine.allInit) {
    //         $('.rewards-calendar').ready(() => {
    //             $('.rewards-calendar').click()
    //             $('.day.current.today').ready(() => {
    //                 if ($('.day.current.today>.reward.can-open').length != 0) {
    //                     $('.day.current.today>.reward.can-open').ready(() => {
    //                         $('.day.current.today>.reward.can-open>.item-wrapper').ready(() => {
    //                             $('.day.current.today>.reward.can-open>.item-wrapper').click()
    //                         })
    //                     })
    //                 }
    //             })
    //         })
    //     } else {
    //         setTimeout(() => start(), 50)
    //     }
    // }

    // start()


    // const interface = (function () {
    //     if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
    //         return 'new'
    //     } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
    //         return 'old'
    //     }
    // })()

    // function _loadQueue() {
    //     $("#new_event_calendar").ready(() => {
    //         console.log($("#new_event_calendar"))
    //         setTimeout(() => {
    //             if ($("#new_event_calendar").hasClass("notif")) {
    //                 for (let i = 0; i < 5; i++) {
    //                     window.message('Odbierz kalendarz!')
    //                 }
    //                 _g("rewards_calendar&action=show")
    //             }
    //         }, 500)
    //     })
    // }

    // function start() {
    //     if (interface == 'new') {
    //         if (Engine && Engine.allInit) {
    //             $('.rewards-calendar').ready(() => {
    //                 setTimeout(() => {
    //                     if ($("div[widget-name='rewards-calendar']").has('.specific-animation').length) {
    //                         for (let i = 0; i < 5; i++) {
    //                             window.message('Odbierz kalendarz!')
    //                         }
    //                         _g("rewards_calendar&action=show")
    //                     }
    //                 }, 500)
    //             })
    //         } else {
    //             setTimeout(() => start(), 50)
    //         }
    //     } else if (interface == 'old') {
    //         g.loadQueue.push({ fun: _loadQueue, data: '' })
    //     }
    // }

    // start()

    // const _getDayIndex = Engine.rewardsCalendar.getDayIndex
    // Engine.rewardsCalendar.getDayIndex = (data) => {
    //     console.log(data)
    //     _getDayIndex(data)
    // }

    // const interface = (function () {
    //     if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
    //         return 'new'
    //     } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
    //         return 'old'
    //     }
    // })()

    // const style = document.createElement('style')
    // style.innerHTML = `
    //     .unlag-party-invite-NI {
    //         position: fixed;
    //         bottom: 5px;
    //     }

    //     .unlag-party-invite-SI {
    //         position: relative;
    //         width: 50px;
    //         border: 2px solid #fff;
    //         font-size: 12px;
    //         bottom: 585px;
    //         left: 210px;
    //         cursor: pointer;
    //     }

    //     .unlag-party-invite-SI:hover {
    //         background-color: #572f2f;
    //     }

    //     .buttonCell {
    //         border: 1px solid #999999;
    //         display: table-cell;
    //         padding: 3px 10px;
    //         cursor: pointer;
    //     }
    // `
    // document.head.appendChild(style)

    // function _loadQueue() {
    //     let element = document.createElement('div')
    //     element.classList.add('unlag-party-invite-SI')
    //     element.innerHTML = `
    //         <div class="buttonCell">Unlag Party Invite</div>
    //     `
    //     $('#chat').ready(() => {
    //         $('#chat').append(element)
    //     })
    //     element.addEventListener('click', () => {
    //         _g('party&a=accept&answer=1')
    //     })
    // }

    // function start() {
    //     if (interface == 'new') {
    //         if (Engine && Engine.allInit) {
    //             let element = document.createElement('div')
    //             let childElement = document.createElement('div')
    //             childElement.classList.add('icon', 'party')
    //             element.classList.add('unlag-party-invite-NI', 'widget-button', 'green', 'widget-in-interface-bar', 'widget-compass', 'ui-draggable', 'ui-draggable-handle', 'ui-draggable-disabled')
    //             element.appendChild(childElement)
    //             $('.bottom-panel-of-bottom-positioner.bottom-panel').ready(() => {
    //                 $('.bottom-panel-of-bottom-positioner.bottom-panel').append(element)
    //             })
    //             element.addEventListener('click', () => {
    //                 _g('party&a=accept&answer=1')
    //             })
    //         } else {
    //             setTimeout(() => start(), 50)
    //         }
    //     } else if (interface == 'old') {
    //         g.loadQueue.push({ fun: _loadQueue, data: '' })
    //     }
    // }

    // start()

    // const e = window.getCookie('hs3')
    // fetch('https://www.margonem.pl/ajax/loginSubstitute', {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     body: `h2=${e}&security=true`,
    //     headers: {
    //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     },
    //     credentials: 'include',
    // })

    // function start() {
    //     if (Engine && Engine.changePlayer && Engine.hero.d && Engine.allInit) {
    //         Engine.changePlayer.onSuccess = async (listOfCharacters) => {
    //             API.Storage.set("charlist/" + Engine.hero.d.account, listOfCharacters)
    //             const hs3Cookie = window.getCookie('hs3')
    //             try {
    //                 await fetch('https://public-api.margonem.pl/account/charlist?hs3=' + hs3Cookie, {
    //                     credentials: 'include'
    //                 }).then(res => res.text()).then(res => {
    //                     const crossStorageNode = Engine.hero.d.guest ? 'ownerDeputyCharacters' : 'ownerAccountCharacters'
    //                     Engine.crossStorage.set(crossStorageNode, res)
    //                 })
    //             } catch (error) {
    //                 console.error(error)
    //             }
    //             let charList = []
    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('ownerDeputyCharacters'))
    //                 .then((characters) => {
    //                     if (characters != null) {
    //                         charList = [...charList, ...JSON.parse(characters)]
    //                     }
    //                 })
    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('ownerAccountCharacters'))
    //                 .then((characters) => {
    //                     if (characters != null) {
    //                         charList = [...charList, ...JSON.parse(characters)]
    //                     }
    //                 })
    //             console.log(charList)
    //             Engine.changePlayer.prepareList(charList)
    //             Engine.changePlayer.createWorldList()
    //             Engine.changePlayer.createCharacters()
    //             Engine.changePlayer.selectCurrentWorld()
    //             Engine.changePlayer.updateScroll()
    //         }

    //         Engine.changePlayer.createCharacters = async () => {
    //             let ownerDeputyCharactersIds = []
    //             let ownerAccountCharactersIds = []
    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('ownerDeputyCharacters'))
    //                 .then((characters) => {
    //                     if (characters != null) {
    //                         ownerDeputyCharactersIds = JSON.parse(characters).map(character => character.id)
    //                     }
    //                 })

    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('ownerAccountCharacters'))
    //                 .then((characters) => {
    //                     if (characters != null) {
    //                         ownerAccountCharactersIds = JSON.parse(characters).map(character => character.id)
    //                     }
    //                 })
    //             if (ownerAccountCharactersIds.length != 0) {
    //                 Object.values(Engine.changePlayer.list)
    //                     .filter(character => ownerAccountCharactersIds.includes(character.id))
    //                     .sort((prevCharacter, nextCharacter) => prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick))
    //                     .map(character => {
    //                         const worldName = character.world
    //                         const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
    //                         Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
    //                     })
    //             }
    //             if (ownerDeputyCharactersIds.length != 0) {
    //                 Object.values(Engine.changePlayer.list)
    //                     .filter(character => ownerDeputyCharactersIds.includes(character.id))
    //                     .sort((prevCharacter, nextCharacter) => prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick))
    //                     .map(character => {
    //                         const worldName = character.world
    //                         const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
    //                         Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
    //                     })
    //             }
    //         }

    //         Engine.changePlayer.reloadPlayer = (characterId) => {
    //             const relog = () => {
    //                 const character = Engine.changePlayer.list[characterId]
    //                 let date = new Date
    //                 date.setTime(date.getTime() + 2592e6)
    //                 const domain = getMainDomain()
    //                 setCookie("mchar_id", characterId, date, "/", "margonem." + domain, !0)
    //                 window.location.replace("https://" + character.world + ".margonem." + domain)
    //             }
    //             const relogType = Engine.hero.d.guest ? 'logout' : 'loginSubstitute'
    //             let ownerAccountCharacters = []
    //             Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('ownerAccountCharacters'))
    //                 .then((characters) => {
    //                     if (characters != null) {
    //                         ownerAccountCharacters = JSON.parse(characters)
    //                     }
    //                 })
    //             if (ownerAccountCharacters.filter(character => character.id === characterId).length == 0) {
    //                 const hs3Cookie = window.getCookie('hs3')
    //                 fetch('https://www.margonem.pl/ajax/' + relogType, {
    //                     method: 'POST',
    //                     mode: 'no-cors',
    //                     body: `h2=${hs3Cookie}&security=true`,
    //                     headers: {
    //                         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //                     },
    //                     credentials: 'include',
    //                 }).then(relog)
    //             } else relog()
    //         }
    //     } else {
    //         setTimeout(() => start(), 50)
    //     }
    // }

    // start()

    // const Window = class {
    //     constructor(options) {
    //         this.wnd = window.Engine.windowManager.add({
    //             content: " ",
    //             nameWindow: options.name || " ",
    //             parentObj: null,
    //             title: options.header,
    //             type: options.type,
    //             managePosition: {
    //                 x: options.x,
    //                 y: options.y
    //             },
    //             onclose: options.onclose
    //         })
    //         this.$ = this.wnd.$[0]
    //         this.$content = document.createElement("div")
    //         this.$userContent = document.createElement("div")
    //         this.$content.appendChild(this.$userContent)

    //         if (typeof options.txt != "undefined")
    //             this.$userContent.innerHTML = options.txt
    //         else if (typeof options.element != "undefined")
    //             this.$userContent.appendChild(options.element)

    //         if (options.likemAlert)
    //             this.$.classList.add("mAlert")

    //         if (options.noClose) {
    //             const $close = this.getCloseBtt()
    //             if ($close)
    //                 $close.parentElement.removeChild($close)
    //         }

    //         if (options.callbacks) {
    //             for (let i = 0; i < options.callbacks.length; ++i) {
    //                 const data = options.callbacks[i]
    //                 const btt = new addons.Button({
    //                     label: data.txt,
    //                     clb: data.clb
    //                 })
    //                 this.$content.appendChild(btt.get$())
    //             }
    //         }

    //         if (options.css) {
    //             Object.assign(this.$.style, options.css)
    //         }

    //         this.wnd.content(this.$content)
    //         this.wnd.addToAlertLayer()
    //         this.wnd.setWndOnPeak()
    //         this.wnd.center()
    //     }

    //     getCloseBtt() {
    //         const $close = this.$.querySelector(".close-button-corner-decor")
    //         if ($close) {
    //             return $close
    //         } else {
    //             return null
    //         }
    //     }

    //     setContent(content) {
    //         if (typeof content == "string")
    //             this.$userContent.innerHTML = content
    //         else
    //             this.$userContent.appendChild(content)
    //     }

    //     setHeader(header) {
    //         this.wnd.title(header)
    //     }

    //     setLabel(label) {
    //         this.wnd.label(label)
    //     }

    //     appendContent(el) {
    //         this.$userContent.appendChild(el)
    //     }

    //     clearContent() {
    //         this.$userContent.innerHTML = ""
    //     }

    //     close() {
    //         this.wnd.close()
    //     }
    //     getInnerWnd() {
    //         return this.wnd
    //     }
    // }


    // function start() {
    //     if (Engine && Engine.allInit) {


    //     } else {
    //         setTimeout(() => start(), 50)
    //     }
    // }

    // // start()

    // const _dispatcherOnLoot = Engine.communication.dispatcher.on_loot
    // Engine.communication.dispatcher.on_loot = (...args) => {
    //     console.log(...args)
    //     console.log(_dispatcherOnLoot(...args))
    //     return _dispatcherOnLoot(...args)
    // }

    // const interface = (function () {
    //     if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
    //         return 'new'
    //     } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
    //         return 'old'
    //     }
    // })()

    // const style = document.createElement('style')
    // style.innerHTML = `
    //     .unlag-party-invite-NI {
    //         position: fixed;
    //         bottom: 5px;
    //     }

    //     .unlag-party-invite-SI {
    //         position: relative;
    //         width: 50px;
    //         border: 2px solid #fff;
    //         font-size: 12px;
    //         bottom: 585px;
    //         left: 210px;
    //         cursor: pointer;
    //     }

    //     .unlag-party-invite-SI:hover {
    //         background-color: #572f2f;
    //     }

    //     .button-cell-unlag-party-invite {
    //         border: 1px solid #999999;
    //         display: table-cell;
    //         padding: 3px 10px;
    //         cursor: pointer;
    //     }

    //     .tooltip-unlag-party-invite .tooltiptext-unlag-party-invite {
    //         visibility: hidden;
    //         width: 120px;
    //         text-align: center;
    //         position: absolute;
    //         background: rgba(0,0,0,.5);
    //         border: 3px double #d6c8c8;
    //         border-image: none;
    //         background-size: 100% 100%;
    //         bottom: 48px;
    //         right: 10px;
    //         box-shadow: 0 0 0 0 #2b282a,0 0 0 1px #353131,0 0 0 2px #191311,0 0 0 3px #2b2727,0 0 0 4px #59595a,0 0 0 5px #9da1a7,0 0 0 6px #5a585b,0 0 0 7px #2c2625
    //         z-index: 1;
    //     }

    //     .tooltip-unlag-party-invite:hover .tooltiptext-unlag-party-invite {
    //         visibility: visible;
    //     }
    // `
    // document.head.appendChild(style)

    // function _loadQueue() {
    //     let element = document.createElement('div')
    //     element.classList.add('unlag-party-invite-SI')
    //     element.innerHTML = `
    //         <div class="button-cell-unlag-party-invite">Unlag Party Invite</div>
    //     `
    //     $('#chat').ready(() => {
    //         $('#chat').append(element)
    //     })
    //     element.addEventListener('click', () => {
    //         _g('party&a=accept&answer=1')
    //     })
    // }

    // function start() {
    //     if (interface == 'new') {
    //         if (Engine && Engine.allInit) {
    //             let element = document.createElement('div')
    //             let childDivElement = document.createElement('div')
    //             let childSpanElement = document.createElement('span')
    //             childDivElement.classList.add('icon', 'party')
    //             childSpanElement.classList.add('tooltiptext-unlag-party-invite')
    //             childSpanElement.innerText = 'Unlag Party Invite'
    //             element.classList.add('tooltip-unlag-party-invite', 'unlag-party-invite-NI', 'widget-button', 'green', 'widget-in-interface-bar', 'widget-compass', 'ui-draggable', 'ui-draggable-handle', 'ui-draggable-disabled')
    //             element.appendChild(childSpanElement)
    //             element.appendChild(childDivElement)
    //             $('.bottom-panel-of-bottom-positioner.bottom-panel').ready(() => {
    //                 $('.bottom-panel-of-bottom-positioner.bottom-panel').append(element)
    //             })
    //             element.addEventListener('click', () => {
    //                 _g('party&a=accept&answer=1')
    //             })
    //         } else {
    //             setTimeout(() => start(), 50)
    //         }
    //     } else if (interface == 'old') {
    //         g.loadQueue.push({ fun: _loadQueue, data: '' })
    //     }
    // }

    // start()

    // function deepEqual(object1, object2) {
    //     const keys1 = Object.keys(object1)
    //     const keys2 = Object.keys(object2)

    //     if (keys1.length !== keys2.length) {
    //         return false
    //     }

    //     for (const key of keys1) {
    //         const val1 = object1[key]
    //         const val2 = object2[key]
    //         const areObjects = isObject(val1) && isObject(val2)
    //         if (
    //             areObjects && !deepEqual(val1, val2) ||
    //             !areObjects && val1 !== val2
    //         ) {
    //             return false
    //         }
    //     }

    //     return true
    // }

    // function isObject(object) {
    //     return object != null && typeof object === 'object'
    // }


    // function start() {
    //     if (Engine && Engine.changePlayer && Engine.hero.d && Engine.allInit) {
    //         const accountId = Engine.hero.d.account

    //         Engine.changePlayer.onSuccess = async (listOfCharacters) => {
    //             API.Storage.set("charlist/" + accountId, listOfCharacters)
    //             const margonemLocalStorage = JSON.parse(localStorage.getItem("Margonem"))
    //             let charList = []
    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('charlist'))
    //                 .then((accountIds) => {
    //                     accountIds = JSON.parse(accountIds)
    //                     if (accountIds != null) {
    //                         for (const [key, value] of Object.entries(accountIds)) {
    //                             charList = [...charList, ...value]
    //                         }
    //                         if (!deepEqual(accountIds[accountId], margonemLocalStorage.charlist[accountId]) || accountIds[accountId] == null) {
    //                             accountIds[accountId] = margonemLocalStorage.charlist[accountId]
    //                             Engine.crossStorage.set('charlist', accountIds)
    //                         }
    //                     } else {
    //                         for (const [key, value] of Object.entries(margonemLocalStorage.charlist)) {
    //                             charList = [...charList, ...value]
    //                         }
    //                         Engine.crossStorage.set('charlist', margonemLocalStorage.charlist)
    //                     }
    //                 })
    //             Engine.changePlayer.prepareList(charList)
    //             Engine.changePlayer.createWorldList()
    //             Engine.changePlayer.createCharacters()
    //             Engine.changePlayer.selectCurrentWorld()
    //             Engine.changePlayer.updateScroll()
    //         }

    //         Engine.changePlayer.createCharacters = async () => {
    //             let accountCharacterIds = []
    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('charlist'))
    //                 .then((accountIds) => {
    //                     accountIds = JSON.parse(accountIds)
    //                     if (accountIds != null) {
    //                         for (const [key, value] of Object.entries(accountIds)) {
    //                             if (key == accountId) {
    //                                 accountCharacterIds = value.map(character => character.id)
    //                             }
    //                         }
    //                     }
    //                 })
    //             Object.values(Engine.changePlayer.list)
    //                 .filter(character => accountCharacterIds.includes(character.id))
    //                 .sort((prevCharacter, nextCharacter) => prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick))
    //                 .map(character => {
    //                     const worldName = character.world
    //                     const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
    //                     Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
    //                 })

    //             Object.values(Engine.changePlayer.list)
    //                 .filter(chr => !accountCharacterIds.includes(chr.id))
    //                 .sort((prevCharacter, nextCharacter) => prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick))
    //                 .map(character => {
    //                     const worldName = character.world
    //                     const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
    //                     Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
    //                 })
    //         }

    //         Engine.changePlayer.reloadPlayer = async (characterId) => {
    //             const relog = () => {
    //                 const character = Engine.changePlayer.list[characterId]
    //                 let date = new Date
    //                 date.setTime(date.getTime() + 2592e6)
    //                 const domain = getMainDomain()
    //                 setCookie("mchar_id", characterId, date, "/", "margonem." + domain, !0)
    //                 window.location.replace("https://" + character.world + ".margonem." + domain)
    //             }
    //             const relogType = Engine.hero.d.guest ? 'logout' : 'loginSubstitute'
    //             let accountCharacters = []
    //             await Engine.crossStorage.storage
    //                 .onConnect()
    //                 .then(() => Engine.crossStorage.get('charlist'))
    //                 .then((accountIds) => {
    //                     accountIds = JSON.parse(accountIds)
    //                     if (accountIds != null) {
    //                         for (const [key, value] of Object.entries(accountIds)) {
    //                             if (key == accountId) {
    //                                 accountCharacters = value
    //                             }
    //                         }
    //                     }
    //                 })
    //             if (accountCharacters.filter(chr => chr.id === characterId).length == 0) {
    //                 const hs3Cookie = window.getCookie('hs3')
    //                 fetch('https://www.margonem.pl/ajax/' + relogType, {
    //                     method: 'POST',
    //                     mode: 'no-cors',
    //                     body: `h2=${hs3Cookie}&security=true`,
    //                     headers: {
    //                         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //                     },
    //                     credentials: 'include',
    //                 }).then(relog)
    //             } else relog()
    //         }
    //     } else {
    //         setTimeout(() => start(), 50)
    //     }
    // }

    // start()

    // const _dispatcherOnLoot = Engine.map.onUpdate
    // Engine.map.onUpdate = (...args) => {
    //     console.log(...args)
    //     console.log(_dispatcherOnLoot(...args))
    //     return _dispatcherOnLoot(...args)
    // }

})()

// let input = document.createElement('input')
// input.type = 'time'
// input.style.position = 'absolute'
// input.style.top = '435px'
// input.style.right = '1000px'

// document.body.appendChild(input)

// let div = document.createElement('div')
// div.style.position = 'absolute'
// div.style.top = '495px'
// div.style.right = '890px'
// div.style.width = '100px'
// div.style.height = '20px'
// div.style.color = 'white'

// document.body.appendChild(div)

// let button = document.createElement('button')
// button.innerText = 'Kopiuj czas'
// button.style.position = 'absolute'
// button.style.top = '495px'
// button.style.right = '1000px'
// button.onclick = () => {
//     navigator.clipboard.writeText(div.innerText)
// }

// document.body.appendChild(button)

// const changeValue = () => {
//     if (input.value == '') return
//     let targetHour = input.value.split(':')[0]
//     let targetMinute = input.value.split(':')[1]
//     let targetSecond = 0

//     let date1 = new Date()
//     let date2 = new Date()
//     date2.setHours(targetHour)
//     date2.setMinutes(targetMinute)
//     date2.setSeconds(targetSecond)
//     if (date1.getHours() == targetHour && date1.getMinutes() == targetMinute && date1.getSeconds() >= targetSecond || date1.getHours() == targetHour && date1.getMinutes() > targetMinute || date1.getHours() > targetHour) {
//         date2.setDate(date2.getDate() + 1)
//     }

//     let minutesDiff = Math.abs(date1 - date2) / 1000

//     let hours = Math.floor(minutesDiff / 3600)
//     let minutes = Math.floor((minutesDiff - hours * 3600) / 60)
//     let seconds = Math.floor(minutesDiff % 60)

//     div.innerText = hours + 'h ' + minutes + 'm ' + seconds + 's'
// }

// setInterval(changeValue, 1000)

// Engine.crossStorage.set('charlist', null)
// let margonemLocalStorage = JSON.parse(localStorage.getItem("Margonem"))
// margonemLocalStorage.charlist = {}
// localStorage.setItem("Margonem", JSON.stringify(margonemLocalStorage))