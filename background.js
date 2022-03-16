// Majority of code based from https://developer.chrome.com/docs/extensions/reference/action examples
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ isOn: false })
	chrome.action.disable()
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// Declare a rule to enable the action on youtube.com/watch pages
		let youtube = {
		  	conditions: [
				new chrome.declarativeContent.PageStateMatcher({
			  		pageUrl: {urlContains: 'youtube.com/watch'},
				})
		  	],
		  	actions: [new chrome.declarativeContent.ShowAction()],
		}
		// Finally, apply our new array of rules
		let rules = [youtube]
		chrome.declarativeContent.onPageChanged.addRules(rules)
	})
})

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
	  	target: {tabId: tab.id},
	  	files: ['content.js']
	})
	// Updates the badge
	chrome.storage.local.get("isOn", ({isOn}) => {
        if(isOn){
			chrome.action.setBadgeText({text: ''})
		}
        else{
			chrome.action.setBadgeText({text: 'ON'})
			chrome.action.setBadgeBackgroundColor({color: '#fe0000'})
        }
    })
})

