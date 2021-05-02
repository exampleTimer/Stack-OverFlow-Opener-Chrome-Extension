{
    let links = document.getElementsByTagName("a");
    const numLinks = links.length;
    let index = 0;
    const soRegex = new RegExp("https://stackoverflow.com/*");
    while(index < numLinks && !soRegex.test(links[index].href)) index++;
    const url = index < numLinks ? links[index].href : "";
    chrome.runtime.sendMessage({"message":"open_new_tab", "url":url});
}