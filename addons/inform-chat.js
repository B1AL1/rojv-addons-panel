(function () {
    const interface = (function () {
        if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
            return 'new'
        } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
            return 'old'
        }
    })()

    const sendMessageOnClanChat = (message) => {
        interface == 'new' ? _g('chat&channel=clan', !1, { c: message }) : _g('chat&channel=clan', { c: message })
    }

    const lastHeroCords = {
        x: interface == 'new' ? Engine.hero.d.x : window.hero.x,
        y: interface == 'new' ? Engine.hero.d.y : window.hero.y,
    }

    const hero = {
        proxy: interface == 'new' ? Engine.hero : window.hero,
        details: interface == 'new' ? Engine.hero.d : window.hero,
    }

    const spottedNpc = {
        details: null,
    }

    const checkHeroCoords = (hx, hy) => {
        const { x, y } = lastHeroCords
        if (x === hx && y === hy) return false
        Object.assign(lastHeroCords, { x: hx, y: hy })
        return true
    }

    const heroProxyHandler = {
        set(...args) {
            const ret = Reflect.set(...args)
            const [object, property] = args
            if (['rx', 'ry'].includes(property)) {
                if ((interface == 'new' ? checkHeroCoords(object.d.x, object.d.y) : checkHeroCoords(object.x, object.y)) && spottedNpc.details != null) {
                    if (Math.sqrt(Math.pow(hero.details.x - spottedNpc.details?.x, 2) + Math.pow(hero.details.y - spottedNpc.details?.y, 2)) < 12 && spottedNpc.details != null) {
                        informChatQueue(hero.details, spottedNpc.details)
                    }
                }
            }
            return ret
        },
    }

    function removeObjectWithChannel(arr, channel) {
        let index = arr.length
        while (index--) {
            if (arr[index].channel === channel) {
                arr.splice(index, 1)
            }
        }
        return arr
    }

    if (interface == 'new') {
        Engine.hero = new Proxy(hero.proxy, heroProxyHandler)
    } else if (interface == 'old') {
        const _clearMessageList = getEngine().chatController.clearMessageList
        getEngine().chatController.clearMessageList = (data) => {
            removeObjectWithChannel(messages, data)
            _clearMessageList(data)
        }
        const parseInput = window.parseInput
        window.parseInput = (data, ...args) => {
            if (data.e === 'ok' && data.chat && data.matchmaking_state == 0) {
                messages.splice(0, messages.length)
            }
            return parseInput(data, ...args)
        }
        window.hero = new Proxy(hero.proxy, heroProxyHandler)
    }
    const messages = []
    const _updateData = getEngine().chatController.getChatDataUpdater().updateData
    getEngine().chatController.getChatDataUpdater().updateData = (data) => {
        _updateData(data)
        if (interface == 'old') {
            //wiadomoÄÂÄšÄÄÂĂÂci dla czatu globalnego - wszystkie oprÄÂĂÂĂĹĄĂÂcz komercyjnych i nazw map
            for (let channel in data.channels) {
                data.channels[channel].msg?.forEach((msg) => {
                    if (msg.style != 7) {
                        messages.push(msg)
                    }
                })
                if (channel != 'commercial' && channel != 'global') {
                    if (channel == 'personal') channel = 'private'
                    const htmlMessages = document.querySelectorAll(`.${channel.toUpperCase()}-message-wrapper .new-chat-message:not(.wrapper-special-style-7)`)
                    if (htmlMessages.length > 0) {
                        let i = 0
                        messages.map((msg) => {
                            if (msg.channel == channel.toUpperCase()) {
                                let date = new Date(msg.ts * 1000)
                                const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                                const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                                const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                                htmlMessages[i].firstElementChild.firstElementChild.innerHTML = `[${hours}:${minutes}:${seconds}] `
                                i++
                            }
                        })
                    }
                }
            }
            messages.sort((a, b) => a.ts - b.ts)
            const htmlGlobalMessages = document.querySelectorAll('.GLOBAL-message-wrapper .new-chat-message:not(.wrapper-special-style-7):not(.chat-COMMERCIAL-message)')
            if (htmlGlobalMessages.length > 0) {
                let i = 0
                messages.map((msg) => {
                    if (msg.channel != 'COMMERCIAL') {
                        let date = new Date(msg.ts * 1000)
                        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                        htmlGlobalMessages[i].firstElementChild.firstElementChild.innerHTML = `[${hours}:${minutes}:${seconds}] `
                        i++
                    }
                })
            }
        } else {
            data.channels?.clan?.msg?.forEach((msg) => {
                messages.push(msg)
            })
        }
    }

    function informChatQueue(hero, npc) {
        const trimmedMessages = []
        messages.map((message) => {
            if (message.channel == 'CLAN') {
                if (message.msg.includes(` na ${npc.nick} (${npc.lvl} lvl) `)) {
                    trimmedMessages.push(message)
                }
            }
        })

        let lastOnMap = 0
        const dateNow = new Date()
        const hoursNow = dateNow.getHours() < 10 ? '0' + dateNow.getHours() : dateNow.getHours()
        const minutesNow = dateNow.getMinutes() < 10 ? '0' + dateNow.getMinutes() : dateNow.getMinutes()
        const secondsNow = dateNow.getSeconds() < 10 ? '0' + dateNow.getSeconds() : dateNow.getSeconds()
        const milisecondsNow = dateNow.getMilliseconds()
        let messageToSend = `${lastOnMap + 1} na ${npc.nick} (${npc.lvl} lvl) [${hoursNow}:${minutesNow}:${secondsNow}.${milisecondsNow}]`
        if (trimmedMessages.length > 0) {
            lastOnMap = Number(trimmedMessages[trimmedMessages.length - 1].msg.split(' ')[0])
            messageToSend = `${lastOnMap + 1} na ${npc.nick} (${npc.lvl} lvl) [${hoursNow}:${minutesNow}:${secondsNow}.${milisecondsNow}]`
            for (let message of trimmedMessages) {
                let messageTime = new Date(message.ts * 1000)
                let messageHour = messageTime.getHours()
                let messageMinute = messageTime.getMinutes()
                const senderNick = getEngine().businessCardManager.getCard(message.sender).getNick()
                if (messageHour - dateNow.getHours() == 0 && messageMinute - dateNow.getMinutes() < 15 && senderNick === hero.nick) {
                    return
                }
            }
            sendMessageOnClanChat(messageToSend)
        } else {
            sendMessageOnClanChat(messageToSend)
        }
    }

    function start() {
        if (interface == 'new') {
            if (Engine && Engine.npcs && Engine.npcs.check && Engine.allInit) {
                API.addCallbackToEvent('newNpc', npcSpotted)
                API.addCallbackToEvent('removeNpc', npcRemoved)
            } else {
                setTimeout(() => start(), 50)
            }
        } else if (interface == 'old') {
            const _newNpc = this.newNpc
            this.newNpc = (npcs) => {
                _newNpc(npcs)
                for (const npc in npcs) {
                    if (npcs.hasOwnProperty(npc) && npcs[npc].wt > 79) {
                        Object.assign(spottedNpc, { details: npcs[npc] })
                        if (Math.sqrt(Math.pow(hero.details.x - spottedNpc.details.x, 2) + Math.pow(hero.details.y - spottedNpc.details.y, 2)) < 12) {
                            informChatQueue(hero.details, spottedNpc.details)
                        }
                    }
                }
            }
        }
    }

    function npcSpotted(npc) {
        if (npc.d.wt > 79) {
            Object.assign(spottedNpc, { details: npc.d })
            if (Math.sqrt(Math.pow(hero.details.x - spottedNpc.details.x, 2) + Math.pow(hero.details.y - spottedNpc.details.y, 2)) < 12) {
                informChatQueue(hero.details, spottedNpc.details)
            }
        }
    }

    function npcRemoved(npc) {
        if (npc.d.wt > 79) {
            Object.assign(spottedNpc, { details: null })
        }
    }

    start()
})()