
setInterval(function () {
    updateData()
}, 90*1000); // 90 segundos

setInterval(function () {
    chrome.storage.local.get('state', function(data){
        if (data.state == -1) {
            setTab('cotacao');
        }
    });
}, 3*1000);

chrome.runtime.onInstalled.addListener(function(info){
    showOptionsOnInstall(info)
});

function showOptionsOnInstall(info){
    chrome.storage.sync.get('optionsSetAt', function(data){
        
        if (data.optionsSetAt == null) {

            chrome.tabs.create({url: 'src/options.html'});
            setTab('options');

            if ( info.reason == "install" ) {
                mixpanel.track("Nova instalacao");
            }

        } else {
            updateData();
        }
    });
}