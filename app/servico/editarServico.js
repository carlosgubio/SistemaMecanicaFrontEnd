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
    let res = await ConsultaServico(urlParams.get('id'));
    PreencherFormulario(res);
}

async function ConsultaServico(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/servicos/Confirmar?id=' +id, options )
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

 async function EnviarApi(viewmodel){
    
    //opções/dados para fazer a request;
    const options = {
    //método, se é um post, get etc..
    method: 'PUT', 
    headers:{'content-type': 'application/json'},       
    body: JSON.stringify(viewmodel) 
    };

    //TODO: mudar a url para o seu localhost.
    const req =  await fetch('https://localhost:44317/produtos/atualizar', options )
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
    
    let id = parseInt(document.querySelector('#id-servico').value);    
     console.log(id);
     let descricaoServico = document.querySelector('#descricaoServico').value;  
     console.log(descricaoServico);
     let valorServico = document.querySelector('#valorServico').value;  
     console.log(valorServico);
          
     let servico = {
         id,
         descricaoServico,
         valorServico
        };
 
     let salvarServicoViewModel = {
        servico        
     };
 
     console.log(salvarServicoViewModel);
 
     let response = await EnviarApi(salvarServicoViewModel);
     console.log(response);
 }

 getServicoNome();

 function Voltar(){
    window.location = "../../index.html";
  }