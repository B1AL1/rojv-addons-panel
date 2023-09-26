(function () {
    function deepEqual(object1, object2) {
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)

        if (keys1.length !== keys2.length) {
            return false
        }

        for (const key of keys1) {
            const val1 = object1[key]
            const val2 = object2[key]
            const areObjects = isObject(val1) && isObject(val2)
            if (
                areObjects && !deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false
            }
        }

        return true
    }

    function isObject(object) {
        return object != null && typeof object === 'object'
    }


    function start() {
        if (Engine && Engine.changePlayer && Engine.hero.d && Engine.allInit) {
            const accountId = Engine.hero.d.account

            Engine.changePlayer.onSuccess = async (listOfCharacters) => {
                API.Storage.set("charlist/" + accountId, listOfCharacters)
                const margonemLocalStorage = JSON.parse(localStorage.getItem("Margonem"))
                let charList = []
                await Engine.crossStorage.storage
                    .onConnect()
                    .then(() => Engine.crossStorage.get('charlist'))
                    .then((accountIds) => {
                        accountIds = JSON.parse(accountIds)
                        if (accountIds != null) {
                            for (const [key, value] of Object.entries(accountIds)) {
                                charList = [...charList, ...value]
                            }
                            if (accountIds[accountId] != null) {
                                if (!deepEqual(accountIds[accountId], margonemLocalStorage.charlist[accountId])) {
                                    accountIds[accountId] = margonemLocalStorage.charlist[accountId]
                                    Engine.crossStorage.set('charlist', accountIds)
                                }
                            } else {
                                accountIds[accountId] = margonemLocalStorage.charlist[accountId]
                                Engine.crossStorage.set('charlist', accountIds)
                            }

                        } else {
                            for (const [key, value] of Object.entries(margonemLocalStorage.charlist)) {
                                charList = [...charList, ...value]
                            }
                            Engine.crossStorage.set('charlist', margonemLocalStorage.charlist)
                        }
                    })
                Engine.changePlayer.prepareList(charList)
                Engine.changePlayer.createWorldList()
                Engine.changePlayer.createCharacters()
                Engine.changePlayer.selectCurrentWorld()
                Engine.changePlayer.updateScroll()
            }

            Engine.changePlayer.createCharacters = async () => {
                let accountCharacterIds = []
                await Engine.crossStorage.storage
                    .onConnect()
                    .then(() => Engine.crossStorage.get('charlist'))
                    .then((accountIds) => {
                        accountIds = JSON.parse(accountIds)
                        if (accountIds != null) {
                            for (const [key, value] of Object.entries(accountIds)) {
                                if (key == accountId) {
                                    accountCharacterIds = value.map(character => character.id)
                                }
                            }
                        }
                    })
                Object.values(Engine.changePlayer.list)
                    .filter(character => accountCharacterIds.includes(character.id))
                    .sort((prevCharacter, nextCharacter) => prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick))
                    .map(character => {
                        const worldName = character.world
                        const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
                        Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
                    })

                Object.values(Engine.changePlayer.list)
                    .filter(chr => !accountCharacterIds.includes(chr.id))
                    .sort((prevCharacter, nextCharacter) => prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick))
                    .map(character => {
                        const worldName = character.world
                        const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
                        Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
                    })
            }

            Engine.changePlayer.reloadPlayer = async (characterId) => {
                const relog = () => {
                    const character = Engine.changePlayer.list[characterId]
                    let date = new Date
                    date.setTime(date.getTime() + 2592e6)
                    const domain = getMainDomain()
                    setCookie("mchar_id", characterId, date, "/", "margonem." + domain, !0)
                    window.location.replace("https://" + character.world + ".margonem." + domain)
                }
                const relogType = Engine.hero.d.guest ? 'logout' : 'loginSubstitute'
                let accountCharacters = []
                await Engine.crossStorage.storage
                    .onConnect()
                    .then(() => Engine.crossStorage.get('charlist'))
                    .then((accountIds) => {
                        accountIds = JSON.parse(accountIds)
                        if (accountIds != null) {
                            for (const [key, value] of Object.entries(accountIds)) {
                                if (key == accountId) {
                                    accountCharacters = value
                                }
                            }
                        }
                    })
                if (accountCharacters.filter(chr => chr.id === characterId).length == 0) {
                    const hs3Cookie = window.getCookie('hs3')
                    fetch('https://www.margonem.pl/ajax/' + relogType, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: `h2=${hs3Cookie}&security=true`,
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        credentials: 'include',
                    }).then(relog)
                } else relog()
            }
            Engine.changePlayer.onError = async () => {
                const margonemLocalStorage = JSON.parse(localStorage.getItem("Margonem"))
                let charList = []
                await Engine.crossStorage.storage
                    .onConnect()
                    .then(() => Engine.crossStorage.get('charlist'))
                    .then((accountIds) => {
                        accountIds = JSON.parse(accountIds)
                        if (accountIds != null) {
                            for (const [key, value] of Object.entries(accountIds)) {
                                charList = [...charList, ...value]
                            }
                            if (accountIds[accountId] != null) {
                                if (!deepEqual(accountIds[accountId], margonemLocalStorage.charlist[accountId])) {
                                    accountIds[accountId] = margonemLocalStorage.charlist[accountId]
                                    Engine.crossStorage.set('charlist', accountIds)
                                }
                            } else {
                                accountIds[accountId] = margonemLocalStorage.charlist[accountId]
                                Engine.crossStorage.set('charlist', accountIds)
                            }

                        } else {
                            for (const [key, value] of Object.entries(margonemLocalStorage.charlist)) {
                                charList = [...charList, ...value]
                            }
                            Engine.crossStorage.set('charlist', margonemLocalStorage.charlist)
                        }
                    })
                charList.length ? Engine.changePlayer.onSuccess(charList) : this.setErrorLabel()
            }
        } else {
            setTimeout(() => start(), 50)
        }
    }

    start()
})()