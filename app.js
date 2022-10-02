/* eslint-disable no-unused-vars */

const openUrlOnAlt = (base, info, tab) => {
    ;[
        /^https:\/\/www\.youtube\.com\/watch\?v=(\S+)/,
        /^https:\/\/youtu\.be\/(\S+)/,
    ].forEach((regex) => {
        const url = info.linkUrl ?? info.selectionText ?? ''
        const found = url.match(regex)
        if (found !== null) {
            const url = `${base}/watch?v=${found[1]}`
            chrome.tabs.create({
                active: false,
                url: url,
            })
        }
    })
}

// Youtube -> Invidious
;[
    'https://youtube.076.ne.jp',
    'https://invidious.esmailelbob.xyz',
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
