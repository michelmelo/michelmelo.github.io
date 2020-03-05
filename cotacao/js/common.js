
function updateData(){
    
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();  // Sunday is 0, Monday is 1, and so on.
    
    setTab('cotacao');

    chrome.storage.local.get('state', function(localData){ // só segue se os valores não estiverem atualizados

        if (
            ((day >= 1) && (day <= 5) && (hour >= 8) && (hour <= 18)) 
            || localData.state == -1 || localData.state == null) {

                chrome.browserAction.setBadgeText({text: '...'});
                // mixpanel.track("Cotacao update");
                // gets data from WS
                var m, c;
                var k = 'ABC88';
                chrome.storage.sync.get(['cidadeSelecionada', 'moedaSelecionada'], function(data){
                    m = data.moedaSelecionada;
                    c = data.cidadeSelecionada;
                    
                    var url = "http://www.melhorcambio.com/ws/chrome.php"+
                    "?M="+m+
                    "&C="+c+
                    "&K="+k;

                    // makes the xhr call
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.onreadystatechange = function(){
                        chrome.storage.local.set({state: 1});
                        if (xhr.readyState == 4){
                            // stores the data on chrome.storage.local
                            data = JSON.parse(xhr.responseText);
                            if (data.especie != null && data.vtm != null) {
                                chrome.storage.local.set({
                                    state: 0,
                                    dia: data.dia,
                                    hora: data.hora,
                                    especie: data.especie,
                                    vtm: data.vtm
                                }, function(){
                                        updateBadge();
                                    });
                            }
                        }
                    }
                    xhr.send();
                });
            } else {
            updateBadge();
        }
    })

}

// adicionar click que abre cotacao
function updateBadge(){
    chrome.storage.local.get('especie', function(data) {
        if (data.especie != null)
            chrome.browserAction.setBadgeText({
                text: accounting.formatMoney(data.especie, "", 2, ".", ",")
            });
    });
}

function clearBadge(){
    chrome.browserAction.setBadgeText( {text: ''} );
}

function _showLoading(){
    $("#conteudo").fadeOut("fast");
    $("#loading").fadeIn("fast");
}

function _hideLoading(){
    $("#conteudo").fadeIn("fast");
    $("#loading").fadeOut("fast");
}


function dayDiff(first, second) {
    first = new Date(first);
    second = new Date(second);
    return Math.round((second.getTime()-first.getTime())/(1000*60*60*24));
}

var setTabOptions = function(){  
    chrome.tabs.create({url: 'src/options.html'});    
}

var setTabCotacao = function(){
    chrome.storage.sync.get(function(data){
        if (data.moedaSelecionada != undefined){
            chrome.tabs.create({url: 'https://www.melhorcambio.com/cotacao/compra/'+data.moedaSelecionada+'/'+data.cidadeSelecionada+'/snoslm5my7ml'});
        } else {
            chrome.browserAction.setBadgeText({text: ''});
            setTab('options');
            setTabOptions(); 
        }
    });
}

function setTab(destination){
    chrome.browserAction.onClicked.removeListener(setTabOptions);
    chrome.browserAction.onClicked.removeListener(setTabCotacao);
    if (destination == 'cotacao'){
        chrome.browserAction.onClicked.addListener(setTabCotacao);
    } else {
        chrome.browserAction.onClicked.addListener(setTabOptions);
    }
}