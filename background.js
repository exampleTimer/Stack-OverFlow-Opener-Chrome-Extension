const filter = {url:[{urlMatches:"https://www.google.com/*"},
                    {urlMatches:"https://www.bing.com/*"}]};

const unrequiredTransitionQualifiers = ["forward_back","server_redirect"];

chrome.webNavigation.onCommitted.addListener(function(details){
    var currentTransitionQualifiers = details.transitionQualifiers.filter(qualifier => unrequiredTransitionQualifiers.includes(qualifier));
    if(currentTransitionQualifiers.length === 0 && details.transitionType != "reload"){
        chrome.tabs.executeScript({
            file: 'content.js'
        },_=>{
            let error = chrome.runtime.lastError;
            if(error !== undefined){
                console.log(error);
            }
        });
    }
},filter);

chrome.runtime.onMessage.addListener(
    async function(request,_,_){
        if(request.message === "open_new_tab" && request.url){
            let currentTabIndex = await new Promise(function(resolve,_){
                chrome.tabs.query({currentWindow: true, active: true}, function(tabs){ 
                    resolve(tabs[0].index);
                });
            })
            chrome.tabs.create({index:currentTabIndex + 1,  url:request.url,active:false});
        }
    }
);
