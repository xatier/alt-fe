/* eslint-disable no-unused-vars */

const openUrlOnAlt = (base, info, tab) => {
    ;[
        /^https:\/\/youtube\.com\/watch\?v=(\S+)/,
        /^https:\/\/youtu\.be\/(\S+)/,
    ].forEach((regex) => {
        let url = info.linkUrl ?? info.selectionText ?? ''
        // remove the optional 'www.' prefix
        url = url.replace('www.', '')
        const found = url.match(regex)
        if (found !== null) {
            const url = `${base}/watch?v=${found[1]}`
            chrome.tabs.create({
                active: false,
                index: tab.index + 1,
                url: url,
            })
        }
    })
}

// Youtube -> Invidious
;[
    'https://yewtu.be',
    'https://invidious.jing.rocks',
    'https://y.com.sb',
].forEach((base) => {
    chrome.contextMenus.create({
        title: `open on Invidious ${base}`,
        contexts: ['link', 'selection'],
        onclick: function (info, tab) {
            openUrlOnAlt(base, info, tab)
        },
    })
})

// Instagram -> Picuki
chrome.contextMenus.create({
    title: `open on Picuki`,
    contexts: ['link', 'selection'],
    onclick: function (info, tab) {
        const picuki_base = 'https://www.picuki.com'
        const instagram_regex =
            /^https:\/\/(www\.)?instagram\.com\/([^\s\?]+)(\?igshid=\S+)?/
        const url = info.linkUrl ?? info.selectionText ?? ''
        const found = url.match(instagram_regex)
        if (found !== null) {
            const url = `${picuki_base}/profile/${found[2]}`
            chrome.tabs.create({
                active: false,
                index: tab.index + 1,
                url: url,
            })
        }
    },
})
