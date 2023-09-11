(function () {
    'use strict'
    const Engine = window.Engine
    const player = window.Engine.hero.d
    const $ = window.$
    const createStorage = () => {
        let storage = {}

        try {
            storage = JSON.parse(localStorage.getItem('klanowicze_onlineNI'))
        } catch (error) { }

        //assigns object to storage
        const setStorage = object => {
            const modifiedStorage = { ...storage, ...object }
            storage = modifiedStorage
            localStorage.setItem('klanowicze_onlineNI', JSON.stringify(modifiedStorage))
        }

        const getStorage = () => ({ ...storage })

        return { setStorage, getStorage }
    }

    const { setStorage, getStorage } = createStorage()
    let opacityOption = [0.2, 0.4, 0.6, 0.8, 1.0]

    let state = {
        wasMembersHidden: false,
        top: '10px',
        left: '200px',
        opacity: 4,
        ...getStorage()
    }

    //assigns object to state
    const setState = object => { state = { ...state, ...object } }

    //assigns object to state and storage
    const updateMemory = object => {
        setState(object)
        setStorage(object)
    }

    const tipContainer = document.createElement('div')
    tipContainer.classList.add('ko-tip')
    $('body').append(tipContainer)

    const container = document.createElement('div')
    container.id = 'klanowicze-online'
    container.classList.add('default-cursor')
    Object.assign(container.style, {
        boxSizing: 'border-box',
        position: 'absolute',
        left: state.left,
        top: state.top,
        opacity: opacityOption[state.opacity],
        border: '3px gray double',
        color: '#eeeeee',
        width: '330px',
        backgroundColor: 'black',
        fontSize: '16px',
        zIndex: 500
    })

    const membersTable = document.createElement('table')
    Object.assign(membersTable.style, {
        fontSize: '0.7em',
        width: '100%',
        'border-collapse': 'collapse',
        tableLayout: 'fixed'
    })

    const membersTableWrapper = document.createElement('div')
    membersTableWrapper.hidden = state.areMembersHidden
    membersTableWrapper.style.padding = '1px'
    membersTableWrapper.appendChild(membersTable)
    container.appendChild(membersTableWrapper)

    const changeOpacity = () => {
        let i = (state.opacity >= opacityOption.length - 1) ? 0 : state.opacity + 1
        updateMemory({ opacity: i })
        Object.assign(container.style, { opacity: opacityOption[state.opacity] })
    }

    const options = document.createElement('div')
    options.classList.add('ko-options')
    Object.assign(options.style, {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid gray',
        backgroundColor: 'black',
        fontSize: '16px',
        zIndex: 500
    })
    container.prepend(options)

    const option_opacity = document.createElement('div')
    option_opacity.classList.add('ko-increase-opacity', 'do-change-opacity')
    option_opacity.title = 'ZmieĹ przezroczystoĹÄ'
    Object.assign(option_opacity.style, {
        'margin-right': '10px',
        'margin-top': 'auto',
        'margin-bottom': 'auto'
    })
    options.appendChild(option_opacity)
    $(option_opacity).on('click', changeOpacity)

    const title = document.createElement('div')
    title.textContent = 'Klanowicze online'
    title.classList.add('ko-tittle')
    Object.assign(title.style, {
        fontSize: '1.1em',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '2px'
    })

    options.append(title)
    const buttonHide = document.createElement('button')
    buttonHide.classList.add('mz-control', 'mz-control__control', 'mz-button', 'mz-button--icon')
    buttonHide.title = state.wasMembersHidden ? 'RozwiĹ' : 'ZwiĹ'
    Object.assign(buttonHide.style, {
        marginLeft: 'auto',
        height: '16px',
        width: '16px'
    })
    options.append(buttonHide)
    $(buttonHide).html(`<svg class="mz-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.686 427.314L104 328l-32.922-31.029C55.958 281.851 66.666 256 88.048 256h112C213.303 256 224 266.745 224 280v112c0
      21.382-25.803 32.09-40.922 16.971L152 376l-99.314 99.314c-6.248 6.248-16.379 6.248-22.627 0L4.686 449.941c-6.248-6.248-6.248-16.379
      0-22.627zM443.314 84.686L344 184l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C234.697 256 224 245.255 224 232V120c0-21.382
      25.803-32.09 40.922-16.971L296 136l99.314-99.314c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.248 6.248 6.248 16.379 0 22.627z" fill="currentColor">
    </path>
  </svg>`)
    $(container).draggable({
        cancel: 'table', //can't drag membersTable
        stop: function () {
            const {
                top,
                left
            } = container.style
            updateMemory({
                top,
                left
            })
        }
    })

    //style table rows and cells
    const tableStyle = document.createElement('style')
    tableStyle.textContent = `
    .ko-tip {
      font-family: sans-serif;
      display: none;
      background: #171819;
      border: 1px solid #333c43;
      color: #a9b2ba;
      font-size: 12px;
      line-height: 18px;
      max-width: 92vw;
      padding: 5px 10px 4px;
      position: absolute;
      box-shadow: 0 1px 6px 0 #0c0e11;
      border-radius: 5px;
      z-index: 999;
    }
    .ko-row {
      border: solid;
      border-width: 1px 0;
      border-color: #5d5006;
      height: 1.6em;
    }
    .ko-row:hover {
      background: #1e1e1e;
      color: #e1e1e1;
    }
    .ko-row:first-child {
      border-top: none;
    }
    .ko-row:last-child {
      border-bottom: none;
    }
    .ko-row > * {
      vertical-align: middle;
    }

    .ko-add-to-group-cell, .ko-nick-cell {
      user-select: none;
      width:35%;
    }
    .ko-add-to-group-cell:hover, .ko-nick-cell:hover {
      color: #eaeb74;
    }
    .ko-nick-cell {
      padding-right:1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ko-add-to-group-cell {
      text-align: center;
      width: 12px;
    }

    .ko-map-cell {
      text-align: left;
      margin-left:5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ko-increase-opacity:hover {
      background: url(../img/gui/buttony.png) -725px -146px;
    }
    .ko-increase-opacity {
      width: 16px;
      height: 16px;
      background: url(../img/gui/buttony.png) -725px -131px;
      cursor: url(../img/gui/cursor/5.png) 4 0,url(../img/gui/cursor/5.cur) 4 0,auto;
    }
    .mz-button--icon {
      border-radius: 50%;
      padding: 1px 2px;
    }

    .mz-button--icon, .mz-button--text {
      background: none;
      box-shadow: none;
    }

    .mz-button {
      margin: 0 2px;
      border-radius: 5px;
      display: inline-block;
      width: auto;
      font-weight: 700;
    }

    .mz-control__control {
      margin: 0;
      padding: 2px 6px;
      width: 100%;
      border: none;
      border-radius: 10px;
      cursor: url(https://cronus.margonem.com/img/gui/cursor/5.png),pointer;
      background: linear-gradient(0deg,#333,#000);
      box-shadow: 0 0 1px 2px #545454, inset 0 0 0.8em #000;
      transition: box-shadow .2s ease-in-out;
    }

    .mz-control, .mz-control * {
      box-sizing: border-box;
      font: inherit;
      color: inherit;
    }

    .mz-button--icon svg {
      cursor: url(https://cronus.margonem.com/img/gui/cursor/5.png),pointer;
    }

    .mz-icon {
      width: 1em;
      height: 1em;
      vertical-align: calc(-.125em - 1px);
      display: inline-block;
      font-size: inherit;
      overflow: visible;
    }
    .mz-control {
      padding: 2px;
    }

  `
    document.body.appendChild(tableStyle)

    const startWritingMessageTo = nick => {
        getEngine().chatController.getChatInputWrapper().setPrivateMessageProcedure(nick)
    }

    const chatWith = nick => () => startWritingMessageTo(nick)
    const addToGroup = id => () => window._g(`party&a=inv&id=${id}`)

    const fetchMembers = async () =>
        new Promise(resolve => {
            //super API bulwo
            const clan = Engine.clan
                ? { ...Engine.clan } //shallow copy
                : Engine.clan

            if (!clan)
                Engine.clan = {
                    updateMembers() { }
                }

            _g(`clan&a=members`, (data) => {
                Engine.clan = clan
                let { members } = data
                if (!members.length || !members) {
                    resolve(null)
                }
                else {
                    if ($('div.clan-members-content .clan-members-table-header .table-header:nth-child(4) div')) {
                        $('div.clan-members-content .clan-members-table-header .table-header:nth-child(4) div').click()
                        if (!$('div.clan-members-content .clan-members-table-header .table-header:nth-child(4)').hasClass('header-sort--asc'))
                            $('div.clan-members-content .clan-members-table-header .table-header:nth-child(4) div').click()
                    }
                    resolve(data.members)
                }
            })


        })

    const renderOnlineMembers = members => {

        if (members === null) return
        const membersTableBody = document.createElement('tbody')
        if (state.areMembersHidden) $(membersTable).hide()
        for (let member of members) {

            const row = membersTableBody.insertRow(); row.classList.add('ko-row')

            const addToGroupCell = row.insertCell()
            addToGroupCell.textContent = '+'
            addToGroupCell.dataset.tip = 'Dodaj do grupy'
            addToGroupCell.classList.add('ko-add-to-group-cell', 'do-action-cursor')
            addToGroupCell.addEventListener('click', addToGroup(member[0]))

            const nickCell = row.insertCell()
            nickCell.textContent = `${member[1]} (${member[2]}${member[3]})`
            nickCell.classList.add('ko-nick-cell', 'do-action-cursor')
            nickCell.dataset.tip = `${member[1]} (${member[2]}${member[3]})`
            nickCell.addEventListener('click', chatWith(member[1]))

            const mapCell = row.insertCell()
            mapCell.textContent = member[4]
            mapCell.dataset.tip = `${member[4]} (${member[5]},${member[6]})`
            mapCell.classList.add('ko-map-cell')

        }
        $('#klanowicze-online').on('mouseenter', 'td', function (e) {
            if ($(this).data('tip') != undefined) {
                $(tipContainer).html($(this).data('tip'))
                $(tipContainer).css({
                    top: e.pageY,
                    left: e.pageX + 5
                })
                $(tipContainer).show()
            }
        })
        $('#klanowicze-online').on('mouseleave', 'td', function () { $(tipContainer).hide() })
        if (membersTable.tBodies.length === 0) {
            membersTable.appendChild(membersTableBody)
        } else
            membersTable.replaceChild(membersTableBody, membersTable.tBodies[0])

    }

    const Members = members => {
        let OnlineMembers = JSON.parse(JSON.stringify(members))

        if (OnlineMembers === null) return
        OnlineMembers = OnlineMembers.reduce(function (rows, key, index) {
            return (index % 10 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
        }, [])

        OnlineMembers = OnlineMembers.filter((element) => element[8] <= 5 && element[1] != player.nick)

        title.title = OnlineMembers.length === 0 ? 'JesteÄÂÄšÄÄÂĂÂ tylko ty' : `${OnlineMembers.length} klanowiczĂłw`
        title.textContent = 'Klanowicze online ' + `(${OnlineMembers.length} online)`
        title.dataset.tip = `${OnlineMembers.length} klanowiczĂłw`
        $('#klanowicze-online').on('mouseenter', '.ko-tittle', function () {
            if ($(this).data('tip') != undefined) {
                $(tipContainer).html($(this).data('tip'))
                $(tipContainer).show()
            }
        })
        $('#klanowicze-online').on('mouseleave', '.ko-tittle', function () { $(tipContainer).hide() })
        renderOnlineMembers(OnlineMembers)
    }

    const fetchAndRenderOnlineMembers = () => {
        //don't interrupt changing character or sending message
        if (Engine.logOff) return
        fetchMembers().then(data => { Members(data) })
    }

    let fetchMembersInterval = null
    const startMembersFetching = () => {
        fetchAndRenderOnlineMembers()
        fetchMembersInterval = setInterval(fetchAndRenderOnlineMembers, 5000)
    }

    //const stopMembersFetching = () => {
    //   clearInterval(fetchMembersInterval)
    //}

    const handleHideMembersButtonClick = () => {
        const modifiedAreMembersHidden = !state.areMembersHidden
        membersTableWrapper.hidden = modifiedAreMembersHidden
        updateMemory({ areMembersHidden: modifiedAreMembersHidden })

        if (modifiedAreMembersHidden) {
            $(membersTable).hide()
            buttonHide.title = 'RozwiĹÂ'

        } else {
            //startMembersFetching()
            $(membersTable).show()
            buttonHide.title = 'ZwiĹÂ'
        }

    }

    $(buttonHide).on('click', handleHideMembersButtonClick)

    const loadQueuePush = fn => {
        if (Engine.allInit) {
            fn()
            return
        }
        setTimeout(loadQueuePush, 1000, fn)
    }

    loadQueuePush(() => {
        if (!player.clan) return
        document.body.appendChild(container)
        setTimeout(startMembersFetching, 1000)
    })
})()