// ==UserScript==
// @name         Rojv Addon Panel
// @author       Rojvu
// @description  Dodatek do gry Margonem stan na 14.03.2024r
// @version      1.11
// @icon         https://i.imgur.com/ZGby6xi.png
// @match        http*://*.margonem.pl/
// @match        http*://*.margonem.com/
// @exclude      http*://margonem.*/*
// @exclude      http*://www.margonem.*/*
// @exclude      http*://new.margonem.*/*
// @exclude      http*://forum.margonem.*/*
// @exclude      http*://commons.margonem.*/*
// @exclude      http*://dev-commons.margonem.*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      margonem.pl
// @connect      margonem.com
// @run-at       document-body
// ==/UserScript==

!function () {

    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.type = 'text/css'

    const script = document.createElement('script')
    script.type = 'module'

    const rojvPanel = {}
    document.rojvPanel = rojvPanel

    if (typeof GM_setValue !== 'undefined') {
        rojvPanel.GM_getValue = GM_getValue
        rojvPanel.GM_setValue = GM_setValue
    } else {
        rojvPanel.GM_getValue = function (key) {
            return JSON.parse(localStorage.getItem(key))
        }
        rojvPanel.GM_setValue = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    rojvPanel.GM_xmlhttpRequest = GM_xmlhttpRequest
    rojvPanel.GM_info = GM_info

    let cacheToken = rojvPanel.GM_getValue('rojv_panel_cache_token')
    if (!cacheToken) {
        cacheToken = Math.random().toString(36).substring(2)
        rojvPanel.GM_setValue('rojv_panel_cache_token', cacheToken)
    }

    function getResourceUrl(resource) {
        return `https://b1al1.github.io/rojv-addons-panel/${resource}?v=${cacheToken}`
    }

    script.src = getResourceUrl('addons-panel.js')
    document.head.appendChild(script)
    style.href = getResourceUrl('addons-panel.css')
    document.head.appendChild(style)
}()