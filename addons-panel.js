(async () => {
    const waitFor = async (callback, retryMs, retryCount) => {
        let timeout = retryCount
        while (timeout > 0) {
            if (callback()) {
                return
            }
            await new Promise(resolve => setTimeout(resolve, retryMs))
            timeout -= 1
        }
    }

    const forInterface = (newInterface, oldInterface) => {
        if (newInterface) {
            return newInterface
        } else if (oldInterface) {
            return oldInterface
        }
    }

    const forClan = (clan) => {
        if (clan) {
            return true
        }
    }

    const forSettings = (settings) => {
        if (settings) {
            return settings
        }
    }

    const forLocationItems = (locationItems) => {
        if (locationItems.length > 0) {
            return locationItems
        }
    }

    const forChangePlayer = (changePlayer) => {
        if (changePlayer) {
            return changePlayer
        }
    }

    const parseItemStats = (item) => {
        if (typeof item.stat === 'string') {
            item.parsedStats = item.stat.split(';').reduce((acc, curr) => {
                const [key, value] = curr.split('=')
                acc[key] = value
                return acc
            }, {})
        } else {
            item.parsedStats = item.stat
        }
    }

    const isObject = (object) => {
        return object != null && typeof object === 'object'
    }

    const deepEqual = (object1, object2) => {
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

    await waitFor(() => forInterface(window.Engine && window.Engine.communication, window.g && window.parseInput), 50, 300)

    const version = '20240213'

    let rojvStorage = document.rojvPanel.GM_getValue('rojv-storage')
    if (!rojvStorage) {
        rojvStorage = {
            addons: {},
            version: version
        }
        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
    }

    if (rojvStorage.version != version) {
        rojvStorage.version = version
        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
    }

    const interfaceType = (() => {
        if (typeof Engine != 'undefined') {
            return 'new'
        } else if (typeof g != 'undefined') {
            return 'old'
        }
    })()

    const checkAddonAvailability = (addon) => {
        if (rojvStorage.addons[addon] && rojvStorage.addons[addon].active && (addons[addon].interface === interfaceType || addons[addon].interface === 'both')) {
            return true
        }
        return false
    }


    const WindowTypeEnum = {
        Classic: 'rojv-window',
        Clear: 'clear-rojv-window'
    }

    const addons = {
        'diverse-colors-on-chat': {
            name: 'Diverse Colors On The Chat',
            description: 'Diverse Colors on the Chat',
            interface: 'new',
            settings: true
        },
        'enhancement-upgrade-lvl': {
            name: 'Enhancement Upgrade Lvl',
            description: 'Enhancement Upgrade Lvl',
            interface: 'new',
            settings: true
        },
        'inform-chat': {
            name: 'Inform Chat',
            description: 'Inform Chat',
            interface: 'both',
            settings: false
        },
        'relog-enhancer': {
            name: 'Relog Enhancer',
            description: 'Relog Enhancer',
            interface: 'new',
            settings: false
        },
        'unlag-invite': {
            name: 'Unlag Invite',
            description: 'Unlag Invite',
            interface: 'both',
            settings: false
        },
        'highlight-groups': {
            name: 'Highlight Groups',
            description: 'Highlight Groups',
            interface: 'new',
            settings: false
        },
        'elite-designation': {
            name: 'Elite Designation',
            description: 'Elite Designation',
            interface: 'new',
            settings: false
        }
    }

    const defaultConfig = {
        addons: {
            'diverse-colors-on-chat': {
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
            'enhancement-upgrade-lvl': {
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
            }
        }
    }

    const generateAddonsList = (addons) => {
        const addonsList = document.createElement('ul')
        addonsList.className = 'rojv-addons__list'
        for (let addon in addons) {
            if (addons[addon].interface !== interfaceType && addons[addon].interface != 'both') continue

            let li = document.createElement('li')
            li.className = 'rojv-addons__item'

            let toggle = document.createElement('label')
            toggle.className = 'rojv-control rojv-control--toggle'
            li.appendChild(toggle)

            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className = 'rojv-control rojv-control--checkbox'
            checkbox.checked = rojvStorage.addons[addon]?.active

            checkbox.addEventListener('change', () => {
                rojvStorage.addons[addon] ? rojvStorage.addons[addon].active = checkbox.checked : rojvStorage.addons[addon] = { active: checkbox.checked }
            })
            toggle.appendChild(checkbox)

            let slider = document.createElement('span')
            slider.className = 'rojv-control--slider'
            toggle.appendChild(slider)

            let label = document.createElement('span')
            label.className = 'rojv-window__label'
            label.innerText = addons[addon].name
            li.appendChild(label)

            if (addons[addon].settings && rojvStorage.addons[addon]?.active == true) {
                let settings = document.createElement('span')
                settings.className = 'rojv-control rojv-control--settings'
                settings.innerText = '⚙️'
                settings.addEventListener('click', () => {
                    let existingSettingsWindow = document.querySelector(`.${addon}`)
                    if (existingSettingsWindow) {
                        existingSettingsWindow.remove()
                        return
                    }

                    const settingsWindow = new RojvWindow({
                        header: {
                            title: {
                                text: addons[addon].name,
                                fontSize: 16
                            },
                            closeable: true
                        },
                        draggable: true,
                        windowClass: addon,
                        footer: {
                            buttons: [
                                {
                                    text: 'Przywróć domyślne',
                                    onClick: () => {
                                        rojvStorage.addons[addon].settings = defaultConfig.addons[addon]
                                        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                                        settingsWindow.getContainer().remove()
                                    }
                                }
                            ]
                        }
                    })

                    let settings = { ...defaultConfig.addons[addon], ...rojvStorage.addons[addon].settings }
                    const settingsList = document.createElement('ul')
                    settingsList.className = 'rojv-addon-settings__list'
                    for (let setting in settings) {
                        let li = document.createElement('li')
                        li.className = 'rojv-addon-settings__item'

                        let input = document.createElement('input')
                        input.className = 'rojv-window__input'
                        if (settings[setting].type == 'checkbox') {
                            input.type = settings[setting].type
                            input.checked = settings[setting].value
                        }
                        if (settings[setting]?.type == 'number') {
                            input.type = settings[setting].type
                            input.value = settings[setting].value
                        }
                        if (settings[setting].type == 'array') {
                            input.value = settings[setting].value.join(', ')
                        }
                        if (settings[setting].type == 'color') {
                            input.type = settings[setting].type
                            input.value = settings[setting].value
                        }
                        input.addEventListener('change', () => {
                            if (settings[setting].type == 'checkbox') {
                                rojvStorage.addons[addon].settings ? rojvStorage.addons[addon].settings[setting].value = input.checked : rojvStorage.addons[addon].settings = { [setting]: settings[setting] }
                            }
                            if (settings[setting].type == 'number') {
                                rojvStorage.addons[addon].settings ? rojvStorage.addons[addon].settings[setting].value = input.value : rojvStorage.addons[addon].settings = { [setting]: settings[setting] }
                            }
                            if (settings[setting].type == 'color') {
                                rojvStorage.addons[addon].settings ? rojvStorage.addons[addon].settings[setting].value = input.value : rojvStorage.addons[addon].settings = { [setting]: settings[setting] }
                            }
                            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                        }
                        )
                        li.appendChild(input)

                        let label = document.createElement('label')
                        label.className = 'rojv-window__label'
                        label.innerText = settings[setting].name
                        li.appendChild(label)

                        settingsList.appendChild(li)
                    }
                    settingsWindow.addContent(settingsList)
                }
                )
                li.appendChild(settings)
            }

            addonsList.appendChild(li)
        }

        return addonsList
    }

    const generateNews = () => {
        const newsList = document.createElement('ul')
        newsList.className = 'rojv-news__list'

        const versionItem = document.createElement('li')
        versionItem.className = 'rojv-news__item'
        versionItem.innerText = 'Wersja: ' + version
        newsList.appendChild(versionItem)

        const profile = document.createElement('li')
        profile.className = 'rojv-news__item'

        const profileText = document.createElement('span')
        profileText.innerHTML = 'Profil:&nbsp;'
        profile.appendChild(profileText)

        const profileLink = document.createElement('a')
        profileLink.className = 'rojv-link'
        profileLink.href = 'https://www.margonem.pl/profile/view,4203975'
        profileLink.target = '_blank'
        profileLink.innerText = 'Rojvenos'
        profile.appendChild(profileLink)

        newsList.appendChild(profile)

        return newsList
    }

    const generateSettings = () => {
        const settingsList = document.createElement('ul')
        settingsList.className = 'rojv-general_settings__list'

        const settingsItem = document.createElement('li')
        settingsItem.className = 'rojv-general_settings__item'
        settingsItem.innerText = 'Może kiedyś coś tu będzie...'
        settingsList.appendChild(settingsItem)

        return settingsList
    }

    const mainWindowNavigationItems = {
        addons: { name: 'Dodatki', active: true, content: generateAddonsList(addons), isFooter: true },
        news: { name: 'Aktualności', content: generateNews(), isFooter: false },
        settings: { name: 'Ustawienia', content: generateSettings(), isFooter: false }
    }

    class RojvWindow {
        constructor({
            windowType = WindowTypeEnum.Classic,
            windowClass,
            width = 400,
            header,
            parentElement = document.body,
            managePosition,
            draggable,
            footer,
            navigationItems
        } = {}) {
            this.container = this.createElement('div', windowType, windowClass)
            this.container.style.width = `${width}px`

            this.header = this.createElement('div', 'rojv-window__header')
            this.menuLeft = this.createElement('div', 'rojv-window__menu')
            this.menuRight = this.createElement('div', 'rojv-window__menu')

            this.title = header?.title ? this.createTitle(header.title) : null

            if (this.title) this.header.append(this.menuLeft, this.title, this.menuRight)
            else this.header.append(this.menuLeft, this.menuRight)
            this.container.append(this.header, this.createContent(), this.createFooter())

            this.closeable = header?.closeable ? this.createCloseButton() : false

            parentElement.appendChild(this.container)

            if (managePosition) {
                this.container.style.left = `${managePosition.x}px`
                this.container.style.top = `${managePosition.y}px`
            }

            if (draggable) {
                let draggableElement = header?.title ? this.title : this.closeable ? this.header : this.content
                this.makeDraggable(draggableElement)
            }

            if (footer?.buttons) {
                for (let button of footer.buttons) {
                    this.addFooter(this.createButton(button))
                }
            }

            if (navigationItems) this.navigation = this.generateNavigation(navigationItems)
        }

        makeDraggable(draggableElement) {
            this.isMoving = false
            let halfElementWidth, halfElementHeight

            const handleDrag = (event) => {
                if (!this.isMoving) return

                const { movementX, movementY, target: { offsetParent: element } } = event
                const maxLeft = window.innerWidth - halfElementWidth
                let left = parseFloat(window.getComputedStyle(element).left)
                let top = parseFloat(window.getComputedStyle(element).top)

                if (left + movementX > halfElementWidth && left + movementX < maxLeft) {
                    element.style.left = `${left + movementX}px`
                }
                if (top + movementY > halfElementHeight && top + movementY < window.innerHeight - halfElementHeight) {
                    element.style.top = `${top + movementY}px`
                }
            }

            const startDrag = () => {
                this.isMoving = true
                draggableElement.classList.add('active')

                const getStyle = window.getComputedStyle(this.container)
                const elementWidth = parseFloat(getStyle.width) + parseFloat(getStyle.paddingLeft) + parseFloat(getStyle.paddingRight) + parseFloat(getStyle.borderLeftWidth) + parseFloat(getStyle.borderRightWidth)
                const elementHeight = parseFloat(getStyle.height) + parseFloat(getStyle.paddingTop) + parseFloat(getStyle.paddingBottom) + parseFloat(getStyle.borderTopWidth) + parseFloat(getStyle.borderBottomWidth)
                halfElementWidth = elementWidth / 2
                halfElementHeight = elementHeight / 2
            }
            const stopDrag = () => {
                this.isMoving = false
                draggableElement.classList.remove('active')
            }

            this.draggableElementListeners = { startDrag, handleDrag, stopDrag }

            draggableElement.addEventListener('mousedown', startDrag)
            draggableElement.addEventListener('mousemove', handleDrag)
            draggableElement.addEventListener('mouseup', stopDrag)
            draggableElement.addEventListener('mouseleave', stopDrag)
        }

        createElement(tag, className, additionalClass) {
            const element = document.createElement(tag)
            element.className = className
            if (additionalClass) element.classList.add(additionalClass)
            return element
        }

        createTitle({ text = '', fontSize = 10 }) {
            const title = this.createElement('div', 'rojv-window__title')
            title.innerText = text
            title.style.fontSize = `${fontSize}px`
            return title
        }

        createContent() {
            this.content = this.createElement('div', 'rojv-window__content')
            return this.content
        }

        createFooter() {
            this.footer = this.createElement('div', 'rojv-window__footer')
            return this.footer
        }

        createCloseButton() {
            this.closeButton = this.createElement('div', 'rojv-control rojv-control--close')
            this.closeButton.innerText = '❌'
            this.closeButton.addEventListener('click', () => this.onClose())
            this.menuRight.appendChild(this.closeButton)
            return true
        }

        createButton({ text, onClick }) {
            let buttonElement = this.createElement('button', 'rojv-control rojv-control--button')
            buttonElement.innerText = text
            buttonElement.addEventListener('click', onClick.bind(this))
            return buttonElement
        }

        addFooter(element) {
            this.footer.appendChild(element)
        }

        addContent(element) {
            this.content.appendChild(element)
        }

        setWidth(width) {
            this.container.style.width = `${width}px`
        }

        onClose() {
            this.container.remove()
        }

        toggleVisibility(element) {
            element.classList.toggle('rojv-invisible')
        }

        getContainer() {
            return this.container
        }

        getFooter() {
            return this.footer
        }

        getContent() {
            return this.content
        }

        getHeader() {
            return this.header
        }

        getTitle() {
            return this.title
        }

        getMenuLeft() {
            return this.menuLeft
        }

        getMenuRight() {
            return this.menuRight
        }

        getPosition() {
            return {
                x: parseInt(this.container.style.left),
                y: parseInt(this.container.style.top)
            }
        }

        onChangesPosition(callback) {
            this.container.addEventListener('mouseup', () => {
                callback(this.getPosition())
            })
        }

        generateNavigation(navigationItems) {
            const navigation = this.createElement('div', 'rojv-addons__navigation')
            this.container.insertBefore(navigation, this.content)
            for (let item in navigationItems) {
                let navigationItem = this.createElement('div', 'rojv-addons__navigation__item', navigationItems[item].name)
                navigationItem.innerText = navigationItems[item].name
                if (navigationItems[item].active) navigationItem.classList.add('rojv-addons__navigation__item--active')

                navigationItem.addEventListener('click', () => {
                    if (navigationItems[item].active) return
                    for (let item in navigationItems) {
                        navigationItems[item].active = false
                        navigation.querySelectorAll(`.rojv-addons__navigation__item--active`).forEach(
                            (element) => element.classList.remove('rojv-addons__navigation__item--active')
                        )
                    }

                    navigationItems[item].active = true
                    navigationItem.classList.add('rojv-addons__navigation__item--active')

                    this.getContent().innerHTML = ''
                    this.addContent(navigationItems[item].content)

                    this.getFooter().style.display = navigationItems[item].isFooter ? 'flex' : 'none'
                })
                navigation.appendChild(navigationItem)

                if (navigationItems[item].active) this.addContent(navigationItems[item].content)
            }

            return navigation
        }
    }

    window.RojvAPI = {}

    const actionBefore = (obj, key, clb, exArgs = []) => {
        const _method = obj[key]

        obj[key] = function (...args) {
            const fullArgs = [...args, ...exArgs]

            if (!clb.apply(this, fullArgs)) {
                return _method.apply(this, args)
            }
        }
    }

    const actionAfter = (obj, key, clb, exArgs = []) => {
        const _method = obj[key]

        obj[key] = function (...args) {
            const fullArgs = [...args, ...exArgs]
            const ret = _method.apply(this, args)

            clb.apply(this, fullArgs)

            return ret
        }
    }

    class EventEmitter {
        constructor() {
            this.events = {}
        }

        on(eventName, listener) {
            if (!this.events[eventName]) {
                this.events[eventName] = []
            }
            this.events[eventName].push(listener)
        }

        once(eventName, listener) {
            const onceWrapper = (data) => {
                listener(data)
                this.off(eventName, onceWrapper)
            }
            this.on(eventName, onceWrapper)
        }

        emit(eventName, data) {
            if (this.events[eventName]) {
                this.events[eventName].forEach(listener => {
                    listener(data)
                })
            }
        }

        off(eventName, listener) {
            if (this.events[eventName]) {
                this.events[eventName] = this.events[eventName].filter(existingListener => existingListener !== listener)
            }
        }
    }

    const emitter = new EventEmitter()

    window.RojvAPI.emitter = emitter

    const emitEvents = (data, before) => {
        for (let i in data) {
            emitter.emit((before ? "before-" : "") + i, data[i])
        }
        emitter.emit((before ? "before-" : "") + "game-response", data)
    }

    const requestParserNI = (() => {
        if (interfaceType === 'old') return

        actionAfter(Engine.communication, 'send2', (...data) => {
            if (data[0] != '_') {
                // console.log(...data)
            }
        })

        actionBefore(Engine.communication, 'parseJSON', (data) => {
            emitEvents(data, true)
        })

        actionAfter(Engine.communication, 'parseJSON', (data) => {
            emitEvents(data, false)
        })

        actionAfter(Engine.showEqManager, 'getEqData', (data) => {
            emitter.emit('showOtherEq', data)
        })
    })()

    const requestParserSI = (() => {
        if (interfaceType === 'new') return

        actionBefore(window, 'parseInput', (data) => {
            emitEvents(data, true)
        })

        actionAfter(window, 'parseInput', (data) => {
            emitEvents(data, false)
        })
    })()


    const initRojvAddonPanelButtonNI = (async () => {
        if (interfaceType === 'old') return
        await waitFor(() => forSettings(window.Engine.settings), 50, 3000)
        actionAfter(Engine.settings, 'toggle', () => {
            createRojvAddonPanelButtonNI()
        })
    })()

    const createRojvAddonPanelButtonNI = () => {
        if (document.querySelector('.rojv-addons-panel-selction')) return
        const settings = document.querySelector('.settings-window .hero-options-config .scroll-pane')
        if (!settings) return
        const rojvAddonPanel = document.createElement('div')
        rojvAddonPanel.classList.add('seccond-c', 'rojv-addons-panel-selction')

        const header = document.createElement('h2')
        header.classList.add('settings-addons')
        header.innerHTML = '<span>Rojv Addons Panel</span>'
        rojvAddonPanel.appendChild(header)

        const list = document.createElement('ul')
        list.classList.add('hero-options')
        list.innerHTML = '<li><span class="label">Otwórz ustawienia</span></li>'
        list.addEventListener('click', () => {
            if (document.querySelector('.rojv-window')) {
                document.querySelectorAll('.rojv-window').forEach((element) => element.remove())
                return
            }
            openRojvAddonPanel()
        })
        rojvAddonPanel.appendChild(list)
        settings.appendChild(rojvAddonPanel)
    }

    const openRojvAddonPanel = () => {
        const mainWindow = new RojvWindow({
            width: 900,
            header: {
                closeable: true,
                title: {
                    text: 'Rojv Addon Menu',
                    fontSize: 20
                },
            },
            draggable: true,
            windowType: WindowTypeEnum.Classic,
            footer: {
                buttons: [
                    {
                        text: 'Zapisz',
                        onClick: () => {
                            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                        }
                    },
                    {
                        text: 'Odśwież',
                        onClick: () => {
                            location.reload()
                        }
                    }
                ]
            },
            navigationItems: mainWindowNavigationItems
        })
    }

    window.RojvAPI.openRojvAddonPanel = openRojvAddonPanel

    const loadEnchancementUpgradeLvl = (() => {
        let addonName = 'enhancement-upgrade-lvl'
        if (!checkAddonAvailability(addonName)) return
        let addonsSettings = { ...defaultConfig.addons[addonName], ...rojvStorage.addons[addonName].settings }

        const style = document.createElement('style')
        style.innerHTML = `
        [enhancement-upgrade-lvl] {
            position: relative;
            float: right;
            padding-right: 2px;
            font-size: 10px;
        }
        [enhancement-upgrade-lvl="1"] {
            color: ${addonsSettings['enhancement-upgrade-lvl-1'].value};
        }
        [enhancement-upgrade-lvl="2"] {
            color: ${addonsSettings['enhancement-upgrade-lvl-2'].value};
        }
        [enhancement-upgrade-lvl="3"] {
            color: ${addonsSettings['enhancement-upgrade-lvl-3'].value};
        }
        [enhancement-upgrade-lvl="4"] {
            color: ${addonsSettings['enhancement-upgrade-lvl-4'].value};
        }
        [enhancement-upgrade-lvl="5"] {
            color: ${addonsSettings['enhancement-upgrade-lvl-5'].value};
        }
        [enhancement-upgrade-lvl]>p {
            text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;
        }
    `
        document.head.appendChild(style)

        const cachedItemsEnchancement = new Set()

        const updateItemEnhancement = (item, element) => {
            const enhancementUpgradeElement = element.querySelector('.enhancement-upgrade')
            const enhancementUpgradeLevel = item.parsedStats.enhancement_upgrade_lvl

            if (enhancementUpgradeElement) {
                const currentLevel = enhancementUpgradeElement.getAttribute('enhancement-upgrade-lvl')
                if (currentLevel !== enhancementUpgradeLevel) {
                    enhancementUpgradeElement.setAttribute('enhancement-upgrade-lvl', enhancementUpgradeLevel)
                    enhancementUpgradeElement.innerHTML = `<p>+${enhancementUpgradeLevel}</p>`
                }
            } else {
                const enhancementUpgrade = document.createElement('div')
                enhancementUpgrade.setAttribute('enhancement-upgrade-lvl', enhancementUpgradeLevel)
                enhancementUpgrade.innerHTML = `<p>+${enhancementUpgradeLevel}</p>`
                enhancementUpgrade.classList.add('enhancement-upgrade')
                element.appendChild(enhancementUpgrade)
            }
        }

        const removeItemEnhancement = (element) => {
            if (element.querySelector('.enhancement-upgrade')) {
                element.querySelector('.enhancement-upgrade').remove()
            }
        }

        const addUpgradeLvl = (items) => {
            items.forEach((item) => {
                document.querySelectorAll(`.item-id-${item.id}`).forEach((element) => {
                    if (item.parsedStats.enhancement_upgrade_lvl > 0) {
                        updateItemEnhancement(item, element)
                    } else {
                        removeItemEnhancement(element)
                    }
                })
            })
        }

        RojvAPI.emitter.on('item', items => {
            for (let item in items) {
                parseItemStats(items[item])
                cachedItemsEnchancement.add(items[item])
            }
            addUpgradeLvl(cachedItemsEnchancement)
        })


        RojvAPI.emitter.on('showOtherEq', async (data) => {
            await waitFor(() => forLocationItems(Engine.items.fetchLocationItems('otherEqItem')), 50, 300)
            let locationItems = await Engine.items.fetchLocationItems('otherEqItem')

            locationItems.forEach((item) => {
                parseItemStats(item)
            })

            addUpgradeLvl(locationItems)
        })
    })()

    const loadDiverseColorsOnChat = (() => {
        let addonName = 'diverse-colors-on-chat'
        if (!checkAddonAvailability(addonName)) return
        let addonsSettings = { ...defaultConfig.addons[addonName], ...rojvStorage.addons[addonName].settings }

        const style = document.createElement('style')
        style.innerHTML = `
        .linked-chat-item[data-item-type="t-norm"] {
            color: ${addonsSettings['common-item'].value};
        }
        .linked-chat-item[data-item-type="t-uniupg"] {
            color: ${addonsSettings['unique-item'].value};
        }
        .linked-chat-item[data-item-type="t-her"] {
            color: ${addonsSettings['heroic-item'].value};
        }
        .linked-chat-item[data-item-type="t-upgraded"] {
            color: ${addonsSettings['upgraded-item'].value};
        }
        .linked-chat-item[data-item-type="t-leg"] {
            color: ${addonsSettings['legendary-item'].value};
        }
    `
        document.head.appendChild(style)

        const lootColor = addonsSettings['division-of-loot'].value
        const nickColor = addonsSettings['nick'].value

        const colorNick = () => {
            document.querySelectorAll('.new-chat-message .message-part .message-section .mark-message-span').forEach((element) => {
                if (element.innerText === Engine.hero.d.nick) {
                    element.style.color = addonsSettings['nick'].value
                }
            })
        }

        const colorDivisionOfLoot = () => {
            document.querySelectorAll('.new-chat-message .message-part.special-style-4').forEach((element) => {
                console.log(element.innerText)
                element.style.color = lootColor
            })

            document.querySelectorAll('.new-chat-message .message-part.special-style-4 .mark-message-span').forEach((element) => {
                if (element.innerText === Engine.hero.d.nick) {
                    element.style.color = nickColor
                }
            })
        }

        let pattern_ITEM = /(ITEM|TPL)#([A-Za-z0-9]+):(".*?")/g

        const itemTypes = {
            'heroic': 't-her',
            'upgraded': 't-upgraded',
            'elite': 't-uniupg',
            'unique': 't-uniupg',
            'legendary': 't-leg',
            'artefact': 't-art',
            'common': 't-norm'
        }

        let cachedItemsLootDivision = new Set()

        RojvAPI.emitter.on('item', items => {
            for (let item in items) {
                parseItemStats(items[item])
                cachedItemsLootDivision.add(items[item])
            }
        })

        const setContainsObjectWithName = (set, nameToCheck) => {
            for (const obj of set) {
                if (obj.name === nameToCheck) {
                    return true
                }
            }
            return false
        }

        const parsedMessages = Engine.chatLinkedItemsManager.parseReceiveMessageWithLinkedItem
        Engine.chatLinkedItemsManager.parseReceiveMessageWithLinkedItem = (message, e, i) => {
            let messages = parsedMessages(message, e, i)

            let results_ITEM_parsed = []

            let match_ITEM
            while ((match_ITEM = pattern_ITEM.exec(message)) !== null) {
                results_ITEM_parsed.push(match_ITEM)
            }
            pattern_ITEM.lastIndex = 0

            results_ITEM_parsed.filter((item) => setContainsObjectWithName(cachedItemsLootDivision, item[3].replace(/\"|\\/g, ''))).forEach((item) => {
                let itemName = item[3].replace(/\"|\\/g, '')
                let itemData = [...cachedItemsLootDivision].find((obj) => obj.name === itemName)

                messages.forEach((msg) => {
                    if (msg[0].attributes['data-item-type'] == undefined) {
                        if (msg[0].innerText.includes(itemName)) {
                            msg[0].setAttribute('data-item-type', itemTypes[itemData.parsedStats.rarity])
                        }
                    }
                })
            })

            return messages
        }

        RojvAPI.emitter.on('chat', async (messages) => {
            if (window.Engine.logOff) return
            colorNick()

            let results_ITEM = []

            for (let channel in messages.channels) {
                if (channel == 'system') {
                    colorDivisionOfLoot()
                }
                let mess = messages.channels[channel].msg
                if (mess) {
                    await Promise.all(mess.map(async (message) => {
                        let match_ITEM
                        while ((match_ITEM = pattern_ITEM.exec(message.msg)) !== null) {
                            results_ITEM.push(match_ITEM)
                        }
                        pattern_ITEM.lastIndex = 0
                    }))
                }
            }

            if (results_ITEM.length == 0) return

            let resultsCopy = [...results_ITEM]
            let htmlMessages = document.querySelectorAll(`.linked-chat-item:not([data-item-type])`)

            resultsCopy.forEach((item) => {
                let KIND = item[1]
                let ID = item[2]

                _g(`chat&getContent=${KIND}%23${ID}`, (event) => {
                    const items = event.item ? event.item : event.item_tpl
                    if (items) {
                        for (let item in items) {
                            items[item].parsedStats = typeof items[item].stat == 'string' ? items[item].parsedStats = items[item].stat.split(';').reduce((acc, curr) => {
                                const [key, value] = curr.split('=')
                                acc[key] = value
                                return acc
                            }, {}) : items[item].stat

                            if (items[item].parsedStats?.rarity) {
                                let rarity = items[item].parsedStats.rarity
                                let name = items[item].name
                                htmlMessages.forEach((message) => {
                                    if (message.textContent.includes(name)) {
                                        message.setAttribute('data-item-type', itemTypes[rarity])
                                    }
                                })
                            }
                        }
                    }
                })

                results_ITEM.splice(results_ITEM.indexOf(item), 1)
            })
        })
    })()

    const loadInformChat = (async () => {

        await waitFor(() => forClan(interfaceType == 'new' ? Engine.hero.d.clan : window.hero.clan), 50, 100)

        let addonName = 'inform-chat'
        if (!checkAddonAvailability(addonName)) return
        if (interfaceType == 'new' ? typeof Engine.hero.d.clan === 'undefined' : typeof window.hero.clan === 'undefined') return

        const sendMessageOnClanChat = (message) => {
            _g('chat&channel=clan', !1, { c: message })
        }

        const lastHeroCords = {
            x: interfaceType == 'new' ? Engine.hero.d.x : window.hero.x,
            y: interfaceType == 'new' ? Engine.hero.d.y : window.hero.y,
        }

        const hero = {
            proxy: interfaceType == 'new' ? Engine.hero : window.hero,
            details: interfaceType == 'new' ? Engine.hero.d : window.hero,
        }

        const spottedNpcs = []

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
                    if ((interfaceType == 'new' ? checkHeroCoords(object.d.x, object.d.y) : checkHeroCoords(object.x, object.y)) && spottedNpcs.length > 0) {
                        spottedNpcs.forEach((npc) => {
                            if (Math.sqrt(Math.pow(hero.details.x - npc.details.x, 2) + Math.pow(hero.details.y - npc.details.y, 2)) < 12) {
                                infromChat(hero.details, npc.details)
                            }
                        })
                    }
                }
                return ret
            }
        }

        const removeObjectWithChannel = (arr, channel) => {
            let index = arr.length
            while (index--) {
                if (arr[index].channel === channel) {
                    arr.splice(index, 1)
                }
            }
            return arr
        }

        if (interfaceType == 'new') {
            Engine.hero = new Proxy(hero.proxy, heroProxyHandler)
        } else if (interfaceType == 'old') {
            const _clearMessageList = getEngine().chatController.clearMessageList
            getEngine().chatController.clearMessageList = (data) => {
                removeObjectWithChannel(cachedMessages, data)
                _clearMessageList(data)
            }
            RojvAPI.emitter.on('game-response', (data) => {
                if (data.e === 'ok' && data.chat && data.matchmaking_state == 0) {
                    cachedMessages.splice(0, cachedMessages.length)
                }
            })
            window.hero = new Proxy(hero.proxy, heroProxyHandler)
        }

        const cachedMessages = []

        const patternMessage = /([1-9]|[1-9][0-9])\s*na ([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]*) \((\d+|undefined) lvl\)/g

        RojvAPI.emitter.on('before-chat', (messages) => {
            messages.channels?.clan?.msg?.forEach((msg) => {
                patternMessage.lastIndex = 0
                if (patternMessage.exec(msg.msg) !== null) {
                    let date = new Date(msg.ts * 1000)
                    msg.msg += ` [${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}]`
                }
                cachedMessages.push(msg)
            })
        })

        RojvAPI.emitter.on('town', (town) => {
            spottedNpcs.splice(0, spottedNpcs.length)
        })

        const npcSpotted = (npc) => {
            let npcDetails = interfaceType == 'new' ? npc.d : npc
            if (npcDetails.wt > 79) {
                spottedNpcs.push({ details: npcDetails })
                spottedNpcs.forEach((spottedNpc) => {
                    if (Math.sqrt(Math.pow(hero.details.x - spottedNpc.details.x, 2) + Math.pow(hero.details.y - spottedNpc.details.y, 2)) < 12) {
                        infromChat(hero.details, spottedNpc.details)
                    }
                })
            }
        }

        const npcRemoved = (npc) => {
            if (npc.d.wt > 79) {
                spottedNpcs.splice(spottedNpcs.indexOf(npc.d), 1)
            }
        }

        const infromChat = (hero, npc) => {
            const trimmedMessages = []

            cachedMessages.forEach((msg) => {
                if (msg.msg.includes(` na ${npc.nick} (${npc.lvl} lvl) `)) {
                    trimmedMessages.push(msg)
                }
            })

            if (trimmedMessages.length == 0) {
                sendMessageOnClanChat(`1 na ${npc.nick} (${npc.lvl} lvl) ${interfaceType == 'new' ? Engine.map.d.name : window.map.name} (${npc.x}, ${npc.y})`)
            } else {
                let whichOne = Number(trimmedMessages[trimmedMessages.length - 1].msg.split(' ')[0])
                for (let message of trimmedMessages) {
                    let dateNow = new Date()
                    let messageTime = new Date(message.ts * 1000)
                    let messageHour = messageTime.getHours()
                    let messageMinute = messageTime.getMinutes()
                    const senderNick = getEngine().businessCardManager.getCard(message.sender).getNick()
                    if (messageHour - dateNow.getHours() == 0 && messageMinute - dateNow.getMinutes() < 15 && senderNick === hero.nick) {
                        return
                    }
                }
                sendMessageOnClanChat(`${whichOne + 1} na ${npc.nick} (${npc.lvl} lvl)`)
            }
        }

        const initInformChat = (() => {
            if (interfaceType == 'new') {
                API.addCallbackToEvent('newNpc', npcSpotted)
                API.addCallbackToEvent('removeNpc', npcRemoved)
            } else if (interfaceType == 'old') {
                const _newNpc = window.newNpc
                window.newNpc = (npcs) => {
                    _newNpc(npcs)
                    let npcsList = g.npc
                    for (let npc in npcs) {
                        if (npcsList[npcs[npc].id] === undefined) {
                            npcRemoved(npcs[npc])
                        }
                    }
                    for (const npc in npcs) {
                        if (npcs.hasOwnProperty(npc) && npcs[npc].wt > 79) {
                            npcSpotted(npcs[npc])
                        }
                    }
                }
            }
        })()
    })()

    const loadRelogEnhancer = (async () => {

        await waitFor(() => forChangePlayer(Engine.changePlayer), 50, 100)

        let addonName = 'relog-enhancer'
        if (!checkAddonAvailability(addonName) || typeof Engine.changePlayer === 'null') return

        const accountId = Engine.hero.d.account
        const isGuest = (() => {
            if (Engine.hero.d.guest) {
                return true
            } else {
                return false
            }
        })()

        Engine.changePlayer.onSuccess = (listOfCharacters) => {
            API.Storage.set("charlist/" + accountId, listOfCharacters)
            const margonemLocalStorage = JSON.parse(localStorage.getItem("Margonem"))
            let charList = []
            let accountIds = rojvStorage.addons[addonName]?.accounts ? rojvStorage.addons[addonName].accounts : margonemLocalStorage.charlist

            if (isGuest) {
                rojvStorage.addons[addonName].guest = accountId
            } else {
                rojvStorage.addons[addonName].main = accountId
            }
            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)

            let mainId = rojvStorage.addons[addonName].main
            let guestId = rojvStorage.addons[addonName].guest

            for (const [key, value] of Object.entries(accountIds)) {
                if (key == mainId || key == guestId) {
                    charList = [...charList, ...value]
                }
            }

            accountIds[accountId] = margonemLocalStorage.charlist[accountId]
            rojvStorage.addons[addonName].accounts = accountIds
            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)


            if (isGuest) {
                rojvStorage.addons[addonName].guest = accountId
            } else {
                rojvStorage.addons[addonName].main = accountId
            }

            Engine.changePlayer.prepareList(charList)
            Engine.changePlayer.createWorldList()
            Engine.changePlayer.createCharacters()
            Engine.changePlayer.selectCurrentWorld()
            Engine.changePlayer.updateScroll()
        }

        Engine.changePlayer.createCharacters = () => {
            let accountCharacterIds = []

            let accountIds = rojvStorage.addons[addonName]?.accounts ? rojvStorage.addons[addonName].accounts : margonemLocalStorage.charlist
            if (accountIds != null) {
                for (const [key, value] of Object.entries(accountIds)) {
                    if (key == accountId) {
                        accountCharacterIds = value.map(character => character.id)
                    }
                }
            }

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

        Engine.changePlayer.reloadPlayer = (characterId) => {
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

            let accountIds = rojvStorage.addons[addonName]?.accounts ? rojvStorage.addons[addonName].accounts : margonemLocalStorage.charlist
            if (accountIds != null) {
                for (const [key, value] of Object.entries(accountIds)) {
                    if (key == accountId) {
                        accountCharacters = value
                    }
                }
            }

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
    })()

    const loadUnlagInvite = (() => {

        let addonName = 'unlag-invite'
        if (!checkAddonAvailability(addonName)) return

        const unlagInvite = () => {
            _g('party&a=accept&answer=1')
        }

        const position = rojvStorage.addons[addonName].position

        const unlagInviteWindow = new RojvWindow({
            width: 50,
            draggable: true,
            windowType: WindowTypeEnum.Clear,
            managePosition: position ? position : null
        })

        unlagInviteWindow.addContent(unlagInviteWindow.createButton({
            text: 'Unlag Invite',
            onClick: unlagInvite
        }))

        unlagInviteWindow.onChangesPosition(() => {
            rojvStorage.addons[addonName].position = unlagInviteWindow.getPosition()
            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
        })
    })()

    const loadHighlightGroups = (() => {

        let addonName = 'highlight-groups'
        if (!checkAddonAvailability(addonName)) return

        const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`

        const colors = []

        const getColorByIndex = (index) => {
            colors[index] = colors[index] || generateRandomColor()
            return colors[index]
        }

        const maskImage = new Image()
        maskImage.src = 'https://cronus.margonem.com/img/mask.png'

        const generateMaskImg = (grp, width, height) => {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(maskImage, 0, 0, width, height)
            ctx.drawImage(maskImage, 0, 0, width, height)
            ctx.globalCompositeOperation = 'source-atop'
            ctx.fillStyle = getColorByIndex(grp)
            ctx.fillRect(0, 0, width, height)

            return canvas
        }

        const maskImg = (() => {
            const maskMap = new Map()
            return (grp, width, height) => {
                if (!maskMap.has(grp)) maskMap.set(grp, generateMaskImg(grp, width, height))
                return maskMap.get(grp)
            }
        }
        )()

        class DrawMask {
            constructor(npc) {
                const { d: { grp }, fh, fw } = npc
                if (grp < 1) return

                this.rx = npc.d.x
                this.ry = npc.d.y

                this.draw = (ctx) => {
                    const [offsetX, offsetY] = Engine.map.offset
                    const [left, top] = npc.collider.box
                    const posLeft = left - offsetX
                    const posTop = top - offsetY

                    ctx.drawImage(maskImg(grp, fw, fh), posLeft, posTop, fw, fh)
                }
                this.getOrder = () => 1
            }
        }

        const getDrawableListMask = (npcs) => Object.values(npcs).map(npc => new DrawMask(npc))
        API.addCallbackToEvent('call_draw_add_to_renderer', () => Engine.renderer.add(...getDrawableListMask(Engine.npcs.check())))
    })()

    const loadEliteDesignation = (() => {

        let addonName = 'elite-designation'
        if (!checkAddonAvailability(addonName)) return

        const e2LabelImage = new Image()
        e2LabelImage.src = 'https://i.imgur.com/yLDRU34.png'

        const amplitude = 4
        const e2GrpSet = new Set()
        const npcsValueMap = new Map()

        class DrawE2Label {
            constructor(npc) {
                const { d: { wt, id, grp }, rx, ry, fw } = npc
                if (!e2GrpSet.has(grp) && (wt >= 30 || wt <= 19)) return
                if (!e2GrpSet.has(grp) && grp != 0) e2GrpSet.add(grp)
                this.rx = rx
                this.ry = ry

                this.draw = (ctx) => {
                    const [offsetX, offsetY] = Engine.map.offset
                    const [left, top] = npc.collider?.box || [0, 0]
                    const posLeft = left - offsetX
                    const posTop = top - offsetY

                    let npcValue = npcsValueMap.get(id) ?? { positionY: 0, velocityY: 0.1 }
                    let { positionY, velocityY } = npcValue

                    positionY += velocityY

                    if (positionY > amplitude || positionY < -amplitude) {
                        velocityY = -velocityY
                    }
                    npcsValueMap.set(id, { positionY, velocityY })

                    ctx.drawImage(e2LabelImage, posLeft + fw / 2 - 12.5, posTop - 20 + positionY, 25, 14)
                }
                this.getOrder = () => 100
            }
        }
        const getDrawableListE2Label = (npcs) => Object.values(npcs).map(npc => new DrawE2Label(npc))
        API.addCallbackToEvent('call_draw_add_to_renderer', () => Engine.renderer.add(...getDrawableListE2Label(Engine.npcs.check())))

        RojvAPI.emitter.on('town', (data) => {
            e2GrpSet.clear()
        })
    })()

})()