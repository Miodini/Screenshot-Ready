function hideOrShow(){
    const elements = {
        chromeBottom: document.querySelector('.ytp-chrome-bottom'),
        gradientBottom: document.querySelector('.ytp-gradient-bottom'),
        chromeTop: document.querySelector('.ytp-chrome-top'),
        gradientTop: document.querySelector('.ytp-gradient-top'),
        brandingImg: document.querySelector('.branding-img')
    }
    if(elements.brandingImg === null) delete elements.brandingImg
    // Hids or shows the above elements
    chrome.storage.local.get("isOn", ({isOn}) => {
        if(isOn)
            Object.values(elements).forEach(e => e.style.removeProperty('display'))
        else
            Object.values(elements).forEach(e => e.style.display = 'none')
    })
    // Toggles the on/off indicator
    chrome.storage.local.get("isOn", ({isOn}) => {
        chrome.storage.local.set({isOn: !isOn})
    })
}
hideOrShow()