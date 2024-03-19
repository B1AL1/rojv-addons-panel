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

    const forObject = (obj) => {
        if (obj != null && typeof obj === 'object') {
            return obj
        }
    }

    const forArray = (array) => {
        if (array.length > 0) {
            return array
        }
    }

    const addTip = (element, text) => {
        $(element).tip(text)
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

    const addItemId = (item, id) => {
        if (item) {
            item.id = id
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

    let rojvStorage = document.rojvPanel.GM_getValue('rojv-storage')
    if (!rojvStorage) {
        rojvStorage = {
            addons: {}
        }
        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
    }

    const version = '20240319'

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
            description: 'Zmienia kolory zlinkowanych przedmiotów na czacie biorąc pod uwagę ich rzadkość. Działa dla podziału łupów, linkowania na czacie oraz na informacje systemowe o otrzymaniu przedmiotu. Jest możliwość konfiguracji kolorów.',
            interface: 'new',
            settings: true,
            position: false,
            size: false,
            function: loadDiverseColorsOnChat
        },
        'enhancement-upgrade-lvl': {
            name: 'Enhancement Upgrade Lvl',
            description: 'Dodaje oznaczenia w jakim stopniu jest ulepszony przedmiot. Jest możliwość konfiguracji kolorów.',
            interface: 'new',
            settings: true,
            position: false,
            size: false,
            function: loadEnchancementUpgradeLvl
        },
        'inform-chat': {
            name: 'Inform Chat',
            description: 'Po wykryciu herosa/tytana/kolosa i podejściu do niego na odległość 12 kratek lub zalogowaniu się w ogległości 12 kratek od niego, wysyła wiadomość na czacie klanowy z informacją o tym jako który w kolejności podszedłeś do potwora na podstawie wiadomości z czatu klanowego. Jeśli jesteśmy 1 obok potworka dodatek wyśle informacje na temat mapy oraz kordów.',
            interface: 'both',
            settings: false,
            position: false,
            size: false,
            function: loadInformChat
        },
        'relog-enhancer': {
            name: 'Relog Enhancer',
            description: 'Dodaje możliwość logania na postacie zasta z poziomu gry przez wbudowane w grę przelogowywanie na inne nasz postacie. Trzeba przynajmniej raz zalogować się na zastępcę żeby pokazały się jego postacie.',
            interface: 'new',
            settings: false,
            position: false,
            size: false,
            function: loadRelogEnhancer
        },
        'unlag-invite': {
            name: 'Unlag Invite',
            description: 'Dodaje przycisk do zaakceptowania zaproszenia do grupy przy lagu, kiedy okienko z akceptem nie pojawiło się lub QG nie zadziałało. Można dowolnie przesuwać przycisk, jego pozycja zostanie zapisana.',
            interface: 'both',
            settings: false,
            position: true,
            size: false,
            function: loadUnlagInvite
        },
        'highlight-groups': {
            name: 'Highlight Groups',
            description: 'Dodaje podświetlenie grupek potworów.',
            interface: 'new',
            settings: false,
            position: false,
            size: false,
            function: loadHighlightGroups
        },
        'elite-designation': {
            name: 'Elite Designation',
            description: 'Dodaje pływający napis nad e2 oraz jej grupą.',
            interface: 'new',
            settings: false,
            position: false,
            size: false,
            function: loadEliteDesignation
        },
        'heros-occupation-space': {
            name: 'Heros Occupation Space',
            description: 'Dodaje podświetlenie podłoża w obrębie 5 kratek. Jest możliwość konfiguracji koloru obramowania kratki.',
            interface: 'new',
            settings: true,
            position: false,
            size: false,
            function: loadHerosOccupationSpace
        },
        'mine-helper': {
            name: 'Mine Helper',
            description: 'Dodaje pływające napisy nad kilofami i czarodziejami na kopalni 300+ oraz zlicza ilośc ich podmiesień. Można dowolnie przesuwać licznik, jego pozycja zostanie zapisana.',
            interface: 'new',
            settings: false,
            position: true,
            size: false,
            function: loadMineHelper
        },
        'timers-box': {
            name: 'Timers Box',
            description: 'Dodaje pływający box z timerami lootlogów. Aby okienka poprawnie się zawijały należy ustawić ilość kolumn na 1 w ustawieniach lootloga. Można dowolnie przesuwać oraz zmieniać rozmiar boxa, jego pozycja oraz wymiary zostaną zapisane. Działa dla wielu lootlogów',
            interface: 'both',
            settings: false,
            position: true,
            size: true,
            function: loadTimersBox
        },
    }

    const defaultConfig = {
        addons: {
            'diverse-colors-on-chat': {
                'common-item': '#9da1a7',
                'unique-item': '#fffb00',
                'heroic-item': '#38b8eb',
                'upgraded-item': '#ff59af',
                'legendary-item': '#ff8400',
                'nick': '#ffa500',
                'division-of-loot': '#ccffcc'
            },
            'enhancement-upgrade-lvl': {
                'enhancement-upgrade-lvl-1': '#9da1a7',
                'enhancement-upgrade-lvl-2': '#fffb00',
                'enhancement-upgrade-lvl-3': '#38b8eb',
                'enhancement-upgrade-lvl-4': '#ff59af',
                'enhancement-upgrade-lvl-5': '#ff8400'
            },
            'heros-occupation-space': {
                'border-color': '#ff8400'
            }
        }
    }

    const addonsSettingsList = {
        addons: {
            'diverse-colors-on-chat': {
                'common-item': {
                    name: 'Zwykły przedmiot',
                    description: 'Zwykły przedmiot',
                    type: 'color'
                },
                'unique-item': {
                    name: 'Unikalny przedmiot',
                    description: 'Unikalny przedmiot',
                    type: 'color'
                },
                'heroic-item': {
                    name: 'Heroiczny przedmiot',
                    description: 'Heroiczny przedmiot',
                    type: 'color'
                },
                'upgraded-item': {
                    name: 'Ulepszony przedmiot',
                    description: 'Ulepszony przedmiot',
                    type: 'color'
                },
                'legendary-item': {
                    name: 'Legendarny przedmiot',
                    description: 'Legendarny przedmiot',
                    type: 'color'
                },
                'nick': {
                    name: 'Nick',
                    description: 'Nick',
                    type: 'color'
                },
                'division-of-loot': {
                    name: 'Podział łupu',
                    description: 'Podział łupu',
                    type: 'color'
                }
            },
            'enhancement-upgrade-lvl': {
                'enhancement-upgrade-lvl-1': {
                    name: 'Poziom ulepszenia Lvl 1',
                    description: 'Poziom ulepszenia Lvl 1',
                    type: 'color'
                },
                'enhancement-upgrade-lvl-2': {
                    name: 'Poziom ulepszenia Lvl 2',
                    description: 'Poziom ulepszenia Lvl 2',
                    type: 'color'
                },
                'enhancement-upgrade-lvl-3': {
                    name: 'Poziom ulepszenia Lvl 3',
                    description: 'Poziom ulepszenia Lvl 3',
                    type: 'color'
                },
                'enhancement-upgrade-lvl-4': {
                    name: 'Poziom ulepszenia Lvl 4',
                    description: 'Poziom ulepszenia Lvl 4',
                    type: 'color'
                },
                'enhancement-upgrade-lvl-5': {
                    name: 'Poziom ulepszenia Lvl 5',
                    description: 'Poziom ulepszenia Lvl 5',
                    type: 'color'
                }
            },
            'heros-occupation-space': {
                'border-color': {
                    name: 'Kolor ramki',
                    description: 'Kolor ramki',
                    type: 'color'
                }
            }
        }
    }

    const createElement = (type, className, properties = {}, children = [], parent = null) => {
        const element = document.createElement(type)
        element.className = className
        Object.assign(element, properties)
        children.forEach(child => element.appendChild(child))
        parent?.appendChild(element)

        return element
    }

    const createControlElement = (className, innerText, clickEvent, parent) => {
        let element = createElement('div', className, { innerText: innerText })
        element.addEventListener('click', clickEvent)
        if (parent) parent.appendChild(element)
        return element
    }

    const resetAddonProperty = (addon, property, messageText) => {
        rojvStorage.addons[addon][property] = null
        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
        message(messageText)
    }

    const createAddonToggle = (addon, parent = null) => {
        let toggle = createElement('label', 'rojv-checkbox__toggle')

        let checkbox = createElement('input', 'rojv-checkbox__input', { type: 'checkbox', checked: rojvStorage.addons[addon]?.active }, [], toggle)

        checkbox.addEventListener('change', () => {
            rojvStorage.addons[addon] ? rojvStorage.addons[addon].active = checkbox.checked : rojvStorage.addons[addon] = { active: checkbox.checked }
        })

        createElement('span', 'rojv-checkbox__slider', {}, [], toggle)

        if (parent) parent.appendChild(toggle)

        return toggle
    }


    const generateAddonsList = (addons) => {
        const addonsList = createElement('ul', 'rojv-addons__list')
        for (let addon in addons) {
            if (addons[addon].interface !== interfaceType && addons[addon].interface != 'both') continue

            let li = createElement('li', 'rojv-addons__item', {}, [], addonsList)

            createAddonToggle(addon, li)

            let label = createElement('span', 'rojv-window__label', { 'innerText': addons[addon].name }, [], li)
            addTip(label, addons[addon].description)

            let controls = createElement('span', 'rojv-addons__controls', {}, [], li)

            if (addons[addon].size && rojvStorage.addons[addon]?.active) {
                let resetSize = createControlElement('rojv-control rojv-control__reset-size', '↔️', () => resetAddonProperty(addon, 'size', 'Rozmiar okna został zresetowany, odśwież stronę aby zobaczyć zmiany.'), controls)
                addTip(resetSize, 'Przywróć domyślny rozmiar okna')
            }

            if (addons[addon].position && rojvStorage.addons[addon]?.active) {
                let resetPosition = createControlElement('rojv-control rojv-control__reset-position', '↻', () => resetAddonProperty(addon, 'position', 'Pozycja została zresetowana, odśwież stronę aby zobaczyć zmiany.'), controls)
                addTip(resetPosition, 'Przywróć domyślną pozycję okna')
            }

            if (addons[addon].settings && rojvStorage.addons[addon]?.active == true) {
                let settings = createControlElement('rojv-control rojv-control__settings', '🛠', () => {
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
                                    },
                                    tip: 'Przywróć domyślne ustawienia dodatku',
                                    messageText: 'Ustawienia dodatku zostały zresetowane, odśwież stronę aby zobaczyć zmiany.'
                                }
                            ]
                        }
                    })

                    let settings = addonsSettingsList.addons[addon]
                    let settingsValues = { ...defaultConfig.addons[addon], ...rojvStorage.addons[addon]?.settings }
                    const settingsList = createElement('ul', 'rojv-addon-settings__list')
                    for (let setting in settings) {
                        let li = createElement('li', 'rojv-addon-settings__item', {}, [], settingsList)

                        let input = createElement('input', 'rojv-window__input', {}, [], li)
                        if (settings[setting].type == 'checkbox') {
                            input.type = settings[setting].type
                            input.checked = settingsValues[setting]
                        } else if (settings[setting].type == 'array') {
                            input.value = settingsValues[setting].join(', ')
                        } else {
                            input.type = settings[setting].type
                            input.value = settingsValues[setting]
                        }
                        input.addEventListener('change', () => {
                            let newValue
                            if (settings[setting].type == 'checkbox') {
                                newValue = input.checked
                            } else {
                                newValue = input.value
                            }

                            if (rojvStorage.addons[addon].settings) {
                                rojvStorage.addons[addon].settings[setting] = newValue
                            } else {
                                rojvStorage.addons[addon].settings = { [setting]: newValue }
                            }
                            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                        }
                        )

                        createElement('label', 'rojv-window__label', { 'innerText': settings[setting].name }, [], li)
                    }
                    settingsWindow.addContent(settingsList)
                }, controls)
                addTip(settings, 'Ustawienia')
            }
        }

        return addonsList
    }

    const generateNews = () => {
        const newsList = createElement('ul', 'rojv-news__list')

        createElement('li', 'rojv-news__item', { 'innerText': 'Wersja: ' + version }, [], newsList)
        const profile = createElement('li', 'rojv-news__item', {}, [], newsList)
        createElement('span', 'rojv-window__label', { 'innerText': 'Profil: ' }, [], profile)
        createElement('a', 'rojv-link', { 'href': 'https://www.margonem.pl/profile/view,4203975', 'target': '_blank', 'innerText': 'Rojvenos' }, [], profile)
        createElement('li', 'rojv-news__item', { 'innerText': 'Jeśli widzisz tą wiadomość to przeinstaluj dodatki, link poniżej:' }, [], newsList)
        createElement('a', 'rojv-link', { 'href': 'https://b1al1.github.io/rojv-addons-panel/rojv-addon-panel.user.js', 'target': '_blank', 'innerHTML': '<p style="color: red; font-size: 24px;">LINK</p>' }, [], newsList)

        const newsObjects = [
            {
                date: '19.03.2024',
                content: [
                    'Przebudowano wygląd okienek dodatków.',
                    'Zoptymalizowano ładowanie dodatków. Wymagane jest przeinstalowanie skryptu - link wyżej.',
                    'Dodano możliwość ręcznego odświeżenia tokenu cache obok zamknięcia okna panelu dodatków.'
                ]
            },
            {
                date: '14.03.2024',
                content: [
                    'Nowy dodatek - Timers Box.',
                    'Dodano przycisk do włączania panelu dodatków dla REVO.',
                    'Przebudowano funkcjonalność przesuwania okienek dodatków.',
                    'Dodano funkcjonalność zmiany rozmiaru niektórych okienek.',
                    'Dodano możliwość resetowania pozycji okienka dodatku.',
                    'Dodano zapamiętywanie czy panel dodatków jest włączony, po odświeżeniu okna powinien on się od razu pojawić jęśli był wcześniej aktywny.'
                ]
            },
            {
                date: '11.03.2024',
                content: [
                    'Nowy dodatek - Mine Helper.',
                    'Dodano opisy do dodatków po najechaniu na ich nazwy w panelu dodatków.'
                ]
            }
        ]

        newsObjects.forEach((newsObject) => {
            let news = createElement('li', 'rojv-news__item', {}, [], newsList)

            let newsInnerList = createElement('ul', 'rojv-news__list', {}, [], news)
            createElement('li', 'rojv-news__item', { 'innerHTML': `<b>${newsObject.date}</b>` }, [], newsInnerList)

            newsObject.content.forEach((content) => {
                createElement('li', 'rojv-news__item', { 'innerText': content }, [], newsInnerList)
            })
        })

        return newsList
    }

    const generateSettings = () => {
        const settingsList = createElement('ul', 'rojv-general_settings__list')
        createElement('li', 'rojv-general_settings__item', { 'innerText': 'Może kiedyś coś tu będzie...' }, [], settingsList)
        return settingsList
    }

    const mainWindowNavigationItems = {
        addons: { name: 'Dodatki', active: true, content: generateAddonsList(addons), isFooter: true },
        news: { name: 'Aktualności', content: generateNews(), isFooter: false },
        settings: { name: 'Ustawienia', content: generateSettings(), isFooter: false }
    }

    const mainContainer = createElement('div', 'rojv-addon-panel', { 'id': 'rojv-addon-panel' }, [], document.body)

    class RojvWindow {
        constructor({
            windowType = WindowTypeEnum.Classic,
            windowClass,
            size = { width: 300, height: 0 },
            header,
            parentElement = mainContainer,
            managePosition,
            draggable = false,
            footer,
            navigationItems,
            resizable = false
        } = {}) {
            this.container = this.createElement('div', windowClass ? `${windowType} ${windowClass}` : `${windowType}`, { style: { width: `${size.width}px`, height: size.height > 0 ? `${size.height}px` : undefined } })
            this.header = this.createElement('div', 'rojv-window__header')
            this.menuLeft = this.createElement('span', 'rojv-window__menu-left')
            this.menuRight = this.createElement('span', 'rojv-window__menu-right')
            this.title = header?.title ? this.createTitle(header.title) : null

            this.header.append(this.menuLeft, this.title || '', this.menuRight)
            this.container.append(this.header, this.createContent(), this.createFooter())
            this.closeable = header?.closeable ? this.createCloseButton() : false
            parentElement.appendChild(this.container)

            if (draggable) {
                let draggableElement = header?.title ? this.title : this.closeable ? this.header : this.content
                $(this.container).draggable(
                    {
                        handle: draggableElement,
                        cancel: false,
                        scroll: false,
                        start: () => {
                            draggableElement.classList.add('active')
                        },
                        stop: () => {
                            draggableElement.classList.remove('active')
                        },
                        drag: (event, ui) => {
                            const containerOffset = this.container.getBoundingClientRect()

                            const topOffset = 0

                            if (ui.position.top < topOffset) {
                                ui.position.top = topOffset
                            } else if (ui.position.top + this.container.offsetHeight > window.innerHeight + topOffset) {
                                ui.position.top = window.innerHeight - this.container.offsetHeight + topOffset
                            }

                            if (ui.position.left < 0) {
                                ui.position.left = 0
                            } else if (ui.position.left + this.container.offsetWidth > window.innerWidth) {
                                ui.position.left = window.innerWidth - this.container.offsetWidth
                            }
                        }
                    }
                )
            }

            if (footer?.buttons) {
                for (let button of footer.buttons) {
                    this.addFooter(this.createButton(button))
                }
            }

            if (navigationItems) this.generateNavigation(navigationItems)

            if (resizable) {
                this.container.classList.add('rojv-window__resizable')
                this.content.addEventListener('wheel', (event) => {
                    event.stopPropagation()
                })
                this.content.classList.add('rojv-window-content__resizable')
            }

            if (managePosition) {
                this.container.style.left = `${managePosition.x}px`
                this.container.style.top = `${managePosition.y}px`
            } else {
                this.container.style.left = `${(window.innerWidth - this.container.offsetWidth) / 2}px`
                this.container.style.top = `${(window.innerHeight - this.container.offsetHeight) / 2}px`
            }
        }

        createElement(type, className, properties = {}, children = [], parent = null) {
            const element = document.createElement(type)
            element.className = className
            this.checkObjectAndAssign(properties, element)
            children.forEach(child => element.appendChild(child))
            parent?.appendChild(element)
            return element
        }

        createControlElement(className, innerText, clickEvent, parent) {
            const element = createElement('div', className, { innerText: innerText })
            element.addEventListener('click', clickEvent)
            if (parent) parent.appendChild(element)
            return element
        }

        checkObjectAndAssign(obj, element) {
            if (typeof obj === 'object') {
                for (let prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (typeof obj[prop] === 'object') {
                            if (!element[prop]) {
                                element[prop] = {}
                            }
                            this.checkObjectAndAssign(obj[prop], element[prop])
                        } else {
                            element[prop] = obj[prop]
                        }
                    }
                }
            }
        }

        createTitle({ text = '', fontSize = 10 }) {
            return this.createElement('div', 'rojv-window__title', { innerText: text, style: { fontSize: `${fontSize}px` } })
        }

        createContent() {
            return this.content = this.createElement('div', 'rojv-window__content')
        }

        createFooter() {
            return this.footer = this.createElement('div', 'rojv-window__footer')
        }

        createCloseButton() {
            const closeButton = this.createControlElement('rojv-control rojv-control__close', '✖', () => this.onClose(), this.menuRight)
            addTip(closeButton, 'Zamknij')
            return true
        }

        createButton({ text, onClick, tip, messageText }) {
            const buttonElement = this.createElement('button', 'rojv-button', { innerText: text })
            buttonElement.addEventListener('click', () => {
                onClick.call(this)
                if (messageText) message(messageText)
            })
            if (tip) addTip(buttonElement, tip)
            return buttonElement
        }

        addFooter(element) {
            this.footer.appendChild(element)
        }

        addContent(element) {
            this.content.appendChild(element)
        }

        addHeader(element) {
            this.header.insertBefore(element, this.menuRight)
        }

        setWidth(width) {
            this.container.style.width = `${width}px`
        }

        onClose() {
            let windowId = this.container.id
            if (windowId === 'rojv-addon-panel-window') {
                rojvStorage.isAddonPanelOpen = false
                document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
            }
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

        getSize() {
            return {
                width: parseInt(this.container.style.width),
                height: parseInt(this.container.style.height)
            }
        }

        onChangesPosition(callback) {
            this.container.addEventListener('mouseup', () => {
                callback(this.getPosition())
            })
        }

        onChangesSize(callback) {
            this.container.addEventListener('mouseup', () => {
                callback(this.getSize())
            })
        }

        generateNavigation(navigationItems) {
            this.navigation = this.createElement('div', 'rojv-addons__navigation')
            this.container.insertBefore(this.navigation, this.content)
            for (let item in navigationItems) {
                let navigationItem = this.createElement('div', 'rojv-addons__navigation__item', navigationItems[item].name)
                navigationItem.innerText = navigationItems[item].name
                navigationItem.id = item
                if (navigationItems[item].active) navigationItem.classList.add('rojv-addons__navigation__item--active')

                navigationItem.addEventListener('click', () => {
                    if (navigationItems[item].active) return
                    for (let item in navigationItems) {
                        navigationItems[item].active = false
                        this.navigation.querySelectorAll(`.rojv-addons__navigation__item--active`).forEach(
                            (element) => element.classList.remove('rojv-addons__navigation__item--active')
                        )
                    }

                    navigationItems[item].active = true
                    navigationItem.classList.add('rojv-addons__navigation__item--active')

                    this.getContent().innerHTML = ''
                    this.addContent(navigationItems[item].content)

                    this.getFooter().style.display = navigationItems[item].isFooter ? 'flex' : 'none'
                })
                this.navigation.appendChild(navigationItem)

                if (navigationItems[item].active) this.addContent(navigationItems[item].content)
            }

            return this.navigation
        }

        getNavigation() {
            return this.navigation
        }

        getNavigationItem(id) {
            return this.navigation.querySelector(`#${id}`)
        }

        getNavigationItems() {
            return this.navigation.querySelectorAll('.rojv-addons__navigation__item')
        }
    }

    window.RojvAPI = {}

    const openRojvAddonPanelNews = () => {
        const newsWindow = new RojvWindow({
            size: { width: 600, height: 300 },
            header: {
                closeable: true,
                title: {
                    text: 'Rojv Addon Menu - Aktualności',
                    fontSize: 20
                },
            },
            draggable: true,
            windowType: WindowTypeEnum.Classic
        })

        const newsList = generateNews()

        newsWindow.getContent().classList.add('rojv-window-content__resizable')
        newsWindow.getContent().style.height = parseInt(newsWindow.getContainer().style.height) - newsWindow.getHeader().offsetHeight - newsWindow.getFooter().offsetHeight + 'px'
        newsWindow.getContent().style.paddingRight = '10px'
        newsWindow.getContent().addEventListener('wheel', (event) => {
            event.stopPropagation()
        })

        newsWindow.addContent(newsList)
    }

    if (rojvStorage?.version != version) {
        rojvStorage.version = version
        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
        openRojvAddonPanelNews()
    }

    let revo = null
    let revoRetryCount = 300
    const fetchRevo = () => {
        revo = document.querySelector('#revolayer')
        if (!revo && revoRetryCount > 0) {
            revoRetryCount -= 1
            setTimeout(fetchRevo, 50)
        } else if (!revo && revoRetryCount == 0) {
            console.error('Nie znaleziono revo')
        } else {
            let tray = revo.querySelector('._tray_')
            let revoButton = document.createElement('cr-button')
            revoButton.setAttribute('revo_tip', `<b>Rojv Addon Menu</b><br>Pokaż/ukryj okno dodatków Rojva.`)
            revoButton.classList.add('info')
            revoButton.innerHTML = 'ROJV'
            revoButton.addEventListener('click', () => {
                if (document.querySelector('#rojv-addon-panel-window')) {
                    document.querySelectorAll('#rojv-addon-panel-window').forEach((element) => element.remove())
                    rojvStorage.isAddonPanelOpen = false
                    document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                    return
                }
                openRojvAddonPanel()
            })
            tray.insertBefore(revoButton, tray.lastChild)
        }
    }

    fetchRevo()

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
            emitter.emit((before ? 'before-' : '') + i, data[i])
        }
        emitter.emit((before ? 'before-' : '') + 'game-response', data)
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

        actionAfter(Engine.hero, 'sendRequestToTalk', (data) => {
            emitter.emit('sendRequestToTalk', data)
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
        await waitFor(() => forObject(window.Engine.settings), 50, 3000)
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
            if (document.querySelector('#rojv-addon-panel-window')) {
                document.querySelectorAll('#rojv-addon-panel-window').forEach((element) => element.remove())
                rojvStorage.isAddonPanelOpen = false
                document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                return
            }
            openRojvAddonPanel()
        })
        rojvAddonPanel.appendChild(list)
        settings.appendChild(rojvAddonPanel)
    }

    const openRojvAddonPanel = () => {
        const mainWindow = new RojvWindow({
            size: { width: 900, height: 0 },
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
                        },
                        tip: 'Zapisz ustawienia dodatków',
                        messageText: 'Zapisano ustawienia, odśwież stronę aby zobaczyć zmiany.'
                    },
                    {
                        text: 'Odśwież',
                        onClick: () => {
                            location.reload()
                        },
                        tip: 'Odśwież stronę'
                    }
                ]
            },
            navigationItems: mainWindowNavigationItems
        })

        mainWindow.getContainer().id = 'rojv-addon-panel-window'
        let refreshToken = createControlElement('rojv-control rojv-control__refresh-token', '↻', () => {
            document.rojvPanel.GM_setValue('rojv_panel_cache_token', null)
            location.reload()
        })
        addTip(refreshToken, 'Odśwież token cache')
        mainWindow.getMenuRight().prepend(refreshToken)

        rojvStorage.isAddonPanelOpen = true
        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
    }

    window.RojvAPI.openRojvAddonPanel = openRojvAddonPanel

    if (rojvStorage?.isAddonPanelOpen) openRojvAddonPanel()

    async function loadRelogEnhancer() {
        let addonName = 'relog-enhancer'

        await waitFor(() => forObject(Engine.changePlayer), 50, 200)
        if (typeof Engine.changePlayer === 'undefined' || Engine.changePlayer === null) {
            console.error('Engine.changePlayer is undefined')
            return
        }

        const accountId = Engine.hero.d.account
        const isGuest = (() => {
            if (typeof Engine.hero.d.guest !== 'undefined' && Engine.hero.d.guest === '1') {
                return true
            } else {
                return false
            }
        })()

        if (isGuest) {
            rojvStorage.addons[addonName].guest = accountId
        } else {
            rojvStorage.addons[addonName].main = accountId
        }

        const mainId = rojvStorage.addons[addonName].main || accountId
        const guestId = rojvStorage.addons[addonName].guest || accountId

        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)

        Engine.changePlayer.onSuccess = (listOfCharacters) => {
            const accountId = Engine.hero.d.account
            API.Storage.set('charlist/' + accountId, listOfCharacters)
            const margonemLocalStorage = JSON.parse(localStorage.getItem('Margonem'))
            let charList = []
            let accountIds = rojvStorage.addons[addonName]?.accounts ? rojvStorage.addons[addonName].accounts : margonemLocalStorage.charlist

            const idsToCheck = [mainId, guestId].filter(id => id in accountIds)
            charList = idsToCheck.reduce((list, id) => [...list, ...accountIds[id]], charList)

            accountIds[accountId] = margonemLocalStorage.charlist[accountId]
            rojvStorage.addons[addonName].accounts = accountIds
            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)

            Engine.changePlayer.prepareList(charList)
            Engine.changePlayer.createWorldList()
            Engine.changePlayer.createCharacters()
            Engine.changePlayer.selectCurrentWorld()
            Engine.changePlayer.updateScroll()
        }

        Engine.changePlayer.createCharacters = () => {
            const accountId = Engine.hero.d.account
            let accountCharacterIds = []
            const margonemLocalStorage = JSON.parse(localStorage.getItem('Margonem'))

            let accountIds = rojvStorage.addons[addonName]?.accounts ? rojvStorage.addons[addonName].accounts : margonemLocalStorage.charlist
            const value = accountIds[accountId]
            if (Array.isArray(value)) {
                accountCharacterIds = value.map(character => character.id)
            }

            Object.values(Engine.changePlayer.list)
                .filter(character => accountCharacterIds.includes(character.id))
                .sort((prevCharacter, nextCharacter) => {
                    return prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick)
                })
                .forEach(character => {
                    const worldName = character.world
                    const createOneCharacter = Engine.changePlayer.createOneCharacter(character)
                    Engine.changePlayer.characterGroupContainerEl.querySelector(`[data-world=${worldName}]`).appendChild(createOneCharacter)
                })

            Object.values(Engine.changePlayer.list)
                .filter(character => !accountCharacterIds.includes(character.id))
                .sort((prevCharacter, nextCharacter) => {
                    return prevCharacter.lvl - nextCharacter.lvl || prevCharacter.nick.localeCompare(nextCharacter.nick)
                })
                .forEach(character => {
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
                setCookie('mchar_id', characterId, date, '/', 'margonem.' + domain, !0)
                window.location.replace('https://' + character.world + '.margonem.' + domain)
            }
            const margonemLocalStorage = JSON.parse(localStorage.getItem('Margonem'))
            const accountId = Engine.hero.d.account

            const relogType = typeof Engine.hero.d.guest !== 'undefined' && Engine.hero.d.guest === '1' ? 'logout' : 'loginSubstitute'

            const accountIds = rojvStorage.addons[addonName]?.accounts ? rojvStorage.addons[addonName].accounts : margonemLocalStorage.charlist
            const accountCharacters = accountIds[accountId]

            if (!accountCharacters.some(chr => chr.id === characterId)) {
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
    }

    async function loadEnchancementUpgradeLvl() {
        let addonName = 'enhancement-upgrade-lvl'
        let addonsSettings = { ...defaultConfig.addons[addonName], ...rojvStorage.addons[addonName].settings }

        const generateUpgradeImg = (color, lvl) => {
            const canvas = document.createElement('canvas')
            canvas.width = 32
            canvas.height = 32
            const ctx = canvas.getContext('2d')
            ctx.shadowColor = 'black'
            ctx.shadowBlur = 2
            ctx.lineWidth = 3
            ctx.strokeText(`+${lvl}`, 18, 10)
            ctx.shadowBlur = 0

            ctx.font = '10px sans-serif'
            ctx.fillStyle = color
            ctx.fillText(`+${lvl}`, 18, 10)

            return canvas.toDataURL()
        }

        const style = document.createElement('style')
        style.innerHTML = `
            [enhancement-upgrade-lvl] {
                position: relative;
                width: 100%;
                height: 100%;
            }
            [data-frame-mania-upgrade]>.margo-item__icon::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
            [enhancement-upgrade-lvl="1"], [data-frame-mania-upgrade="1"]>.margo-item__icon::after {
                background-image: url(${generateUpgradeImg(addonsSettings['enhancement-upgrade-lvl-1'], 1)});
            }
            [enhancement-upgrade-lvl="2"], [data-frame-mania-upgrade="2"]>.margo-item__icon::after {
                background-image: url(${generateUpgradeImg(addonsSettings['enhancement-upgrade-lvl-2'], 2)});
            }
            [enhancement-upgrade-lvl="3"], [data-frame-mania-upgrade="3"]>.margo-item__icon::after {
                background-image: url(${generateUpgradeImg(addonsSettings['enhancement-upgrade-lvl-3'], 3)});
            }
            [enhancement-upgrade-lvl="4"], [data-frame-mania-upgrade="4"]>.margo-item__icon::after {
                background-image: url(${generateUpgradeImg(addonsSettings['enhancement-upgrade-lvl-4'], 4)});
            }
            [enhancement-upgrade-lvl="5"], [data-frame-mania-upgrade="5"]>.margo-item__icon::after {
                background-image: url(${generateUpgradeImg(addonsSettings['enhancement-upgrade-lvl-5'], 5)});
            }
        `
        document.head.appendChild(style)

        const updateItemEnhancement = (item, element) => {
            const enhancementUpgradeElement = element.querySelector('.enhancement-upgrade')
            const enhancementUpgradeLevel = item.parsedStats.enhancement_upgrade_lvl

            if (enhancementUpgradeElement) {
                const currentLevel = enhancementUpgradeElement.getAttribute('enhancement-upgrade-lvl')
                if (currentLevel !== enhancementUpgradeLevel) {
                    enhancementUpgradeElement.setAttribute('enhancement-upgrade-lvl', enhancementUpgradeLevel)
                }
            } else {
                const enhancementUpgrade = document.createElement('div')
                enhancementUpgrade.setAttribute('enhancement-upgrade-lvl', enhancementUpgradeLevel)
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
            for (let item in items) {
                document.querySelectorAll(`.item-id-${items[item].id}`).forEach((element) => {
                    if (items[item].parsedStats.enhancement_upgrade_lvl > 0) {
                        updateItemEnhancement(items[item], element)
                    } else {
                        removeItemEnhancement(element)
                    }
                })
            }
        }

        RojvAPI.emitter.on('item', items => {
            for (let item in items) {
                parseItemStats(items[item])
                addItemId(items[item], item)
            }
            addUpgradeLvl(items)
        })

        RojvAPI.emitter.on('showOtherEq', async (data) => {
            await waitFor(() => forArray(Engine.items.fetchLocationItems('otherEqItem')), 50, 300)
            let locationItems = await Engine.items.fetchLocationItems('otherEqItem')

            locationItems.forEach((item) => {
                parseItemStats(item)
            })

            addUpgradeLvl(locationItems)
        })
    }

    async function loadDiverseColorsOnChat() {

        let addonName = 'diverse-colors-on-chat'
        let addonsSettings = { ...defaultConfig.addons[addonName], ...rojvStorage.addons[addonName].settings }

        const style = document.createElement('style')
        style.innerHTML = `
            .linked-chat-item[data-item-type="t-norm"] {
                color: ${addonsSettings['common-item']};
            }
            .linked-chat-item[data-item-type="t-uniupg"] {
                color: ${addonsSettings['unique-item']};
            }
            .linked-chat-item[data-item-type="t-her"] {
                color: ${addonsSettings['heroic-item']};
            }
            .linked-chat-item[data-item-type="t-upgraded"] {
                color: ${addonsSettings['upgraded-item']};
            }
            .linked-chat-item[data-item-type="t-leg"] {
                color: ${addonsSettings['legendary-item']};
            }
        `
        document.head.appendChild(style)

        const lootColor = addonsSettings['division-of-loot']
        const nickColor = addonsSettings['nick']

        const colorNick = () => {
            document.querySelectorAll('.new-chat-message .message-part .message-section .mark-message-span').forEach((element) => {
                if (element.innerText === Engine.hero.d.nick) {
                    element.style.color = nickColor
                }
            })
        }

        const colorDivisionOfLoot = () => {
            document.querySelectorAll('.new-chat-message .message-part.special-style-4').forEach((element) => {
                element.style.color = lootColor
            })

            document.querySelectorAll('.new-chat-message .message-part.special-style-4 .mark-message-span').forEach((element) => {
                if (element.innerText === Engine.hero.d.nick) {
                    element.style.color = nickColor
                }
            })
        }

        let pattern_ITEM = /(ITEM|TPL)#([A-Za-z0-9]+):(".*?"|\\".*?\\")/g

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

        RojvAPI.emitter.on('game-response', data => {
            if (data.item && data.loot) {
                let items = data.item
                for (let item in items) {
                    parseItemStats(items[item])
                    addItemId(items[item], item)
                    cachedItemsLootDivision.add(items[item])
                }
            } else if (data.item_tpl) {
                let items = data.item_tpl
                for (let item in items) {
                    parseItemStats(items[item])
                    addItemId(items[item], item)
                    cachedItemsLootDivision.add(items[item])
                }
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
                    if (msg[0].innerText.includes(itemName) && !msg[0].getAttribute('data-item-type')) {
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
                        const msg = message.msg ? message.msg : message.code
                        let match_ITEM
                        while ((match_ITEM = pattern_ITEM.exec(msg)) !== null) {
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
                                    if (message.textContent.includes(name) && !message.getAttribute('data-item-type')) {
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
    }

    async function loadInformChat() {

        await waitFor(() => forObject(interfaceType == 'new' ? Engine.hero.d.clan : window.hero.clan), 50, 100)

        let addonName = 'inform-chat'
        if (interfaceType == 'new' ? typeof Engine.hero.d.clan === 'undefined' : typeof window.hero.clan === 'undefined') return

        const sendMessageOnClanChat = (message) => {
            _g('chat&channel=clan', !1, { c: message })
        }

        const lastHeroCords = {
            x: interfaceType == 'new' ? Engine.hero.d.x : window.hero.x,
            y: interfaceType == 'new' ? Engine.hero.d.y : window.hero.y,
        }

        const heroDetails = interfaceType == 'new' ? Engine.hero.d : window.hero

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
                    const { x, y } = interfaceType == 'new' ? object.d : object
                    if (checkHeroCoords(x, y) && spottedNpcs.length > 0) {
                        spottedNpcs.forEach((npc) => {
                            const distance = Math.sqrt(Math.pow(heroDetails.x - npc.x, 2) + Math.pow(heroDetails.y - npc.y, 2))
                            if (distance < 12) {
                                infromChat(heroDetails, npc)
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

        if (interfaceType === 'old') {
            const _clearMessageList = getEngine().chatController.clearMessageList
            getEngine().chatController.clearMessageList = (data) => {
                removeObjectWithChannel(cachedMessages, data)
                _clearMessageList(data)
            }

            RojvAPI.emitter.on('game-response', (data) => {
                if (data.e === 'ok' && data.chat && data.matchmaking_state === 0) {
                    cachedMessages.splice(0, cachedMessages.length)
                }
            })
        }

        if (interfaceType === 'new') {
            Engine.hero = new Proxy(Engine.hero, heroProxyHandler)
        } else if (interfaceType === 'old') {
            window.hero = new Proxy(window.hero, heroProxyHandler)
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
                spottedNpcs.push(npcDetails)
                spottedNpcs.forEach((spottedNpc) => {
                    if (Math.sqrt(Math.pow(heroDetails.x - spottedNpc.x, 2) + Math.pow(heroDetails.y - spottedNpc.y, 2)) < 12) {
                        infromChat(heroDetails, spottedNpc)
                    }
                })
            }
        }

        const npcRemoved = (npc) => {
            if (interfaceType == 'new') {
                if (npc.d.wt > 79) {
                    spottedNpcs.splice(spottedNpcs.indexOf(npc.d), 1)
                }
            } else if (interfaceType == 'old') {
                if (npc.wt > 79) {
                    spottedNpcs.splice(spottedNpcs.indexOf(npc), 1)
                }
            }
        }

        const infromChat = (hero, npc) => {
            const trimmedMessages = cachedMessages.filter(msg => msg.msg.includes(` na ${npc.nick} (${npc.lvl} lvl) `))

            if (trimmedMessages.length == 0) {
                sendMessageOnClanChat(`1 na ${npc.nick} (${npc.lvl} lvl) ${interfaceType == 'new' ? Engine.map.d.name : window.map.name} (${npc.x}, ${npc.y})`)
            } else {
                const latestMessage = trimmedMessages[trimmedMessages.length - 1]
                const now = new Date()
                const nextMessageNumber = Number(latestMessage.msg.split(' ')[0]) + 1

                for (let message of trimmedMessages) {
                    const senderNick = getEngine().businessCardManager.getCard(message.sender).getNick()
                    let messageTime = new Date(message.ts * 1000)

                    if (now - messageTime < 900000 && senderNick === hero.nick) {
                        return
                    }
                }
                sendMessageOnClanChat(`${nextMessageNumber} na ${npc.nick} (${npc.lvl} lvl)`)
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
                        if (npcsList[npcs[npc].id] === undefined && npcs[npc].wt > 79) {
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
    }

    async function loadUnlagInvite() {

        let addonName = 'unlag-invite'

        const unlagInvite = () => {
            _g('party&a=accept&answer=1')
        }

        const position = rojvStorage.addons[addonName].position

        const unlagInviteWindow = new RojvWindow({
            size: { width: 50, height: 0 },
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

        addTip(unlagInviteWindow.getContent(), 'Akceptuj zaproszenie do grupy')
    }

    async function loadHighlightGroups() {
        let addonName = 'highlight-groups'

        const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`

        const colors = new Map()

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
        })()

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
                this.getOrder = () => 2
            }
        }

        const getDrawableListMask = (npcs) => Object.values(npcs).map(npc => new DrawMask(npc))
        API.addCallbackToEvent('call_draw_add_to_renderer', () => Engine.renderer.add(...getDrawableListMask(Engine.npcs.check())))
    }

    async function loadEliteDesignation() {
        let addonName = 'elite-designation'

        const e2LabelImage = new Image()
        e2LabelImage.src = 'https://i.imgur.com/d8alPfF.png'

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

                    ctx.drawImage(e2LabelImage, posLeft + fw / 2 - 15, posTop - 24 + positionY, 30, 20)
                }
                this.getOrder = () => 100
            }
        }
        const getDrawableListE2Label = (npcs) => Object.values(npcs).map(npc => new DrawE2Label(npc))
        API.addCallbackToEvent('call_draw_add_to_renderer', () => Engine.renderer.add(...getDrawableListE2Label(Engine.npcs.check())))

        RojvAPI.emitter.on('town', (data) => {
            e2GrpSet.clear()
        })
        API.addCallbackToEvent('removeNpc', (npc) => {
            npcsValueMap.delete(npc.d.id)
        })
    }

    async function loadHerosOccupationSpace() {
        let addonName = 'heros-occupation-space'
        let addonsSettings = { ...defaultConfig.addons[addonName], ...rojvStorage.addons[addonName].settings }

        const isCol = (x, y) => Engine.map.col.check(x, y) === 1
        const borderImage = new Image()
        borderImage.src = 'https://i.imgur.com/c9dkho1.png'

        const mapCords = new Map()

        const borderColor = addonsSettings['border-color']

        const generateBorderImg = (() => {
            const canvas = document.createElement('canvas')
            canvas.width = 32
            canvas.height = 32
            const ctx = canvas.getContext('2d')
            ctx.strokeStyle = borderColor
            ctx.shadowBlur = 5
            ctx.lineWidth = 2
            ctx.strokeRect(2, 2, 28, 28)

            return canvas
        })()

        borderImage.onload = () => {
            generateBorderImg.getContext('2d').drawImage(borderImage, 0, 0, 32, 32)
        }

        const calcPosition = (a, b, id) => {
            const arr = []
            for (let i = -5; i < 6; i++) {
                for (let j = -5; j < 6; j++) {
                    if (
                        a + i >= 0 &&
                        b + j >= 0 &&
                        a + i <= Engine.map.d.x &&
                        b + j <= Engine.map.d.y
                    ) {
                        arr.push({ id, x: a + i, y: b + j })
                    }
                }
            }
            const newArr = arr.filter((item) => {
                try {
                    return getPath(item.x, item.y) != null && !isCol(item.x, item.y)
                } catch (error) {
                    return false
                }
            })
            mapCords.set(id, newArr || [])
        }

        class AStar {
            constructor(width, height, start, end) {
                this.width = width
                this.height = height
                this.collisions = this.parseCollisions(width, height)
                this.start = this.collisions[start.x][start.y]
                this.end = this.collisions[end.x][end.y]
                this.start.beginning = true
                this.start.g = 0
                this.start.f = heuristic(this.start, this.end)
                this.end.target = true
                this.end.g = 0
                this.addNeighbours()
                this.openSet = []
                this.closedSet = []
                this.openSet.push(this.start)
            }

            parseCollisions(width, height) {
                const collisions = new Array(width)
                for (let w = 0; w < width; w++) {
                    collisions[w] = new Array(height)
                    for (let h = 0; h < height; h++) {
                        collisions[w][h] = new Point(
                            w,
                            h,
                            Engine.map.col.check(w, h) > 0
                        )
                    }
                }
                return collisions
            }

            addNeighbours() {
                for (let i = 0; i < this.width; i++) {
                    for (let j = 0; j < this.height; j++) {
                        this.addPointNeighbours(this.collisions[i][j])
                    }
                }
            }

            addPointNeighbours(point) {
                const x = point.x,
                    y = point.y
                const neighbours = []
                if (x > 0) neighbours.push(this.collisions[x - 1][y])
                if (y > 0) neighbours.push(this.collisions[x][y - 1])
                if (x < this.width - 1) neighbours.push(this.collisions[x + 1][y])
                if (y < this.height - 1) neighbours.push(this.collisions[x][y + 1])
                point.neighbours = neighbours
            }

            anotherFindPath() {
                while (this.openSet.length > 0) {
                    let currentIndex = this.getLowestF()
                    let current = this.openSet[currentIndex]
                    if (current === this.end) return this.reconstructPath()
                    else {
                        this.openSet.splice(currentIndex, 1)
                        this.closedSet.push(current)
                        for (const neighbour of current.neighbours) {
                            if (this.closedSet.includes(neighbour)) continue
                            else {
                                const tentative_score = current.g + 1
                                let isBetter = false
                                if (this.end == this.collisions[neighbour.x][neighbour.y] ||
                                    (!this.openSet.includes(neighbour) && !neighbour.collision)) {
                                    this.openSet.push(neighbour)
                                    neighbour.h = heuristic(neighbour, this.end)
                                    isBetter = true
                                } else if (
                                    tentative_score < neighbour.g &&
                                    !neighbour.collision
                                ) {
                                    isBetter = true
                                }
                                if (isBetter) {
                                    neighbour.previous = current
                                    neighbour.g = tentative_score
                                    neighbour.f = neighbour.g + neighbour.h
                                }
                            }
                        }
                    }
                }
            }

            getLowestF() {
                let lowestFIndex = 0
                for (let i = 0; i < this.openSet.length; i++) {
                    if (this.openSet[i].f < this.openSet[lowestFIndex].f) lowestFIndex = i
                }
                return lowestFIndex
            }

            reconstructPath() {
                const path = []
                let currentNode = this.end
                while (currentNode !== this.start) {
                    path.push(currentNode)
                    currentNode = currentNode.previous
                }
                return path
            }
        }

        class Point {
            constructor(x, y, collision) {
                this.x = x
                this.y = y
                this.collision = collision
                this.g = 10000000
                this.f = 10000000
                this.neighbours = []
                this.beginning = false
                this.target = false
                this.previous = undefined
            }
        }

        const heuristic = (p1, p2) => {
            return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
        }

        const getPath = (x, y) => {
            const hero = Engine.hero.d
            const map = Engine.map.d

            let path = new AStar(map.x, map.y, { x: hero.x, y: hero.y }, { x: x, y: y }).anotherFindPath()

            if (!Array.isArray(path)) {
                return null
            }

            return path
        }

        class DrawBorder {
            constructor(npc) {
                const { collider, d: { id, wt }, rx, ry } = npc

                this.rx = npc.rx
                this.ry = npc.ry

                this.draw = (ctx) => {
                    if (collider == null) return

                    const [offsetX, offsetY] = Engine.map.offset
                    const isHeros = wt >= 79 && wt <= 99

                    if (isHeros && mapCords.has(id)) {
                        mapCords.get(id).forEach((a) => {
                            ctx.drawImage(generateBorderImg, (a.x * 32) - offsetX, (a.y * 32) - offsetY, 32, 32)
                        })
                    } else if (isHeros) {
                        calcPosition(rx, ry, id)
                    }
                }
                this.getOrder = () => 1
            }
        }
        const getDrawableListBorder = (a) => Object.values(a).map(b => new DrawBorder(b))

        API.addCallbackToEvent('call_draw_add_to_renderer', () => Engine.renderer.add(...getDrawableListBorder(Engine.npcs.check())))
        API.addCallbackToEvent('removeNpc', (npc) => mapCords.delete(npc.d.id))

        RojvAPI.emitter.on('town', (data) => {
            mapCords.clear()
        })

    }

    async function loadMineHelper() {
        let addonName = 'mine-helper'
        const position = rojvStorage.addons[addonName].position

        const mineHelperWindow = new RojvWindow({
            size: { width: 50, height: 0 },
            draggable: true,
            windowType: WindowTypeEnum.Clear,
            managePosition: position ? position : null
        })

        mineHelperWindow.getContent().innerText = `Zamrożony czarodziej: ${rojvStorage.addons[addonName].wizCount ?? 0}\nPorzucony kilof: ${rojvStorage.addons[addonName].pickCount ?? 0}`

        mineHelperWindow.onChangesPosition(() => {
            rojvStorage.addons[addonName].position = mineHelperWindow.getPosition()
            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
        })

        mineHelperWindow.getContainer().style.whiteSpace = 'nowrap'

        addTip(mineHelperWindow.getContainer(), 'Mine Helper')

        const wizardLabelImage = new Image()
        const pickaxeLabelImage = new Image()
        wizardLabelImage.src = 'https://i.imgur.com/3OqBGiC.png'
        pickaxeLabelImage.src = 'https://i.imgur.com/tmMbvRV.png'

        const amplitude = 4
        const mineNpcsValueMap = new Map()

        const pickaxeName = 'Porzucony kilof'
        const wizardName = 'Zamrożony czarodziej'

        const lastMineDate = new Date(rojvStorage.addons[addonName].lastMineDate ?? 0)
        const todayDate = new Date()

        if (todayDate.getDay() === 1 && lastMineDate.toLocaleDateString() !== todayDate.toLocaleDateString()) {
            rojvStorage.addons[addonName].wizCount = 0
            rojvStorage.addons[addonName].pickCount = 0
            rojvStorage.addons[addonName].lastMineDate = todayDate.getTime()
            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
        }

        let wizCount = rojvStorage.addons[addonName].wizCount ?? 0
        let pickCount = rojvStorage.addons[addonName].pickCount ?? 0

        class DrawMineLabel {
            constructor(npc) {
                const { d: { id, nick }, rx, ry, fw } = npc
                if (nick !== pickaxeName && nick !== wizardName) return

                this.rx = rx
                this.ry = ry

                this.draw = (ctx) => {
                    const [offsetX, offsetY] = Engine.map.offset
                    const [left, top] = npc.collider?.box || [0, 0]
                    const posLeft = left - offsetX
                    const posTop = top - offsetY

                    let npcValue = mineNpcsValueMap.get(id) ?? { positionY: 0, velocityY: 0.1 }
                    let { positionY, velocityY } = npcValue

                    positionY += velocityY

                    if (positionY > amplitude || positionY < -amplitude) {
                        velocityY = -velocityY
                    }
                    mineNpcsValueMap.set(id, { positionY, velocityY, nick })

                    if (nick === pickaxeName) {
                        ctx.drawImage(pickaxeLabelImage, posLeft + fw / 2 - 32, posTop - 24 + positionY, 64, 22)
                    } else if (nick === wizardName) {
                        ctx.drawImage(wizardLabelImage, posLeft + fw / 2 - 16, posTop - 30 + positionY, 64, 28)
                    }
                }
                this.getOrder = () => 100
            }
        }
        const getDrawableListMineLabel = (npcs) => Object.values(npcs).map(npc => new DrawMineLabel(npc))
        API.addCallbackToEvent('call_draw_add_to_renderer', () => Engine.renderer.add(...getDrawableListMineLabel(Engine.npcs.check())))

        API.addCallbackToEvent('removeNpc', (npc) => {
            mineNpcsValueMap.delete(npc.d.id)
        })

        API.addCallbackToEvent('newNpc', (npc) => {
            if (npc.d.nick === pickaxeName || npc.d.nick === wizardName) {
                mineNpcsValueMap.set(npc.d.id, { positionY: 0, velocityY: 0.1, nick: npc.d.nick })
            }
        })

        RojvAPI.emitter.on('sendRequestToTalk', (id) => {
            const npc = mineNpcsValueMap.get(id)
            if (npc) {
                if (npc.nick === pickaxeName) {
                    rojvStorage.addons[addonName].pickCount = pickCount + 1
                    pickCount = pickCount + 1
                } else if (npc.nick === wizardName) {
                    rojvStorage.addons[addonName].wizCount = wizCount + 1
                    wizCount = wizCount + 1
                }
                mineHelperWindow.getContent().innerText = `Zamrożony czarodziej: ${wizCount}\nPorzucony kilof: ${pickCount}`
                document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
            }
        })
    }

    async function loadTimersBox() {
        let addonName = 'timers-box'

        let timers = null
        let timersRetryCount = 300
        const fetchTimers = () => {
            timers = document.getElementsByClassName('cll-timers')
            if (!timers.length && timersRetryCount > 0) {
                timersRetryCount -= 1
                setTimeout(fetchTimers, 50)
            } else if (!timers.length && timersRetryCount == 0) {
                console.error('Nie znaleziono timerów')
            } else {
                loadTimers()
            }
        }

        const loadTimers = () => {
            const position = rojvStorage.addons[addonName].position
            const size = rojvStorage.addons[addonName].size
            let lastSelected = rojvStorage.addons[addonName].lastSelected

            const timersBoxWindow = new RojvWindow({
                size: size ? size : { width: 100, height: 300 },
                draggable: true,
                windowType: WindowTypeEnum.Classic,
                managePosition: position ? position : null,
                resizable: true,
                header: {
                    title: {
                        text: 'Timers Box',
                        fontSize: '12px'
                    }
                }
            })

            const changeContentHeight = () => {
                timersBoxWindow.getContent().style.height = parseInt(timersBoxWindow.getContainer().style.height) - timersBoxWindow.getHeader().offsetHeight + 'px'
                if (timersBoxWindow.getNavigation()) {
                    timersBoxWindow.getContent().style.height = parseInt(timersBoxWindow.getContainer().style.height) - timersBoxWindow.getHeader().offsetHeight - timersBoxWindow.getNavigation().offsetHeight + 'px'
                }
            }

            timersBoxWindow.onChangesPosition(() => {
                rojvStorage.addons[addonName].position = timersBoxWindow.getPosition()
                document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
            })

            timersBoxWindow.onChangesSize(() => {
                changeContentHeight()
                rojvStorage.addons[addonName].size = timersBoxWindow.getSize()
                document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
            })

            timersBoxWindow.getContainer().style.padding = '2px 2px 10px 2px'

            addTip(timersBoxWindow.getHeader(), 'Timers Box')

            const timersBoxContent = timersBoxWindow.getContent()

            const lootlogs = new Map()

            for (let i = 0; i < timers.length; i++) {
                let timer = timers[i]
                $(timer).trigger('mouseenter')
                $(timer).draggable('disable')
                Object.assign(timer.style, {
                    'position': 'static',
                    'margin-top': '3px',
                    'margin-left': '1px',
                    'margin-right': '1px',
                    'max-width': '100%',
                })
                var css = timer.getAttribute('style')
                timer.setAttribute('style', css.replace('static;', 'static !important;'))
                let name = timer.getAttribute('id').split('cll-timers-')[1].replace(/_/g, ' ')
                lootlogs.set(name, timer)
            }

            if (lootlogs.size === 1) {
                timersBoxContent.appendChild([...lootlogs.values()][0])
            } else {
                let navigationItems = {}
                lastSelected = lootlogs.keys().some((key) => { key === lastSelected }) ? lastSelected : [...lootlogs.keys()][0]
                lootlogs.forEach((value, key) => {
                    navigationItems[key] = { name: key.toUpperCase(), content: value, isFooter: false }
                    if (key === lastSelected) {
                        navigationItems[key].active = true
                        rojvStorage.addons[addonName].lastSelected = key
                        document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                    }
                })
                let navigation = timersBoxWindow.generateNavigation(navigationItems)
                navigation.style.marginTop = '0'
                let navigationItemsList = timersBoxWindow.getNavigationItems()
                navigationItemsList.forEach((item) => {
                    let itemId = item.getAttribute('id')
                    item.addEventListener('click', () => {
                        if (lastSelected !== itemId) {
                            lastSelected = itemId
                            rojvStorage.addons[addonName].lastSelected = itemId
                            document.rojvPanel.GM_setValue('rojv-storage', rojvStorage)
                        }
                    })
                })
            }
            changeContentHeight()
        }

        fetchTimers()
    }

    let promisesAddons = []
    for (let addon in rojvStorage.addons) {
        if (checkAddonAvailability(addon)) {
            promisesAddons.push(addons[addon].function())
        }
    }

    Promise.all(promisesAddons)

})()