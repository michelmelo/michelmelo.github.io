function _init() {
    chrome.browserAction.setPopup({
        popup: "src/popup.html"
    });

    _showLoading();
    updateData();
    updatePopup();
    _hideLoading();
    mixpanel.track("Popup");
}

function updatePopup(callback) {
    $("#especie").text(accounting.formatMoney(localStorage['especie'], "R$ ", 2, ".", ","));
    $("#vtm").text(accounting.formatMoney(localStorage['vtm'], "R$ ", 2, ".", ","));
    $("#cidade").html(localStorage['cn']);
    $("#moeda").html(localStorage['mn']);
    $("#atualizado-em").html('Atualizados em ' + localStorage['dia'] + ', às ' + localStorage['hora']);

    $(document).ready(function() {
        document.getElementById('btn-exibir-valores-nova-cotacao-comprar')
            .addEventListener('click',
                function() {
                    chrome.tabs.create({
                        url: 'http://cotacao.michelmelo/cotacao/' + localStorage['m'] + '/' + localStorage['c'] + '?utm_source=plugin&utm_medium=organic&utm_campaign=chrome-extension'
                    });
                });
    });
}

document.addEventListener('DOMContentLoaded', _init, false);