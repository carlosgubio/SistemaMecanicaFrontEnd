//função para carregar o template via request;
async function CarregarTemplate(nome){    
  const template = await fetch(nome)
  .then(response=> { 
      return response.text();      
    }).catch(erro=> {
        console.log(erro);
    });    
  return template;
}

async function AdicionarVeiculo(){  
  let veiculo =  document.querySelector('#dadosVeiculo');    
  let templateVeiculo = await CarregarTemplate('../../module/moduleCliente/Veiculo.html'); 
  veiculo.innerHTML = templateVeiculo;
}
//convertendo o texto e adicionando em tela;
function converterParaDomElement(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};

//pegando os dados do formulário
async function salvarCliente(){
  let nomeCliente = document.querySelector('#nomeCliente').value;  
  console.log(nomeCliente);
  let cpfCliente = document.querySelector('#cpfCliente').value;  
  console.log(cpfCliente);
  let telefoneCliente = document.querySelector('#telefoneCliente').value;  
  console.log(telefoneCliente);
  let enderecoCliente = document.querySelector('#enderecoCliente').value;  
  console.log(enderecoCliente);
    
  let cliente = {
    nomeCliente,
    cpfCliente,
    telefoneCliente,
    enderecoCliente        
  };

  let divVeiculo = document.querySelector('#areaVeiculo');

  if(!divVeiculo)
  {
      alert('É obrigatório o preenchimento do Veículo');
      return;
  }

  let veiculoClienteInput = divVeiculo.querySelector('#veiculoCliente').value;
    console.log(veiculoClienteInput);
    let placaVeiculoClienteInput = divVeiculo.querySelector('#placaVeiculoCliente').value;
    console.log(placaVeiculoClienteInput);
    let corVeiculoClienteInput = divVeiculo.querySelector('#corVeiculoCliente').value;
    console.log(veiculoClienteInput);
    
  let CadastrarClienteViewModel = {
    cliente  
  };

  let veiculo = {
    veiculoCliente : veiculoClienteInput,
    placaVeiculoCliente : placaVeiculoClienteInput,
    corVeiculoCliente : corVeiculoClienteInput
  }; 

  console.log(CadastrarClienteViewModel);

  // let response = await EnviarClienteApi(CadastrarClienteViewModel);
  await EnviarClienteApi(CadastrarClienteViewModel)
        .then(async response=>{
            console.log(response);
            let cadastrarVeiculoViewModel = {
              veiculos : veiculo,
              idcliente : response
            };
            await EnviarVeiculoApi(cadastrarVeiculoViewModel);
        });
}
  
//função para fazer uma request na api;
async function EnviarClienteApi(viewmodel){
    
  //opções/dados para fazer a request;
  const options = {
  //método, se é um post, get etc..
  method: 'POST', 
  headers:{'content-type': 'application/json'},       
  body: JSON.stringify(viewmodel) 
  };
  //TODO: mudar a url para o seu localhost.
  const req =  await fetch('https://localhost:44363/clientes/cadastrar', options )
  //caso a request dê certo, retornará a resposta;
  .then(response => { 
      return response.json();
    });
    return req; 
}
async function EnviarVeiculoApi(viewmodel){
    
  //opções/dados para fazer a request;
  const options = {
  //método, se é um post, get etc..
  method: 'POST', 
  headers:{'content-type': 'application/json'},       
  body: JSON.stringify(viewmodel) 
  };
  //TODO: mudar a url para o seu localhost.
  const req =  await fetch('https://localhost:44363/veiculos/cadastrar', options )
  //caso a request dê certo, retornará a resposta;
  .then(response => { 
    response.text()
    .then(data=> {
        console.log(data);
        return data;
        });
    }); 
    alert('Cliente e Veículo Cadastrados com Sucesso!');
      return;
}
