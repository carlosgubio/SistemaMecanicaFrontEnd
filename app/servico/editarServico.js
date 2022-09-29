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
async function getServicoNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaServico(urlParams.get('nome'));
    PreencherFormulario(res);
}

async function ConsultaServico(nome){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/servicos/consultaNome?nome={nome}', options )
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
    let descricaoServico = dadosForm.querySelector('#descricaoServico');
    let valorServico = dadosForm.querySelector('#valorServico');
 
    console.log(json);
    descricaoServico.value = json.descricaoServico;
    valorServico.value = json.valorServico;
 }
 getServicoNome();