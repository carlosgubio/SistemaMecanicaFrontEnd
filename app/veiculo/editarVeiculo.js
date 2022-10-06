async function CarregarTemplate(enderecoTela){    
    const template = await fetch(enderecoTela)
    .then(response=> { 
        return response.text();      
      }).catch(erro=> {
          console.log(erro);
      });    
    return template;
}

function converterParaDomElement(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
}

function Voltar(){
    window.location = "../../index.html";
}
async function getVeiculoNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaVeiculo(urlParams.get('nome'));
    PreencherFormulario(res);
}

async function ConsultaVeiculo(nome){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/Veiculos/veiculos?nome={nome}', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
async function PreencherFormulario(json){
    let dadosForm = document.querySelector('#form');
    let veiculoCliente = dadosForm.querySelector('#veiculoCliente');
    let placaVeiculoCliente = dadosForm.querySelector('#placaVeiculoCliente');
    let corVeiculoCliente = dadosForm.querySelector('#corVeiculoCliente');
    let idCliente = dadosForm.querySelector('#idCliente');

    console.log(json);
    veiculoCliente.value = json.veiculoCliente;
    cpfCliente.value = json.cpfCliente;
    placaVeiculoCliente.value = json.placaVeiculoCliente;
    corVeiculoCliente.value = json.corVeiculoCliente;
    idCliente.value = json.idCliente;
}
getVeiculoNome();

function Voltar(){
    window.location = "../../index.html";
  }