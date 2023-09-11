(function () {
    const interface = (function () {
        if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
            return 'new'
        } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
            return 'old'
        }
    })()

    const style = document.createElement('style')
    style.innerHTML = `
        .unlag-invite-NI {
            position: fixed;
            bottom: 5px;
        }

        .unlag-invite-SI {
            position: relative;
            width: 50px;
            border: 2px solid #fff;
            font-size: 12px;
            bottom: 585px;
            left: 210px;
            cursor: pointer;
        }

        .unlag-invite-SI:hover {
            background-color: #572f2f;
        }

        .button-cell-unlag-invite {
            border: 1px solid #999999;
            display: table-cell;
            padding: 3px 10px;
            cursor: pointer;
        }

        .tooltip-unlag-invite .tooltiptext-unlag-invite {
            visibility: hidden;
            width: 120px;
            text-align: center;
            position: absolute;
            background: rgba(0,0,0,.5);
            border: 3px double #d6c8c8;
            border-image: none;
            background-size: 100% 100%;
            bottom: 48px;
            right: 10px;
            box-shadow: 0 0 0 0 #2b282a,0 0 0 1px #353131,0 0 0 2px #191311,0 0 0 3px #2b2727,0 0 0 4px #59595a,0 0 0 5px #9da1a7,0 0 0 6px #5a585b,0 0 0 7px #2c2625
            z-index: 1;
        }

        .tooltip-unlag-invite:hover .tooltiptext-unlag-invite {
            visibility: visible;
        }
    `
    document.head.appendChild(style)

    function _loadQueue() {
        let element = document.createElement('div')
        element.classList.add('unlag-invite-SI')
        element.innerHTML = `
            <div class="button-cell-unlag-invite">Unlag Invite</div>
        `
        $('#chat').ready(() => {
            $('#chat').append(element)
        })
        element.addEventListener('click', () => {
            _g('party&a=accept&answer=1')
        })
    }

    function start() {
        if (interface == 'new') {
            if (Engine && Engine.allInit) {
                let element = document.createElement('div')
                let childDivElement = document.createElement('div')
                let childSpanElement = document.createElement('span')
                childDivElement.classList.add('icon', 'party')
                childSpanElement.classList.add('tooltiptext-unlag-invite')
                childSpanElement.innerText = 'Unlag Invite'
                element.classList.add('tooltip-unlag-invite', 'unlag-invite-NI', 'widget-button', 'green', 'widget-in-interface-bar', 'widget-compass', 'ui-draggable', 'ui-draggable-handle', 'ui-draggable-disabled')
                element.appendChild(childSpanElement)
                element.appendChild(childDivElement)
                $('.bottom-panel-of-bottom-positioner.bottom-panel').ready(() => {
                    $('.bottom-panel-of-bottom-positioner.bottom-panel').append(element)
                })
                element.addEventListener('click', () => {
                    _g('party&a=accept&answer=1')
                })
            } else {
                setTimeout(() => start(), 50)
            }
        } else if (interface == 'old') {
            g.loadQueue.push({ fun: _loadQueue, data: '' })
        }
    }

    start()
})()