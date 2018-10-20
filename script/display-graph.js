/**
 * This file will load the image when the user click on the extension icon
 */
var browser = browser || chrome;

browser.storage.local.get(['title', 'url'], function(data) {
    if(data.title && data.url) {
        document.getElementById('title').innerText = data.title;
        
        document.getElementById('graph').onload = function(){
            document.getElementById('download').style.display = "inline";
        };
        document.getElementById('graph').src = data.url;

        document.getElementById('download').onclick = function(e){
            e.preventDefault();
            var downloading = browser.downloads.download({
                url : data.url,
                filename : data.title.replace(/\s/g, '_') + '.svg',
                conflictAction : 'uniquify'
            });
        };
    }
});