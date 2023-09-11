(function () {
    const Engine = window.Engine
    const $ = window.$
    const cardRemove = document.querySelector('.menu-card .card-remove')
    const cardName = document.querySelector('.menu-card .card-name')

    const setLocalChat = () => {
        if (Engine.allInit) {
            getEngine().chatController.getChatChannelsAvailable().checkAvailableProcedure("LOCAL") && getEngine().chatController.getChatInputWrapper().setChannel({
                name: "LOCAL",
                short: {
                    pl: "l",
                    en: "l"
                },
                HERO_MSG_COLOR: "#D49999",
                OTHER_MSG_COLOR: "#D49999",
                remove: !0,
                menu: !0
            })
            setChatStyle()
            return
        } else {
            setTimeout(setLocalChat, 50)
        }
    }

    setLocalChat()
    $(cardRemove).on('click', setLocalChat)

    const setChatStyle = () => {
        const channelName = getEngine().chatController.getChatInputWrapper().getChannelName()
        const cardRemove = document.querySelector('.menu-card .card-remove')
        if (channelName == "LOCAL") {
            cardRemove.style.display = "none"
        } else if (channelName == "GLOBAL") {
            cardRemove.style.display = "inline-block"
        }
    }

    const onChangeElement = (qSelector, cb) => {
        if (qSelector) {
            const config = { attributes: true, childList: false, subtree: true }
            const callback = function (mutationsList, observer) {
                cb($(qSelector))
            }
            const observer = new MutationObserver(callback)
            observer.observe(qSelector, config)
        } else {
            console.error("onChangeElement: Invalid Selector")
        }
    }

    onChangeElement(cardName, function (jqueryElement) {
        setChatStyle()
    })

    onChangeElement(cardRemove, function (jqueryElement) {
        setChatStyle()
    })
})()