(function () {
    const interface = (function () {
        if (typeof API != 'undefined' && typeof Engine != 'undefined' && typeof margoStorage == 'undefined') {
            return 'new'
        } else if (typeof dbget == 'undefined' && typeof proceed == 'undefined') {
            return 'old'
        }
    })()

    const image = new Image()
    image.src = 'https://i.imgur.com/CrsKwgi.png'
    class DrawMap {
        constructor(map) {
            this.rx = Engine.hero.rx
            this.ry = Engine.hero.ry
            this.draw = (ctx) => {
                const [offsetX, offsetY] = map.offset
                ctx.save()
                ctx.drawImage(image, -offsetX, -offsetY, map.d.x * 32, map.d.y * 32)
                ctx.restore()
            }
            this.getOrder = () => 0
        }
    }

    function start() {
        if (interface == 'new') {
            if (Engine && Engine.allInit && Engine.map) {
                API.addCallbackToEvent('call_draw_add_to_renderer', () => {
                    if (Engine.map.d.name != 'Kopalnia Krwawej Pychy') return
                    Engine.renderer.add(new DrawMap(Engine.map))
                })
            } else {
                setTimeout(() => start(), 50)
            }
        } else if (interface == 'old') {
            g.loadQueue.push({
                fun: function () {
                    if (map.name == 'Kopalnia Krwawej Pychy') {
                        $('#bground, #ground').css('background-image', "url('https://i.imgur.com/keCdQCX.png')")
                        $("#inmap img").attr("src", "https://i.imgur.com/keCdQCX.png")
                    }
                }
            })
        }
    }

    start()
})()