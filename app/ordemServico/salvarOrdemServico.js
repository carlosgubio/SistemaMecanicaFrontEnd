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

async function AdicionarProfissional(){

  let profissionais = document.querySelector('#dadosProfissional');

  let templateProfissional = await CarregarTemplate('../../module/moduleOrdemServico/profissional.html');

  profissionais.appendChild(converterParaDomElement(templateProfissional));          
}
async function AdicionarServico(){

  let servicos = document.querySelector('#dadosServico');

  let templateServico = await CarregarTemplate('../../module/moduleOrdemServico/servico.html');

  servicos.appendChild(converterParaDomElement(templateServico));         
}
async function AdicionarProduto(){

  let produtos = document.querySelector('#dadosProduto');

  let templateProdutos = await CarregarTemplate('../../module/moduleOrdemServico/produto.html');

  produtos.appendChild(converterParaDomElement(templateProdutos));         
}

//convertendo o texto e adicionando em tela;
function converterParaDomElement(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};
  
//pegando os dados do formulário
async function SalvarOrdemServico(){
  let idCliente = parseInt(document.querySelector('#idCliente'));  
  console.log(idCliente);
  let idVeiculo = parseInt(document.querySelector('#idVeiculo'));  
  console.log(idVeiculo);
  let idProfissional = parseInt(document.querySelector('#idProfissional'));  
  console.log(idProfissional);
  let idServico = parseInt(document.querySelector('#idServico'));  
  console.log(idServico);
  let idProduto = document.querySelectorAll('#IdProduto');  
  console.log(idProduto);

  let ordemServico = {
    idCliente : parseInt(idCliente),
    idVeiculo : parseInt(idVeiculo),
    idProfissional : parseInt(idProfissional),
    idServico : parseInt(idServico),
    idProduto : parseInt(idProduto)
  };
  
  let CadastrarOrdemServicoViewModel = {
    ordemServico      
  };
        
  console.log(CadastrarOrdemServicoViewModel);

  let response = await EnviarApi(CadastrarOrdemServicoViewModel);
  console.log(response);
}

async function ConsultaCliente(){      
  const options = {
      method: 'GET',  
      headers:{'content-type': 'application/json'}                     
  };    
  const req =  await fetch('https://localhost:44363/clientes/buscartodos', options )
      .then(response => {      
          return response.json();
      })     
      .catch(erro => {
          console.log(erro);
          return erro;
      });
  return req;
  }
async function PreencherOpcoesCliente(){
  let selectCliente = document.querySelector('#listagemClientes')
  let clientes = await ConsultaCliente()
  if(clientes){
    clientes.forEach(element => {
      let option = new Option(element.nomeCliente, element.idCliente);
      selectCliente.options[selectCliente.options.length] = option;
    });
  }
}

async function ConsultaVeiculo(){      
  const options = {
      method: 'GET',  
      headers:{'content-type': 'application/json'}                     
  };    
  const req =  await fetch('https://localhost:44363/veiculos/buscartodos', options )
      .then(response => {      
          return response.json();
      })     
      .catch(erro => {
          console.log(erro);
          return erro;
      });
  return req;
}
async function PreencherOpcoesVeiculo(){
  let selectVeiculo = document.querySelector('#listagemVeiculos')
  let veiculos = await ConsultaVeiculo()
  if(veiculos){
    veiculos.forEach(element => {
      let option = new Option(element.veiculoCliente, element.idVeiculo);
      selectVeiculo.options[selectVeiculo.options.length] = option;
    });
  }
}

async function ConsultaProfissional(){      
  const options = {
      method: 'GET',  
      headers:{'content-type': 'application/json'}                     
  };    
  const req =  await fetch('https://localhost:44363/profissionais/buscartodos', options )
      .then(response => {      
          return response.json();
      })     
      .catch(erro => {
          console.log(erro);
          return erro;
      });
  return req;
}
async function PreencherOpcoesProfissional(){
  let selectProfissional = document.querySelector('#listagemProfissionais')
  let profissionais = await ConsultaProfissional()
  if(profissionais){
    profissionais.forEach(element => {
      let option = new Option(element.nomeProfissional, element.idProfissional);
      selectProfissional.options[selectProfissional.options.length] = option;
    });
  }
}

async function ConsultaServico(){      
  const options = {
      method: 'GET',  
      headers:{'content-type': 'application/json'}                     
  };    
  const req =  await fetch('https://localhost:44363/servicos/buscartodos', options )
      .then(response => {      
          return response.json();
      })     
      .catch(erro => {
          console.log(erro);
          return erro;
      });
  return req;
}
async function PreencherOpcoesServico(){
  let selectServico = document.querySelector('#listagemServicos')
  let servicos = await ConsultaServico()
  if(servicos){
    servicos.forEach(element => {
      let option = new Option(element.descricaoServico, element.idServico);
      selectServico.options[selectServico.options.length] = option;
    });
  }
}

async function ConsultaProduto(){      
  const options = {
      method: 'GET',  
      headers:{'content-type': 'application/json'}                     
  };    
  const req =  await fetch('https://localhost:44363/produtos/buscartodos', options )
      .then(response => {      
          return response.json();
      })     
      .catch(erro => {
          console.log(erro);
          return erro;
      });
  return req;
}
async function PreencherOpcoesProduto(){
  let selectProduto = document.querySelector('#listagemProdutos')
  let produtos = await ConsultaProduto()
  if(produtos){
    produtos.forEach(element => {
      let option = new Option(element.descricaoPeca, element.idServico);
      selectProduto.options[selectProduto.options.length] = option;
    });
  }
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
    const req =  await fetch('https://localhost:44363/ordensServico/Cadastrar', options )
    //caso a request dê certo, retornará a resposta;
    .then(response => { 
      response.text()
      .then(data=> {
          console.log(data);
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
  function Voltar(){
    window.location = "../../index.html";
}
PreencherOpcoesCliente();
PreencherOpcoesVeiculo();
PreencherOpcoesProfissional();
PreencherOpcoesServico();
PreencherOpcoesProduto();