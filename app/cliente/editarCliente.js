async function CarregarTemplate(enderecoTela){    
    const template = await fetch(enderecoTela)
    .then(response=> { 
        return response.text();      
      }).catch(erro=> {
          console.log(erro);
      });    
    return template;
}
async function AdicionarVeiculo(){  
    let veiculo =  document.querySelector('#dadosVeiculo');    
    let templateVeiculo = await CarregarTemplate('../../module/moduleCliente/veiculo.html');    
    veiculo.innerHTML = templateVeiculo;
}

function converterParaDomElement(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
}

function Voltar(){
    window.location = "../../index.html";
}
async function getClienteNome(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaCliente(urlParams.get('id'));
    PreencherFormularioCliente(res);   
}

async function ConsultaCliente(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/clientes/Confirmar?id=' +id, options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
async function ConsultaVeiculo(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/veiculos/Confirmar?id=' +id, options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}

async function PreencherFormularioCliente(json){
    let dadosForm = document.querySelector('#form');    
    let idCliente = dadosForm.querySelector('#id-cliente');
    let nomeCliente = dadosForm.querySelector('#nomeCliente');
    let cpfCliente = dadosForm.querySelector('#cpfCliente');
    let telefoneCliente = dadosForm.querySelector('#telefoneCliente');
    let enderecoCliente = dadosForm.querySelector('#enderecoCliente');

    console.log(json);
    nomeCliente.value = json.nomeCliente;
    idCliente.value = json.idCliente;
    cpfCliente.value = json.cpfCliente;
    telefoneCliente.value = json.telefoneCliente;
    enderecoCliente.value = json.enderecoCliente;
    PreencherFormularioVeiculo(json.veiculosDto);
}
async function PreencherFormularioVeiculo(json){

    let veiculo = document.querySelector('#dadosVeiculo');
    
    let templateVeiculo = converterParaDomElement(await CarregarTemplate('../../module/moduleCliente/veiculo.html'));

    console.log(templateVeiculo);

    let idVeiculoInput = templateVeiculo.querySelector('#id-veiculo');
    let veiculoClienteInput = templateVeiculo.querySelector('#veiculoCliente');    
    let placaVeiculoClienteInput= templateVeiculo.querySelector('#placaVeiculoCliente');
    let corVeiculoClienteInput = templateVeiculo.querySelector('#corVeiculoCliente');
    
    console.log(json);

    idVeiculoInput.value = json.idVeiculo;
    veiculoClienteInput.value = json.veiculoCliente;    
    placaVeiculoClienteInput.value = json.placaVeiculoCliente;
    corVeiculoClienteInput.value = json.corVeiculoCliente;
  
    veiculo.appendChild(templateVeiculo);
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
    const req =  await fetch('https://localhost:44363/clientes/atualizar', options )
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

async function EnviarApiVeiculo(viewmodel){
    
    //opções/dados para fazer a request;
    const options = {
    //método, se é um post, get etc..
    method: 'PUT', 
    headers:{'content-type': 'application/json'},       
    body: JSON.stringify(viewmodel) 
    };

    //TODO: mudar a url para o seu localhost.
    const req =  await fetch('https://localhost:44363/Veiculos/atualizar', options )
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
    
   let divVeiculo = document.querySelector('#areaVeiculo');  

    if(!divVeiculo)
    {
        alert("Veículo não preenchido");  
        return;
    }

    let idVeiculo = divVeiculo.querySelector('#id-veiculo').value;
    console.log(idVeiculo);
    let veiculoCliente = divVeiculo.querySelector('#veiculoCliente').value;
    console.log(veiculoCliente);
    let placaVeiculoCliente = divVeiculo.querySelector('#placaVeiculoCliente').value;
    console.log(placaVeiculoCliente);
    let corVeiculoCliente = divVeiculo.querySelector('#corVeiculoCliente').value;
    console.log(corVeiculoCliente);    

    let veiculo = {
        idVeiculo : parseInt(idVeiculo),
        veiculoCliente,
        placaVeiculoCliente,
        corVeiculoCliente        
    };

    let idCliente = parseInt(document.querySelector('#id-cliente').value);    
    console.log(idCliente);
    let nomeCliente = document.querySelector('#nomeCliente').value;  
    console.log(nomeCliente);
    let cpfCliente = document.querySelector('#cpfCliente').value;  
    console.log(cpfCliente);
    let telefoneCliente = document.querySelector('#telefoneCliente').value;  
    console.log(telefoneCliente);
    let enderecoCliente = document.querySelector('#enderecoCliente').value;  
    console.log(enderecoCliente);
    
    let cliente = {
        idCliente,
        nomeCliente,
        cpfCliente,
        telefoneCliente,
        enderecoCliente        
    };

    let model = {
        atualizar : veiculo
    };
    let salvarClienteViewModel = {
        atualizar : cliente,     
    };

    console.log(salvarClienteViewModel);

    let responseCliente = await EnviarApi(salvarClienteViewModel);
    let responseVeiculo = await EnviarApiVeiculo(model);
    console.log(responseCliente);
}


getClienteNome();

function Voltar(){
    window.location = "../../index.html";
  }