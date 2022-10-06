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
    let res = await ConsultaVeiculo(urlParams.get('id'));
    PreencherFormulario(res);
}

async function ConsultaVeiculo(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/Veiculos/Confirmar?id=' +id, options )
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
    
    let id = parseInt(document.querySelector('#id-produto').value);    
     console.log(id);
     let veiculoCliente = document.querySelector('#veiculoCliente').value;  
     console.log(veiculoCliente);
     let placaVeiculoCliente = document.querySelector('#placaVeiculoCliente').value;  
     console.log(valoplacaVeiculoClienterPeca);
     let corVeiculoCliente = document.querySelector('#corVeiculoCliente').value;  
     console.log(corVeiculoCliente);
     let idCliente = document.querySelector('#idCliente').value;  
     console.log(idCliente);
          
     let veiculo = {
         id,
         veiculoCliente,
         placaVeiculoCliente,
         corVeiculoCliente,
         idCliente
        };
 
     let salvarVeiculoViewModel = {
        veiculo        
     };
 
     console.log(salvarVeiculoViewModel);
 
     let response = await EnviarApi(salvarVeiculoViewModel);
     console.log(response);
 }

getVeiculoNome();

function Voltar(){
    window.location = "../../index.html";
  }