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
async function getProdutoNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaProduto(urlParams.get('nome'));
    PreencherFormulario(res);
}

async function ConsultaProduto(nome){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/produtos/consultaNome?nome={nome}', options )
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
    let descricaoPeca = dadosForm.querySelector('#descricaoPeca');
    let valorPeca = dadosForm.querySelector('#valorPeca');
 
    console.log(json);
    descricaoPeca.value = json.descricaoPeca;
    valorPeca.value = json.valorPeca;
 }
getProdutoNome();