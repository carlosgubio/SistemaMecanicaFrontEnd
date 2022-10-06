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
async function getProfissionalNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaProfissional(urlParams.get('nome'));
    PreencherFormulario(res);
}

async function ConsultaProfissional(nome){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/profissionais/consultaNome?nome={nome}', options )
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
    let nomeProfissional = dadosForm.querySelector('#nomeProfissional');
    let cargoProfissional = dadosForm.querySelector('#cargoProfissional');
 
    console.log(json);
    nomeProfissional.value = json.nomeProfissional;
    cargoProfissional.value = json.cargoProfissional;
 }
 getProfissionalNome();

 function Voltar(){
    window.location = "../../index.html";
  }