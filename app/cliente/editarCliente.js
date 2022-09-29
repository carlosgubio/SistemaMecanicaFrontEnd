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
async function getPessoaNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultarNome(urlParams.get('nome'));
    PreencherFormulario(res);
}

async function ConsultaNome(nome){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/clientes/consultarNome?nome={nome}', options )
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
    let nomeCliente = dadosForm.querySelector('#nomeCliente');
    let cpfCliente = dadosForm.querySelector('#cpfCliente');
    let telefoneCliente = dadosForm.querySelector('#telefoneCliente');
    let enderecoCliente = dadosForm.querySelector('#enderecoCliente');

    console.log(json);
    nomeCliente.value = json.nomeCliente;
    cpfCliente.value = json.cpfCliente;
    telefoneCliente.value = json.telefoneCliente;
    enderecoCliente.value = json.enderecoCliente;
}
getPessoaNome();