(async function () {
    await fetch('https://raw.githubusercontent.com/B1AL1/async-addons-panel/main/utils/constants.js')
        .then(res => res.blob())
        .then(blob => {
            var objectURL = URL.createObjectURL(blob)
            var sc = document.createElement("script")
            sc.setAttribute("src", objectURL)
            sc.setAttribute("type", "text/javascript")
            document.head.appendChild(sc)
        })
    console.log(Constants.addons)
})()