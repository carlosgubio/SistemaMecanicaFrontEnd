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
      alert('Veículo não preenchido');
      return;
  }

  let veiculoClienteInput = divVeiculo.querySelector('#veiculoCliente').value;
    console.log(veiculoClienteInput);
    let placaVeiculoClienteInput = divVeiculo.querySelector('#placaVeiculoCliente').value;
    console.log(placaVeiculoClienteInput);
    let corVeiculoClienteInput = divVeiculo.querySelector('#corVeiculoCliente').value;
    console.log(veiculoClienteInput);

    let veiculo = {
      veiculoCliente : veiculoClienteInput,
      placaVeiculoCliente : placaVeiculoClienteInput,
      corVeiculoCliente : corVeiculoClienteInput
    };    

  let CadastrarClienteViewModel = {
    cliente,
    veiculo
  };

  console.log(CadastrarClienteViewModel);

  let response = await EnviarApi(CadastrarClienteViewModel);
  console.log(response);
}
  
//   let divVeiculo = document.querySelector('#areaVeiculo');

//   console.log(divVeiculo); 

//   if(!divVeiculo)
//   {
//     alert("Veículo não preenchido");
//     return;
//   }

//   let divVeiculos = document.querySelectorAll('#dadosVeiculo')
    
//   let veiculos = [];

//   divVeiculos.forEach(element => {
//     let veiculoClienteInput = element.querySelector('#veiculoCliente').value;
//     console.log(veiculoClienteInput);
//     let placaVeiculoClienteInput = element.querySelector('#placaVeiculoCliente').value;
//     console.log(placaVeiculoClienteInput);
//     let corVeiculoClienteInput = element.querySelector('#corVeiculoCliente').value;
//     console.log(veiculoClienteInput);

//     let veiculo = {
//       veiculoCliente : veiculoClienteInput,
//       placaVeiculoCliente : placaVeiculoClienteInput,
//       corVeiculoCliente : corVeiculoClienteInput
//     };    
//     veiculos.push(veiculo);
//   });

//   let response = await SalvarCliente(CadastrarClienteViewModel);
//   if(response > 0){
//     let IdCliente = response;

//     let cadastrarVeiculoViewModel = {
//       IdCliente,
//       veiculos
//     };

//      let res = await SalvarVeiculo(cadastrarVeiculoViewModel);
//   }
 
// }
// //função para fazer uma request na api;
// async function SalvarCliente(cadastrarClienteViewModel){
  
//   //opções/dados para fazer a request;
//   const options = {
//     //método, se é um post, get etc..
//     method: 'POST',  
//     headers:{'content-type': 'application/json'},  
//     //converte o objeto em um Json real;
//     body: JSON.stringify(cadastrarClienteViewModel) 
//   };

//   //TODO: mudar a url para o seu localhost.
//   const req =  await fetch('https://localhost:44363/clientes/cadastrar', options )
//   //caso a request dê certo, retornará a resposta;
//   .then(response =>  {    
//     let res = response.json();    
//     return res; 
//     }) 
//     .catch(erro=> {
//       alert(erro);
//       return erro;
//     })

//     return req;
// }
// async function SalvarVeiculo(viewModelVeiculo){
  
//   //opções/dados para fazer a request;
//   const options = {
//     //método, se é um post, get etc..
//     method: 'POST',  
//     headers:{'content-type': 'application/json'},  
//     //converte o objeto em um Json real;
//     body: JSON.stringify(viewModelVeiculo) 
//   };

//função para fazer uma request na api;
async function EnviarApi(viewmodel){
    
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
    response.text()
    .then(data=> {
        console.log(data);
        return data;
        });
    }); 
}
function Voltar(){
  window.location = "../../index.html";
}
