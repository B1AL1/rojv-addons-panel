(function () {

    let heroses = []

    let lastBattle = null

    const parseJSON = Engine.communication.parseJSON
    Engine.communication.parseJSON = function (data) {
        if (data.hasOwnProperty('f')) {
            console.log(data.f)
            let containsHeros = true
            for (let warrior in data.f.w) {
                if (!data.f.w[warrior].hasOwnProperty('originalId')) {
                    containsHeros = false
                }
            }
            if (containsHeros) {
                lastBattle = data.f
            }
            if (data.f.hasOwnProperty('endBattle') && data.f.endBattle) {
                informPkt(lastBattle)
            }
        }
        const result = parseJSON.apply(this, arguments)
        return result
    }

    function start() {
        if (Engine && Engine.npcs && Engine.npcs.check && Engine.allInit) {
            API.addCallbackToEvent('newNpc', newHeros)
        } else {
            setTimeout(() => start(), 50)
        }
    }

    start()

    function newHeros(npc) {
        if (npc.d.wt > 79 && npc.d.wt <= 99) {
            heroses.push(npc.d.id)
        }
    }

    function informPkt(fight) {
        for (let warrior in fight.w) {
            let containsHeros = false
            if (heroses.includes('' + fight.w[warrior].originalId)) {
                containsHeros = true
                heroses.splice(heroses.indexOf('' + fight.w[warrior].originalId), 1)
            }

            if (containsHeros && (!Engine.party || Engine.party?.getLeaderId() == Engine.hero.d.id)) {
                let questSolutionWindow = new Window({
                    content: `Oznacz ${fight.w[warrior].name} (${fight.w[warrior].lvl}${fight.w[warrior].prof}) na DC!`,
                    title: 'DK Info',
                    nameWindow: 'DK_Info',
                    nameRefInParent: 'wnd',
                    objParent: this,
                    type: 'transparent',
                    managePosition: {
                        x: '300',
                        y: '80'
                    }
                })
                message(`Oznacz ${fight.w[warrior].name} (${fight.w[warrior].lvl}${fight.w[warrior].prof}) na DC!`)
            }

            if (containsHeros && Engine.party && Engine.party?.getLeaderId() != Engine.hero.d.id) {
                let questSolutionWindow = new Window({
                    content: `Dodaj reakcje do wiadomości z ${fight.w[warrior].name} (${fight.w[warrior].lvl}${fight.w[warrior].prof}) na DC!`,
                    title: 'DK Info',
                    nameWindow: 'DK_Info',
                    nameRefInParent: 'wnd',
                    objParent: this,
                    type: 'transparent',
                    managePosition: {
                        x: '300',
                        y: '80'
                    }
                })
                message(`Dodaj reakcje do wiadomości z ${fight.w[warrior].name} (${fight.w[warrior].lvl}${fight.w[warrior].prof}) na DC!`)
            }
        }
    }

    const Window = class {
        constructor(options) {
            this.wnd = window.Engine.windowManager.add({
                content: " ",
                nameWindow: options.name || " ",
                parentObj: options.objParent || null,
                nameRefInParent: options.nameRefInParent || "wnd",
                type: options.type || "normal",
                title: options.title,
                managePosition: options.managePosition || null,
                onclose: options.onclose
            })
            this.$ = this.wnd.$[0]

            this.$content = document.createElement("div")

            this.$content.style.color = "white"
            this.$content.style.paddingTop = "10px"

            if (typeof options.content != "undefined")
                this.$content.innerHTML = options.content

            this.wnd.content(this.$content)
            this.wnd.addToAlertLayer()
            this.wnd.setWndOnPeak()
            this.wnd.updatePos()
        }

        getCloseBtt() {
            const $close = this.$.querySelector(".close-button-corner-decor")
            if ($close) {
                return $close
            } else {
                return null
            }
        }

        close() {
            this.wnd.close()
        }
    }

})()