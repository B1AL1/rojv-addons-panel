(function () {
    const style = document.createElement('style')
    style.innerHTML = `
        .linked-chat-item-rarity-common {
            color: #9da1a7 !important;
        }
        .linked-chat-item-rarity-unique {
            color: #fffb00 !important;
        }
        .linked-chat-item-rarity-heroic {
            color: #38b8eb !important;
        }
        .linked-chat-item-rarity-upgraded {
            color: #ff59af !important;
        }
        .linked-chat-item-rarity-legendary {
            color: #ff8400 !important;
        }
    `
    document.head.appendChild(style)

    function colorNick() {
        $('.new-chat-message .message-part .message-section .mark-message-span').each((i, e) => {
            if ($(e).text() == Engine.hero.d.nick) {
                $(e).css('color', 'orange')
            }
        })
    }

    function colorDivisionOfLoot() {
        $('.new-chat-message .message-part.special-style-4 .mark-message-span').each((i, e) => {
            if ($(e).text() == Engine.hero.d.nick) {
                $(e).css('color', 'orange')
            }
        })
        $('.new-chat-message .message-part.special-style-4').each((i, e) => {
            $(e).css('color', '#cfc')
        })
    }

    const _items = new Set()

    const _dispatcherOnItem = Engine.communication.dispatcher.on_item
    Engine.communication.dispatcher.on_item = (items) => {
        for (const item in items) {
            _items.add(items[item])
        }
        return _dispatcherOnItem(items)
    }

    const _messages = Engine.chatLinkedItemsManager.parseReceiveMessageWithLinkedItem
    Engine.chatLinkedItemsManager.parseReceiveMessageWithLinkedItem = (message, e, i) => {
        let messages = _messages(message, e, i)
        if (message.includes('TPL')) {
            _items.forEach((item) => {
                if (message.includes(item.name)) {
                    messages.forEach((msg) => {
                        if (msg[0].className.includes('linked-chat-item')) {
                            if (msg[0].innerText.includes(item.name)) {
                                item.stat = typeof item.stat == 'string' ? item.stat = item.stat.split(';').reduce((acc, curr) => {
                                    const [key, value] = curr.split('=')
                                    acc[key] = value
                                    return acc
                                }, {}) : item.stat
                                msg.addClass(`linked-chat-item-rarity-${item.stat.rarity}`)
                            }
                        }
                    })
                }
            })
        } else if (message.includes('ITEM#')) {
            let messageCopy = message
            while (messageCopy.includes('ITEM#')) {
                let itemName = messageCopy.substring(messageCopy.lastIndexOf('"', messageCopy.lastIndexOf('"') - 1) + 1, messageCopy.lastIndexOf('"'))
                let itemHid = messageCopy.substring(messageCopy.lastIndexOf('ITEM'), messageCopy.lastIndexOf(':'))
                _items.forEach((item) => {
                    if (itemName.includes(item.name)) {
                        messages.forEach((msg) => {
                            if (msg[0].className.includes('linked-chat-item')) {
                                if (msg[0].innerText.includes(item.name)) {
                                    item.stat = typeof item.stat == 'string' ? item.stat = item.stat.split(';').reduce((acc, curr) => {
                                        const [key, value] = curr.split('=')
                                        acc[key] = value
                                        return acc
                                    }, {}) : item.stat
                                    msg.addClass(`linked-chat-item-rarity-${item.stat.rarity}`)
                                }
                            }
                        })
                    }
                })
                messageCopy = messageCopy.replace(`"${itemName}"`, '').replace(`${itemHid}:`, '')
            }
        }

        return messages
    }

    const _dispatcherOnChat = Engine.communication.dispatcher.on_chat
    Engine.communication.dispatcher.on_chat = (data) => {
        _dispatcherOnChat(data)
        if (window.Engine.logOff) return
        colorNick()
        for (let channel in data.channels) {
            if (channel == 'system') {
                colorDivisionOfLoot()
            }
            let messages = data.channels[channel].msg
            messages?.forEach((message) => {
                if (message.code?.includes('TPL')) {
                    let itemTplSplit = message.code.substring(message.code.lastIndexOf('TPL'), message.code.lastIndexOf(':')).split('#')
                    _g(`chat&getContent=${itemTplSplit[0]}%23${itemTplSplit[1]}`, (e) => {
                        let item = e.item_tpl[itemTplSplit[1]]
                        item.stat = item.stat?.split(';').reduce((acc, curr) => {
                            const [key, value] = curr.split('=')
                            acc[key] = value
                            return acc
                        }, {})
                        const htmlMessages = document.querySelectorAll(`.linked-chat-item`)
                        htmlMessages.forEach((message) => {
                            if (message.innerText.includes(item.name)) {
                                message.classList.add(`linked-chat-item-rarity-${item.stat.rarity}`)
                            }
                        })
                    })
                } else if (message.msg?.includes('ITEM#')) {
                    let messageCopy = message.msg
                    while (messageCopy.match(/ITEM#[a-z0-9]+:/)?.length > 0) {
                        let itemTplSplit = messageCopy.substring(messageCopy.lastIndexOf('ITEM'), messageCopy.lastIndexOf(':')).split('#')
                        _g(`chat&getContent=${itemTplSplit[0]}%23${itemTplSplit[1]}`, (e) => {
                            let item = {}
                            for (let i in e.item) {
                                if (e.item[i].hid == itemTplSplit[1]) {
                                    item = e.item[i]
                                }
                            }
                            item.stat = item.stat?.split(';').reduce((acc, curr) => {
                                const [key, value] = curr.split('=')
                                acc[key] = value
                                return acc
                            }, {})
                            const htmlMessages = document.querySelectorAll(`.linked-chat-item`)
                            htmlMessages.forEach((message) => {
                                if (message.innerText.includes(item.name)) {
                                    message.classList.add(`linked-chat-item-rarity-${item.stat.rarity}`)
                                }
                            })
                        })
                        messageCopy = messageCopy.replace(`ITEM#${itemTplSplit[1]}:`, '')
                    }
                }
            })
        }
    }
})()