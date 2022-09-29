//função para carregar o template via request;
async function CarregarTemplate(nome){    
  const template = await fetch('./module/'+nome+'.html')
  .then(response=> { 
      return response.text();      
    }).catch(erro=> {
        console.log(erro);
    });    
  return template;
}

async function AdicionarVeiculo(){  
  let veiculo =  document.querySelector('#dadosVeiculo');    
  let templateVeiculo = await CarregarTemplate('../..module/moduleVeiculo/veiculo.html');    
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
    alert("Veículo não preenchido");
    return;
  }

  let veiculoClienteInput = divVeiculo.querySelector('#veiculoCliente').value;
  console.log(veiculoClienteInput);
  let plavaVeiculoClienteInput = divVeiculo.querySelector('#plavaVeiculoCliente').value;
  console.log(veiculoClienteInput);
  let corVeiculoClienteInput = divVeiculo.querySelector('#corVeiculoCliente').value;
  console.log(veiculoClienteInput);

  let veiculo = {
    veiculoCliente : veiculoClienteInput,
    plavaVeiculoCliente : plavaVeiculoClienteInput,
    corVeiculoCliente : corVeiculoClienteInput
  };

  let CadastrarClienteViewModel = {
    cliente
  };
  console.log(CadastrarClienteViewModel);
  
  let CadastrarVeiculoViewModel = {
    veiculo
  };
  console.log(CadastrarVeiculoViewModel);

  let response = await EnviarApi(CadastrarClienteViewModel, CadastrarVeiculoViewModel);
  console.log(response);
}

//função para fazer uma request na api;
async function EnviarApi(viewmodel){
  
  //opções/dados para fazer a request;
  const options = {
    //método, se é um post, get etc..
    method: 'POST',  
    headers:{'content-type': 'application/json'},  
    //converte o objeto em um Json real;
    body: JSON.stringify(viewmodel) 
  };

  //TODO: mudar a url para o seu localhost.
  const req =  await fetch('https://localhost:44363/clientes/cadastrar', options )
  //caso a request dê certo, retornará a resposta;
  .then(response => { 
    response.text()
    .then(data=> {
        console.log(data);
        return data;
        });
    }) 
}