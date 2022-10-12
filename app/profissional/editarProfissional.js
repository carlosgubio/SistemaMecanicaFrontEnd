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
    let res = await ConsultaProfissional(urlParams.get('id'));
    PreencherFormularioProfissional(res);
}

async function ConsultaProfissional(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/profissionais/Confirmar?id=' +id, options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
async function PreencherFormularioProfissional(json){
    let dadosForm = document.querySelector('#form');
    let idProfissional = dadosForm.querySelector('#id-profissional');
    let nomeProfissional = dadosForm.querySelector('#nomeProfissional');
    let cargoProfissional = dadosForm.querySelector('#cargoProfissional');
 
    console.log(json);
    idProfissional.value = json.idProfissional;
    nomeProfissional.value = json.nomeProfissional;
    cargoProfissional.value = json.cargoProfissional;
 }

async function EnviarApi(viewmodel){
    
    //opções/dados para fazer a request;
    const options = {
    //método, se é um post, get etc..
    method: 'PUT', 
    headers:{'content-type': 'application/json'},       
    body: JSON.stringify(viewmodel) 
    };

    //TODO: mudar a url para o seu localhost.
    const req =  await fetch('https://localhost:44363/profissionais/atualizar', options )
    //caso a request dê certo, retornará a resposta;
    .then(response => {      
        response.text()
        .then(data=>  {
            alert(data);
            return data;
        });
    }) 
    //caso dê erro, irá retornar o erro e mostrar no console
    .catch(erro => {
        console.log(erro);
        return erro;
    });

    return req;
}

async function Atualizar(){
    
    let idProfissional = parseInt(document.querySelector('#id-profissional').value);    
        console.log(idProfissional);
        let nomeProfissional = document.querySelector('#nomeProfissional').value;  
        console.log(nomeProfissional);
        let cargoProfissional = document.querySelector('#cargoProfissional').value;  
        console.log(cargoProfissional);
            
     let profissional = {
        idProfissional,
        nomeProfissional,
        cargoProfissional
        };
 
     let salvarProfissionalViewModel = {
        atualizar : profissional     
     };
 
     console.log(salvarProfissionalViewModel);
 
     let response = await EnviarApi(salvarProfissionalViewModel);
     console.log(response);
 }

 getProfissionalNome();

 function Voltar(){
    window.location = "../../index.html";
  }