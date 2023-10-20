(function () {
    const sendMessageOnPrivateChat = (message, receiver) => {
        _g(`chat&channel=personal&receiver=${receiver}`, !1, { c: message })
    }

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                let herosAlerts = document.querySelectorAll('.cll-alert')
                if (herosAlerts.length) {
                    herosAlerts.forEach(alert => {
                        if (!alert.innerHTML.includes('Zawołaj klanowiczów')) {
                            let nick = alert.children[0].children[1].children[2].innerHTML.slice(0, alert.children[0].children[1].children[2].innerHTML.indexOf(' ('))
                            nick = nick.replace(' ', '_')
                            alert.children[0].children[2].children[1].remove()
                            let newButton = document.createElement('button')
                            newButton.id = 'cll-confirm'
                            newButton.innerText = 'Potwierdź chęć bicia (ide)'
                            newButton.addEventListener('click', () => {
                                sendMessageOnPrivateChat('ide', nick)
                                alert.remove()
                            })
                            alert.children[0].children[2].appendChild(newButton)
                        }
                    })
                }
            }
        }
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.body, { attributes: false, childList: true, subtree: false })
})()