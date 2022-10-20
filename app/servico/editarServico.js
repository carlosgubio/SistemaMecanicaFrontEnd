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

async function getServicoNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaServico(urlParams.get('id'));
    PreencherFormularioServico(res);
}

async function ConsultaServico(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/servicos/confirmar?id=' +id, options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
async function PreencherFormularioServico(json){
    let dadosForm = document.querySelector('#form');
    let idServico = dadosForm.querySelector('#id-servico');
    let descricaoServico = dadosForm.querySelector('#descricaoServico');
    let valorServico = dadosForm.querySelector('#valorServico');
 
    console.log(json);
    idServico.value = json.idServico;
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
    const req =  await fetch('https://localhost:44363/servicos/atualizar', options )
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
    
    let idservico = parseInt(document.querySelector('#id-servico').value);    
        console.log(idservico);
        let descricaoServico = document.querySelector('#descricaoServico').value;  
        console.log(descricaoServico);
        let valorServico = document.querySelector('#valorServico').value;  
        console.log(valorServico);
          
     let servico = {
        idservico,
        descricaoServico,
        valorServico : parseFloat(valorServico)
        };
 
     let salvarServicoViewModel = {
        atualizar : servico        
     };
 
     console.log(salvarServicoViewModel);
 
     let response = await EnviarApi(salvarServicoViewModel);
     console.log(response);
 }

 getServicoNome();

