/**
 * State codes
 * -1 needs updating
 * 0 updated
 * 1 updating from remote
 */

function checkFirstInstall(){

    chrome.storage.sync.get(['optionsSetAt', 'cidadeSelecionadaNome', 'moedaSelecionadaNome'], function(data){
      
      if (data.optionsSetAt == null){

        $("#notifications")
          .html("<h3>Olá! Selecione sua cidade e a moeda que deseja monitorar!</h3>")
          .fadeIn("fast"); 
      
      } else {

        $("#notifications")
          .html("<h3>Você está acompanhando o câmbio do(a) "+data.moedaSelecionadaNome+" em "+data.cidadeSelecionadaNome+"</h3>")
          .fadeIn("medium"); 
        $(".dica").fadeIn("slow");
        
      }
    });

}

// Saves options troughout chrome sessions for same user
function save_options() {

  var idCidadeSelecionada = $("#cidade option:selected").val();
  var nomeCidadeSelecionada = $("#cidade option:selected").text();
  var idMoedaSelecionada = $("#moeda option:selected").val();
  var nomeMoedaSelecionada = $("#moeda option:selected").text();

  if (idCidadeSelecionada != "" && idMoedaSelecionada != ""){
    
    // tells update functions that they need to update
    chrome.storage.local.set({ state: -1});
    clearBadge();
    
    // stores options accross sessions on chrome.storage.sync
    chrome.storage.sync.set({
      cidadeSelecionada: idCidadeSelecionada,
      cidadeSelecionadaNome: nomeCidadeSelecionada,
      moedaSelecionada: idMoedaSelecionada,
      moedaSelecionadaNome: nomeMoedaSelecionada,
      optionsSetAt: +new Date()
      }, function(){ 
        
        chrome.storage.local.remove(['especie','vtm']);
        // Update status to let user know options were saved.
        $("#notifications")
          .html("<h3>Agora você está acompanhando o câmbio do(a) "+nomeMoedaSelecionada+" em "+nomeCidadeSelecionada)+"!</h3>";
        $(".dica").fadeIn("slow");
        updateData();

      });
    
    } else {

      $("#status")
        .html("<h4>Ops! Você precisa selecionar uma moeda e uma cidade...</h4>");
      _fadeStatus();

    }
}


// Restores select box state to saved value from localStorage.
function restoreOptions() {
  chrome.storage.sync.get(['cidadeSelecionada', 'moedaSelecionada'], function(data){
    $("#cidade").val(data.cidadeSelecionada);
    $("#moeda").val(data.moedaSelecionada);
  })  
}

function listMoedaCidate(){
  
  var today = +new Date();
  chrome.storage.local.get('listUpdatedAt', function(data){
    if (data.listUpdatedAt == null || dayDiff(data.listUpdatedAt,today) > 14){
      var xhr = new XMLHttpRequest();
      xhr.open("GET","http://www.melhorcambio.com/ws/chrome.php?listaCidades=1",true);
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {
          data = JSON.parse(xhr.responseText);
          chrome.storage.local.set({
            listaMoedas: data[0], 
            listaCidades: data[1], 
            listUpdatedAt: +new Date()}
          );
          _montaComboMoeda(data[0]);
          _montaComboCidade(data[1]);
          _hideLoading();
        }

      }
      xhr.send();

    } else {

      chrome.storage.local.get(['listaCidades','listaMoedas'], function(data){
        _montaComboMoeda(data.listaMoedas);
        _montaComboCidade(data.listaCidades);
        _hideLoading();
        restoreOptions();
      })

    }
  });
}

function _montaComboCidade(data){
  $.each(data, function(k, v){
    $("select#cidade").append( 
      $("<option />").val(v.cid_url).text(v.cidade) 
    );
  });
}

function _montaComboMoeda(data){
  $.each(data, function(k, v){
    $("select#moeda").append( 
      $("<option />").val(v.moeda_url).text(v.nome_moeda) 
    );
  });
}

function _fadeStatus(){
  $("#status").fadeIn("slow");
  setTimeout(function() {
    $("#status").fadeOut("slow");
  }, 3500);
}

function _init_options(){
  mixpanel.track("Abriu options");
  listMoedaCidate();
  $("#save").on('click',save_options);
}

$("#status").hide();
$("#notifications").hide();
_showLoading();
checkFirstInstall();

document.addEventListener('DOMContentLoaded', _init_options);