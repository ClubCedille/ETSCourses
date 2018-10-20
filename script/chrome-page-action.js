if (chrome) {
    function checkIfPageIsValid(tabId, changeInfo, tab){
        if (tab.url.indexOf('https://www.etsmtl.ca/Programmes-Etudes/1er-cycle/Bac/') === 0 && tab.url.indexOf('Programmes-bac-genie-electrique') === -1) {
            chrome.pageAction.show(tabId);
        }
    }
    chrome.tabs.onUpdated.addListener(checkIfPageIsValid);
}