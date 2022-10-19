// $('.cliente').click(function(){
//   $('.menu ul .itensCliente').toggleClass('mostra');
// });

function carregaDocumento(arquivo, target)
    {
        var el = document.querySelector(target);

        //Se o elemento não existir então não requisita
        if (!el) return;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", arquivo, true);
        xhr.onreadystatechange = function(){
             if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
                  el.innerHTML = xhr.responseText;
             }
        };

        xhr.send(null);
    }

function CarregarTelaCadastroCliente(){  
window.location = "./module/moduleCliente/salvarCliente.html";
}
function CarregarTelaListagemCliente(){
window.location = "./module/moduleCliente/listarCliente.html";
}
function CarregarTelaEditarCliente(){
window.location = "./module/moduleCliente/editarCliente.html";
}

function CarregarTelaCadastroProfissional(){  
window.location = "./module/moduleProfissional/salvarProfissional.html";
}
function CarregarTelaListagemProfissional(){
window.location = "./module/moduleProfissional/listarProfissional.html";
}
function CarregarTelaEditarProfissional(){
window.location = "./module/moduleProfissional/editarProfissional.html";
}

function CarregarTelaCadastroProduto(){  
window.location = "./module/moduleProduto/salvarProduto.html";
}
function CarregarTelaListagemProduto(){
window.location = "./module/moduleProduto/listarProduto.html";
}
function CarregarTelaEditarProduto(){
window.location = "./module/moduleProduto/editarProduto.html";
}

function CarregarTelaCadastroServico(){  
window.location = "./module/moduleServico/salvarServico.html";
}
function CarregarTelaListagemServico(){
window.location = "./module/moduleServico/listarServico.html";
}
function CarregarTelaEditarServico(){
window.location = "./module/moduleServico/editarServico.html";
}

function CarregarTelaCadastroVeiculo(){  
window.location = "./module/moduleVeiculo/salvarVeiculo.html";
}
function CarregarTelaListagemVeiculo(){
window.location = "./module/moduleVeiculo/listarVeiculo.html";
}
function CarregarTelaEditarVeiculo(){
window.location = "./module/moduleVeiculo/editarVeiculo.html";
}

function CarregarTelaCadastroOrdemServico(){  
window.location = "./module/moduleOrdemServico/salvarOrdemServico.html";
}
function CarregarTelaListagemOrdemServico(){
window.location = "./module/moduleOrdemServico/listarOrdemServico.html";
}
function CarregarTelaEditarOrdemServico(){
window.location = "./module/moduleOrdemServico/editarOrdemServico.html";
}
