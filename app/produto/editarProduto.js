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
    let res = await ConsultaProduto(urlParams.get('id'));
    PreencherFormularioProduto(res);
}

async function ConsultaProduto(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/produtos/confirmar?id=' +id, options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
async function PreencherFormularioProduto(json){
    let dadosForm = document.querySelector('#form');
    let idProduto = dadosForm.querySelector('#id-produto');
    let descricaoPeca = dadosForm.querySelector('#descricaoPeca');
    let valorPeca = dadosForm.querySelector('#valorPeca');
 
    console.log(json);
    idProduto.value = json.idProduto
    descricaoPeca.value = json.descricaoPeca;
    valorPeca.value = json.valorPeca;
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
    const req =  await fetch('https://localhost:44363/produtos/atualizar', options )
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
    
    let idProduto = parseInt(document.querySelector('#id-produto').value);    
        console.log(idProduto);
        let descricaoPeca = document.querySelector('#descricaoPeca').value;  
        console.log(descricaoPeca);
        let valorPeca = document.querySelector('#valorPeca').value;  
        console.log(valorPeca);
          
     let produto = {
        idProduto,
        descricaoPeca,
        valorPeca : parseFloat(valorPeca)
        };
 
     let salvarProdutoViewModel = {
        atualizar : produto       
     };
 
     console.log(salvarProdutoViewModel);
 
     let response = await EnviarApi(salvarProdutoViewModel);
     console.log(response);
 }

 getProdutoNome();

function Voltar(){
    window.location = "../../index.html";
  }