(function () {

    const style = document.createElement('style')
    style.innerHTML = `
        .rojvAddonMenu,
        .rojvAddonMenuSettings {
            width: 450px;
            top: 50%;
            left: 50%;
            position: absolute;
            border-radius: 10px;
            border: 1px solid #fff;
            z-index: 300;
            color: #fff;
            padding: 10px;
            font-family: Arial, Helvetica, sans-serif;
            text-shadow: 0 0 5px #000, 0 0 5px #000, 0 0 5px #000, 0 0 5px #000;
            background-color: rgba(85, 12, 12, 0.4);
            transform: translate(-50%, -50%);
        }

        .rojvAddonMenu__header {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            cursor: default;
        }

        .rojvAddonMenu__refresh,
        .rojvAddonMenuSettings__refresh {
            justify-content: center;
            cursor: pointer;
            text-align: center;
            border-radius: 10px;
            border: 1px solid #fff;
            width: min-content;
            padding: 5px 7px;
            white-space: nowrap;
            margin: 0 auto;
            background-color: rgba(85, 12, 12, 0.6);
        }

        .rojvAddonMenuSettings__informChatCustomButton {
            cursor: pointer;
            border-radius: 10px;
            border: 1px solid #fff;
            width: min-content;
            padding: 3px 7px;
            white-space: nowrap;
            margin-left: 5px;
            background-color: rgba(85, 12, 12, 0.6);
        }

        .rojvAddonMenu__refresh:hover,
        .rojvAddonMenuSettings__refresh:hover,
        .rojvAddonMenuSettings__informChatCustomButton:hover {
            text-shadow: 0 0 5px #ff0000, 0 0 5px #ff0000, 0 0 5px #fff, 0 0 5px #fff;
            background-color: rgba(85, 12, 12, 1);
        }

        .rojvAddonMenuSettings__header {
            font-size: 10px;
            font-weight: bold;
            display: flex;
            cursor: default;
        }

        .rojvAddonMenu__header.active,
        .rojvAddonMenuSettings__header.active {
            cursor: move;
            user-select: none;
        }

        .rojvAddonMenu__title,
        .rojvAddonMenuSettings__title {
            margin: 0 auto;
        }

        .rojvAddonMenu__close,
        .rojvAddonMenuSettings__close {
            position: absolute;
            cursor: pointer;
            right: 10px;
        }

        .rojvAddonMenu__close:hover,
        .rojvAddonMenuSettings__close:hover {
            text-shadow: 0 0 5px #70004b;
        }

        .rojvAddonMenu__item {
            list-style-type: none;
            margin-bottom: 15px;
        }

        .rojvAddonMenu__label {
            margin-left: 5px;
        }

        .rojvAddonMenu__settings {
            margin-left: 5px;
            cursor: pointer;
        }

        .rojvAddonMenu__input[type='number'] {
            width: 50px;
        }

        .rojvAddonMenu__settings:hover {
            text-shadow: 0 0 5px #ff0000, 0 0 5px #ff0000, 0 0 5px #fff, 0 0 5px #fff;
        }

        .rojvAddonMenu__toggle {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 17px;
        }

        .rojvAddonMenu__checkbox {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .rojvAddonMenu__slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 17px;
        }

        .rojvAddonMenu__slider:before {
            position: absolute;
            content: '';
            height: 13px;
            width: 13px;
            left: 3px;
            bottom: 2px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 50%;
        }

        .rojvAddonMenu__toggle > input:checked + .rojvAddonMenu__slider {
            background-color: #70004b;
        }

        .rojvAddonMenu__toggle > input:focus + .rojvAddonMenu__slider {
            box-shadow: 0 0 1px #70004b;
        }

        .rojvAddonMenu__toggle > input:checked + .rojvAddonMenu__slider:before {
            -webkit-transform: translateX(11px);
            -ms-transform: translateX(11px);
            transform: translateX(11px);
        }
    `
    document.head.appendChild(style)

    const interface = (function () {
        if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
            return 'new'
        } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
            return 'old'
        }
    })()

    const initRojvAddonPanelButton = () => {
        if (interface == 'new') {
            if (Engine && Engine.allInit) {
                const _oldToggle = Engine.settings.toggle
                Engine.settings.toggle = function () {
                    const ret = _oldToggle.apply(this, arguments)
                    createRojvAddonPanelButton()
                    return ret
                }
            } else {
                setTimeout(() => initRojvAddonPanelButton(), 50)
            }
        }
    }

    initRojvAddonPanelButton()

    const createRojvAddonPanelButton = () => {
        if (!$('.rojv-addons-panel-selction').length) {
            let settings = $('.settings-window .hero-options-config .scroll-pane')
            let rojvAddonPanel = document.createElement('div')
            rojvAddonPanel.classList.add('seccond-c', 'rojv-addons-panel-selction')

            let header = document.createElement('h2')
            header.classList.add('settings-addons')
            header.innerHTML = '<span>Rojv Addons Panel</span>'
            rojvAddonPanel.appendChild(header)

            let list = document.createElement('ul')
            list.classList.add('hero-options')
            list.innerHTML = '<li><span class="label">Otwórz ustawienia</span></li>'
            list.addEventListener('click', () => toggleRojvAddonMenu())
            rojvAddonPanel.appendChild(list)
            $(settings).append(rojvAddonPanel)
        }
    }

    const defaultConfig = {
        addons: {
            'autoheal-fixed': {
                name: 'Autoheal Fixed',
                description: 'Autoheal Fixed',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/autoheal-fixed.js',
                interface: 'new',
                settings: {
                    'not-use-point-hp': {
                        name: 'Nie używaj punktowego leczenia',
                        description: 'Nie używaj punktowego leczenia',
                        value: false,
                        type: 'checkbox'
                    },
                    'not-use-full-hp': {
                        name: 'Nie używaj pełnego leczenia',
                        description: 'Nie używaj pełnego leczenia',
                        value: false,
                        type: 'checkbox'
                    },
                    'not-use-percent-hp': {
                        name: 'Nie używaj procentowego leczenia',
                        description: 'Nie używaj procentowego leczenia',
                        value: false,
                        type: 'checkbox'
                    },
                    'show-hp': {
                        name: 'Pokaż życie',
                        description: 'Pokaż życie',
                        value: true,
                        type: 'checkbox'
                    },
                    'minimum-heal': {
                        name: 'Minimalna wartość leczenia',
                        description: 'Minimalna wartość leczenia',
                        value: 599,
                        type: 'number'
                    },
                    'minimum-life-to-heal-percent': {
                        name: 'Minimalny procent życia do uleczenia',
                        description: 'Minimalny procent życia do uleczenia',
                        value: 30,
                        type: 'number'
                    },
                    'excluded-items': {
                        name: 'Wykluczone przedmioty',
                        description: 'Wykluczone przedmioty',
                        value: ["Sok z Gumijagód", "Wytrawny chrabąszcz"],
                        type: 'array'
                    }
                },
                active: false
            },
            'clan-members-online-fixed': {
                name: 'Clan Members Online Fixed',
                description: 'Clan Members Online Fixed',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/clan-members-online-fixed.js',
                interface: 'new',
                settings: false,
                active: false
            },
            'colors-of-linked-items': {
                name: 'Colors of Linked Items',
                description: 'Colors of Linked Items',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/colors-of-linked-items.js',
                interface: 'new',
                settings: {
                    'common-item': {
                        name: 'Zwykły przedmiot',
                        description: 'Zwykły przedmiot',
                        value: '#9da1a7',
                        type: 'color'
                    },
                    'unique-item': {
                        name: 'Unikalny przedmiot',
                        description: 'Unikalny przedmiot',
                        value: '#fffb00',
                        type: 'color'
                    },
                    'heroic-item': {
                        name: 'Heroiczny przedmiot',
                        description: 'Heroiczny przedmiot',
                        value: '#38b8eb',
                        type: 'color'
                    },
                    'upgraded-item': {
                        name: 'Ulepszony przedmiot',
                        description: 'Ulepszony przedmiot',
                        value: '#ff59af',
                        type: 'color'
                    },
                    'legendary-item': {
                        name: 'Legendarny przedmiot',
                        description: 'Legendarny przedmiot',
                        value: '#ff8400',
                        type: 'color'
                    },
                    'nick': {
                        name: 'Nick',
                        description: 'Nick',
                        value: '#ffa500',
                        type: 'color'
                    },
                    'division-of-loot': {
                        name: 'Podział łupu',
                        description: 'Podział łupu',
                        value: '#ccffcc',
                        type: 'color'
                    }
                },
                active: false
            },
            'enhancement-upgrade-lvl': {
                name: 'Enhancement Upgrade Lvl',
                description: 'Enhancement Upgrade Lvl',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/enhancement-upgrade-lvl.js',
                interface: 'new',
                settings: {
                    'enhancement-upgrade-lvl-1': {
                        name: 'Poziom ulepszenia Lvl 1',
                        description: 'Poziom ulepszenia Lvl 1',
                        value: '#9da1a7',
                        type: 'color'
                    },
                    'enhancement-upgrade-lvl-2': {
                        name: 'Poziom ulepszenia Lvl 2',
                        description: 'Poziom ulepszenia Lvl 2',
                        value: '#fffb00',
                        type: 'color'
                    },
                    'enhancement-upgrade-lvl-3': {
                        name: 'Poziom ulepszenia Lvl 3',
                        description: 'Poziom ulepszenia Lvl 3',
                        value: '#38b8eb',
                        type: 'color'
                    },
                    'enhancement-upgrade-lvl-4': {
                        name: 'Poziom ulepszenia Lvl 4',
                        description: 'Poziom ulepszenia Lvl 4',
                        value: '#ff59af',
                        type: 'color'
                    },
                    'enhancement-upgrade-lvl-5': {
                        name: 'Poziom ulepszenia Lvl 5',
                        description: 'Poziom ulepszenia Lvl 5',
                        value: '#ff8400',
                        type: 'color'
                    }
                },
                active: false
            },
            'groove-heros-fix': {
                name: 'Inform Chat',
                description: 'Inform Chat',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/groove-heros-fix.js',
                interface: 'new',
                settings: false,
                active: false
            },
            'inform-chat': {
                name: 'Inform Chat',
                description: 'Inform Chat',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/inform-chat.js',
                interface: 'new/old',
                settings: false,
                active: false
            },
            'local-chat-by-default': {
                name: 'Local Chat by Default',
                description: 'Local Chat by Default',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/local-chat-by-default.js',
                interface: 'new',
                settings: false,
                active: false
            },
            'relog-enhancer': {
                name: 'Relog Enhancer',
                description: 'Relog Enhancer',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/relog-enhancer.js',
                interface: 'new',
                settings: false,
                active: false
            },
            'rewards-calendar-reminder': {
                name: 'Rewards Calendar Reminder',
                description: 'Rewards Calendar Reminder',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/rewards-calendar-reminder.js',
                interface: 'new/old',
                settings: false,
                active: false
            },
            'unlag-invite': {
                name: 'Unlag Invite',
                description: 'Unlag Invite',
                url: 'https://raw.githubusercontent.com/B1AL1/rojv-addons-panel/main/addons/unlag-invite.js',
                interface: 'new/old',
                settings: false,
                active: false
            }
        },
        version: '1.0.0'
    }

    let rojvAddonMenuLocalStorage = JSON.parse(localStorage.getItem('rojvAddonMenu'))
    if (!rojvAddonMenuLocalStorage) {
        rojvAddonMenuLocalStorage = defaultConfig
        localStorage.setItem('rojvAddonMenu', JSON.stringify(rojvAddonMenuLocalStorage))
    }

    const loadAddon = async (addons) => {
        for (let addon in addons) {
            if (addons[addon].active && addons[addon].interface.includes(interface)) {
                await fetch(addons[addon].url)
                    .then(res => res.blob())
                    .then(blob => {
                        var objectURL = URL.createObjectURL(blob)
                        var sc = document.createElement("script")
                        sc.setAttribute("src", objectURL)
                        sc.setAttribute("type", "text/javascript")
                        document.head.appendChild(sc)
                    })
            }
        }
    }

    loadAddon(rojvAddonMenuLocalStorage.addons)

    const onDrag = (event) => {
        let element = event.target.offsetParent
        let movementX = event.movementX
        let movementY = event.movementY
        let getStyle = window.getComputedStyle(element)
        let left = parseInt(getStyle.left)
        let top = parseInt(getStyle.top)
        element.style.left = `${left + movementX}px`
        element.style.top = `${top + movementY}px`
        element.addEventListener('mouseup', () => {
            element.classList.remove('active')
            element.removeEventListener('mousemove', onDrag)
        })
    }

    function toggleRojvAddonMenu() {
        const addonMenu = document.querySelector(`.rojvAddonMenu`)
        if (addonMenu) {
            addonMenu.remove()
            return
        }
        const rojvAddonMenu = document.createElement('div')
        rojvAddonMenu.classList.add('rojvAddonMenu')

        const rojvAddonMenu__header = document.createElement('div')
        rojvAddonMenu__header.classList.add('rojvAddonMenu__header')

        const rojvAddonMenu__title = document.createElement('h2')
        rojvAddonMenu__title.classList.add('rojvAddonMenu__title')
        rojvAddonMenu__title.innerText = 'Rojv Addon Menu'
        rojvAddonMenu__header.appendChild(rojvAddonMenu__title)

        const rojvAddonMenu__close = document.createElement('div')
        rojvAddonMenu__close.classList.add('rojvAddonMenu__close')
        rojvAddonMenu__close.innerText = '❌'
        rojvAddonMenu__close.addEventListener('click', () => toggleRojvAddonMenu())
        rojvAddonMenu__header.appendChild(rojvAddonMenu__close)

        rojvAddonMenu__header.addEventListener('mousedown', () => {
            rojvAddonMenu__header.classList.add('active')
            rojvAddonMenu__header.addEventListener('mousemove', onDrag)
        })

        rojvAddonMenu__header.addEventListener('mouseup', () => {
            rojvAddonMenu__header.classList.remove('active')
            rojvAddonMenu__header.removeEventListener('mousemove', onDrag)
        })

        rojvAddonMenu.appendChild(rojvAddonMenu__header)

        const rojvAddonMenu__content = document.createElement('div')
        rojvAddonMenu__content.classList.add('rojvAddonMenu__content')
        rojvAddonMenu.appendChild(rojvAddonMenu__content)

        rojvAddonMenu__reloadContent(rojvAddonMenu__content)

        const rojvAddonMenu__refresh = document.createElement('div')
        rojvAddonMenu__refresh.classList.add('rojvAddonMenu__refresh')
        rojvAddonMenu__refresh.innerText = 'Odśwież stronę 🔄'
        rojvAddonMenu__refresh.addEventListener('click', () => location.reload())
        rojvAddonMenu.appendChild(rojvAddonMenu__refresh)

        document.body.appendChild(rojvAddonMenu)
    }

    function rojvAddonMenuSettings__reloadSettings(rojvAddonMenuSettings__content, addon) {
        const settingsList = document.querySelector(`.rojvAddonMenuSettings.${addon} .rojvAddonMenuSettings__list`)
        if (settingsList) {
            settingsList.remove()
        }
        const rojvAddonMenuSettings__list = document.createElement('ul')
        rojvAddonMenuSettings__list.classList.add('rojvAddonMenuSettings__list')

        for (let setting in rojvAddonMenuLocalStorage.addons[addon].settings) {
            let li = document.createElement('li')
            li.classList.add('rojvAddonMenu__item')

            let input = document.createElement('input')
            input.classList.add('rojvAddonMenu__input')
            if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'checkbox') {
                input.type = rojvAddonMenuLocalStorage.addons[addon].settings[setting].type
                input.checked = rojvAddonMenuLocalStorage.addons[addon].settings[setting].value
            }
            if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'number') {
                input.type = rojvAddonMenuLocalStorage.addons[addon].settings[setting].type
                input.value = rojvAddonMenuLocalStorage.addons[addon].settings[setting].value
            }
            if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'array') {
                input.value = rojvAddonMenuLocalStorage.addons[addon].settings[setting].value.join(', ')
            }
            if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'color') {
                input.type = rojvAddonMenuLocalStorage.addons[addon].settings[setting].type
                input.value = rojvAddonMenuLocalStorage.addons[addon].settings[setting].value
            }
            input.addEventListener('change', () => {
                if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'checkbox') {
                    rojvAddonMenuLocalStorage.addons[addon].settings[setting].value = input.checked
                }
                if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'number') {
                    rojvAddonMenuLocalStorage.addons[addon].settings[setting].value = input.value
                }
                if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'array') {
                    rojvAddonMenuLocalStorage.addons[addon].settings[setting].value = input.value.split(', ')
                }
                if (rojvAddonMenuLocalStorage.addons[addon].settings[setting].type == 'color') {
                    rojvAddonMenuLocalStorage.addons[addon].settings[setting].value = input.value
                }
                localStorage.setItem('rojvAddonMenu', JSON.stringify(rojvAddonMenuLocalStorage))
            })
            li.appendChild(input)

            let label = document.createElement('label')
            label.classList.add('rojvAddonMenu__label')
            label.innerText = rojvAddonMenuLocalStorage.addons[addon].settings[setting].name
            li.appendChild(label)

            rojvAddonMenuSettings__list.appendChild(li)
        }

        rojvAddonMenuSettings__content.appendChild(rojvAddonMenuSettings__list)
    }


    function rojvAddonMenu__reloadContent(content) {
        const addonsList = document.querySelector('.rojvAddonMenu__list')
        if (addonsList) {
            addonsList.remove()
        }
        const rojvAddonMenu__list = document.createElement('ul')
        rojvAddonMenu__list.classList.add('rojvAddonMenu__list')
        for (let addon in rojvAddonMenuLocalStorage.addons) {
            if (rojvAddonMenuLocalStorage.addons[addon].interface.includes(interface)) {
                let li = document.createElement('li')
                li.classList.add('rojvAddonMenu__item')

                let toggle = document.createElement('label')
                toggle.classList.add('rojvAddonMenu__toggle')
                li.appendChild(toggle)

                let checkbox = document.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.classList.add('rojvAddonMenu__checkbox')
                checkbox.checked = rojvAddonMenuLocalStorage.addons[addon].active
                checkbox.addEventListener('change', () => {
                    rojvAddonMenuLocalStorage.addons[addon].active = checkbox.checked
                    localStorage.setItem('rojvAddonMenu', JSON.stringify(rojvAddonMenuLocalStorage))
                })
                toggle.appendChild(checkbox)

                let slider = document.createElement('span')
                slider.classList.add('rojvAddonMenu__slider')
                toggle.appendChild(slider)

                let label = document.createElement('span')
                label.classList.add('rojvAddonMenu__label')
                label.innerText = rojvAddonMenuLocalStorage.addons[addon].name
                li.appendChild(label)

                if (rojvAddonMenuLocalStorage.addons[addon].settings) {
                    let settings = document.createElement('span')
                    settings.classList.add('rojvAddonMenu__settings')
                    settings.innerText = '⚙️'
                    settings.addEventListener('click', () => rojvAddonMenu__toggleSettings(addon))
                    li.appendChild(settings)
                }

                if (addon == 'relog-enhancer') {
                    const rojvAddonMenuSettings__informChatCustomButton = document.createElement('div')
                    rojvAddonMenuSettings__informChatCustomButton.classList.add('rojvAddonMenuSettings__informChatCustomButton')
                    rojvAddonMenuSettings__informChatCustomButton.innerText = 'Zresetuj postacie'
                    rojvAddonMenuSettings__informChatCustomButton.addEventListener('click', () => {
                        Engine.crossStorage.set('charlist', null)
                        let margonemLocalStorage = JSON.parse(localStorage.getItem("Margonem"))
                        margonemLocalStorage.charlist = {}
                        localStorage.setItem("Margonem", JSON.stringify(margonemLocalStorage))
                    })
                    li.style.display = 'flex'
                    li.appendChild(rojvAddonMenuSettings__informChatCustomButton)
                }

                rojvAddonMenu__list.appendChild(li)
            }
        }

        content.appendChild(rojvAddonMenu__list)
    }

    function rojvAddonMenu__toggleSettings(addon) {
        let addonSettings = document.querySelector(`.rojvAddonMenuSettings.${addon}`)
        if (addonSettings) {
            addonSettings.remove()
            return
        }
        const rojvAddonMenuSettings = document.createElement('div')
        rojvAddonMenuSettings.classList.add('rojvAddonMenuSettings', `${addon}`)

        const rojvAddonMenuSettings__header = document.createElement('div')
        rojvAddonMenuSettings__header.classList.add('rojvAddonMenuSettings__header')

        rojvAddonMenuSettings__header.addEventListener('mousedown', () => {
            rojvAddonMenuSettings__header.classList.add('active')
            rojvAddonMenuSettings__header.addEventListener('mousemove', onDrag)
        })

        rojvAddonMenuSettings__header.addEventListener('mouseup', () => {
            rojvAddonMenuSettings__header.classList.remove('active')
            rojvAddonMenuSettings__header.removeEventListener('mousemove', onDrag)
        })

        const rojvAddonMenuSettings__title = document.createElement('h2')
        rojvAddonMenuSettings__title.classList.add('rojvAddonMenuSettings__title')
        rojvAddonMenuSettings__title.innerText = rojvAddonMenuLocalStorage.addons[addon].name
        rojvAddonMenuSettings__header.appendChild(rojvAddonMenuSettings__title)

        const rojvAddonMenuSettings__close = document.createElement('div')
        rojvAddonMenuSettings__close.classList.add('rojvAddonMenuSettings__close')
        rojvAddonMenuSettings__close.innerText = '❌'
        rojvAddonMenuSettings__close.addEventListener('click', () => {
            rojvAddonMenuSettings.remove()
        })
        rojvAddonMenuSettings__header.appendChild(rojvAddonMenuSettings__close)

        rojvAddonMenuSettings.appendChild(rojvAddonMenuSettings__header)

        const rojvAddonMenuSettings__content = document.createElement('div')
        rojvAddonMenuSettings__content.classList.add('rojvAddonMenuSettings__content')
        rojvAddonMenuSettings.appendChild(rojvAddonMenuSettings__content)

        rojvAddonMenuSettings__reloadSettings(rojvAddonMenuSettings__content, addon)

        const rojvAddonMenuSettings__refresh = document.createElement('div')
        rojvAddonMenuSettings__refresh.classList.add('rojvAddonMenuSettings__refresh')
        rojvAddonMenuSettings__refresh.innerText = 'Zresetuj ustawienia'
        rojvAddonMenuSettings__refresh.addEventListener('click', () => {
            rojvAddonMenuLocalStorage.addons[addon].settings = defaultConfig.addons[addon].settings
            localStorage.setItem('rojvAddonMenu', JSON.stringify(rojvAddonMenuLocalStorage))
            rojvAddonMenuSettings__reloadSettings(rojvAddonMenuSettings__content, addon)
            const element = document.querySelector(`.rojvAddonMenu__content`)
            rojvAddonMenu__reloadContent(element)
        })
        rojvAddonMenuSettings.appendChild(rojvAddonMenuSettings__refresh)

        document.body.appendChild(rojvAddonMenuSettings)
    }
})()