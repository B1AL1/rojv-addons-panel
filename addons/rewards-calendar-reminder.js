(function () {
    const interface = (function () {
        if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
            return 'new'
        } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
            return 'old'
        }
    })()

    function _loadQueue() {
        $("#new_event_calendar").ready(() => {
            setTimeout(() => {
                if ($("#new_event_calendar").hasClass("notif")) {
                    for (let i = 0; i < 5; i++) {
                        window.message('Odbierz kalendarz!')
                    }
                    _g("rewards_calendar&action=show")
                }
            }, 500)
        })
    }

    function start() {
        if (interface == 'new') {
            if (Engine && Engine.allInit) {
                $('.rewards-calendar').ready(() => {
                    setTimeout(() => {
                        if ($("div[widget-name='rewards-calendar']").has('.specific-animation').length) {
                            for (let i = 0; i < 5; i++) {
                                window.message('Odbierz kalendarz!')
                            }
                            _g("rewards_calendar&action=show")
                        }
                    }, 500)
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