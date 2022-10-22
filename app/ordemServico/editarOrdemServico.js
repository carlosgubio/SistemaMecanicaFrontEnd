//TODO: trazer as listagens da tela de cadastro de ordem de serviço pra cá e quando for listar, carregar os dados incluídos na ordem. (PreencherOpcoesCliente)

async function CarregarTemplate(enderecoTela){    
    const template = await fetch(enderecoTela)
    .then(response=> { 
        return response.text();      
      }).catch(erro=> {
          console.log(erro);
      });    
    return template;
}

async function AdicionarCliente(){
  let clientes = document.querySelector('#dadosCliente');
  let selectAddCliente = document.createElement('select');  
  selectAddCliente.classList.add('listagemClientes');  
  selectAddCliente.name = 'clientes';
  clientes.appendChild(selectAddCliente);
  await PreencherOpcoesCliente(selectAddCliente);
}
async function PreencherOpcoesCliente(idCliente){
  let selectCliente = document.querySelector('#listagemClientes')
  selectCliente.style.fontSize = 40+"px";
  selectCliente.style.paddingLeft = 30+"px";
  let clientes = await ConsultaCliente()
  if(clientes){
    clientes.forEach(element => {
      let option = new Option(element.nomeCliente, element.idCliente); 
      if(element.idCliente == idCliente){
        option.selected = true;
      }     
      selectCliente.options[selectCliente.options.length] = option;
    });
  }
}async function ConsultaCliente(){      
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

async function AdicionarVeiculo(){
  let veiculos = document.querySelector('#dadosVeiculo');
  let selectAddVeiculo = document.createElement('select');  
  selectAddVeiculo.classList.add('listagemVeiculos');  
  selectAddVeiculo.name = 'veiculos';
  veiculos.appendChild(selectAddVeiculo);
  await PreencherOpcoesVeiculo(selectAddVeiculo);
}  
async function PreencherOpcoesVeiculo(idVeiculo){
  let selectVeiculo = document.querySelector('#listagemVeiculos')
  selectVeiculo.style.fontSize = 40+"px";
  selectVeiculo.style.paddingLeft = 30+"px";
  let veiculos = await ConsultaVeiculo()
  if(veiculos){
    veiculos.forEach(element => {
      let option = new Option(element.veiculoCliente, element.idVeiculo);
      if(element.idVeiculo == idVeiculo){
        option.selected = true;
      }   
      selectVeiculo.options[selectVeiculo.options.length] = option;
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

async function AdicionarProfissional(){  
  let selectAddProfissional = document.createElement('select'); 
  selectAddProfissional.classList.add('listagemProfissionais');  
  selectAddProfissional.name = 'profissionais';  
  await PreencherOpcoesProfissional(selectAddProfissional);
}

async function PreencherOpcoesProfissional(select, idProfissional){
  let profissionais = await ConsultaProfissional()
  let divProfissionais = document.querySelector('#dadosProfissional');
  let divProfissionalAdd = document.createElement('div'); 
  divProfissionais.style.fontSize = 40+"px";
  divProfissionais.style.paddingLeft = 450+"px"; 
  let botaoRemover = document.createElement('input');

  botaoRemover.addEventListener('click', (element)=> {
      let div = element.currentTarget.parentNode;
      div.remove();
  });

  botaoRemover.value = 'Remover';
  botaoRemover.value = 'Remover';
  botaoRemover.style.backgroundColor = 'red';
  botaoRemover.style.color = 'white'
  botaoRemover.style.paddingLeft = 25+"px";
  // botaoRemover.style='textAlign:center';
  botaoRemover.style.borderRadius = 5+'px';
  botaoRemover.style.margin = 10+"px";

  divProfissionalAdd.appendChild(select); 
  divProfissionalAdd.appendChild(botaoRemover); 
  botaoRemover.type = 'button';
  if(profissionais){
    profissionais.forEach(element => {
      let option = new Option(element.nomeProfissional, element.idProfissional);
      if(element.idProfissional == idProfissional){
        option.selected = true;
      }   
      select.options[select.options.length] = option;
    });
  }
  divProfissionais.appendChild(divProfissionalAdd);
}

async function AdicionarServico(){  
  let selectAddServico = document.createElement('select'); 
  selectAddServico.classList.add('listagemServicos');  
  selectAddServico.name = 'servicos';
  
  await PreencherOpcoesServico(selectAddServico);
}
async function PreencherOpcoesServico(select, idServico){
  let servicos = await ConsultaServico()    
  let divservicos = document.querySelector('#dadosServico');
  let divServicoAdd = document.createElement('div'); 
  divServicoAdd.style.fontSize = 40+"px";
  divServicoAdd.style.paddingLeft = 450+"px";  
  let botaoRemover = document.createElement('input');

  botaoRemover.addEventListener('click', (element)=> {
    let div = element.currentTarget.parentNode;
    div.remove();
  });

  botaoRemover.value = 'Remover';
  botaoRemover.style.backgroundColor = 'red';
  botaoRemover.style.color = 'white'
  botaoRemover.style.paddingLeft = 25+"px";
  // botaoRemover.style='textAlign:center';
  botaoRemover.style.borderRadius = 5+'px';
  botaoRemover.style.margin = 10+"px";

  divServicoAdd.appendChild(select); 
  divServicoAdd.appendChild(botaoRemover); 
  botaoRemover.type = 'button';
  if(servicos){
    servicos.forEach(element => {
      let option = new Option(element.descricaoServico, element.idServico);
      if(element.idServico == idServico){
        option.selected = true;
      }   
      select.options[select.options.length] = option;
    });
  }
  divservicos.appendChild(divServicoAdd);
}

async function AdicionarProduto(){
  let selectAddProduto = document.createElement('select');   
  selectAddProduto.classList.add('listagemProdutos');  
  selectAddProduto.name = 'produtos';
  
  await PreencherOpcoesProduto(selectAddProduto);
}
async function PreencherOpcoesProduto(select, idproduto){
  let produtos = await ConsultaProduto()
  let divprodutos = document.querySelector('#dadosProduto');
  let divProdutoAdd = document.createElement('div');  
  divProdutoAdd.style.fontSize = 40+"px";
  divProdutoAdd.style.paddingLeft = 450+"px";
  let botaoRemover = document.createElement('input');

  botaoRemover.value = 'Remover';
  botaoRemover.value = 'Remover';
  botaoRemover.style.backgroundColor = 'red';
  botaoRemover.style.color = 'white'
  botaoRemover.style.paddingLeft = 25+"px";
  // botaoRemover.style='textAlign:center';
  botaoRemover.style.borderRadius = 5+'px';
  botaoRemover.style.margin = 10+"px";

  divProdutoAdd.appendChild(select); 
  divProdutoAdd.appendChild(botaoRemover); 
  botaoRemover.type = 'button';

  botaoRemover.addEventListener('click', (element)=> {
    let div = element.currentTarget.parentNode;
    div.remove();
  });
  
  if(produtos){
    produtos.forEach(element => {
      let option = new Option(element.descricaoPeca, element.idProduto);
      if(element.idProduto == idproduto){
        option.selected = true;
      }   
      select.options[select.options.length] = option;
    });
  }
  divprodutos.appendChild(divProdutoAdd);
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

async function SalvarOrdemServico(){

  let idOrdemServico = parseInt(document.querySelector('#idOrdemServico').value);   
  let idCliente = parseInt(document.querySelector('#listagemClientes').value);  
  console.log(idCliente);
  let idVeiculo = parseInt(document.querySelector('#listagemVeiculos').value);  
  console.log(idVeiculo);

  let listaProfissionaisSelect = document.querySelectorAll('.listagemProfissionais');  
  let idProfissionais = [];
  listaProfissionaisSelect.forEach((element) => {
      idProfissionais.push(parseInt(element.value));
});
console.log(idProfissionais);

let listaServicosSelect = document.querySelectorAll('.listagemServicos');  
let idServicosExecutados = [];
listaServicosSelect.forEach((element) => {
  idServicosExecutados.push(parseInt(element.value));
});

console.log(idServicosExecutados);

let listaProdutosSelect = document.querySelectorAll('.listagemProdutos');  
let idItens =[];
listaProdutosSelect.forEach(element => {
  idItens.push(parseInt(element.value));
});
console.log(idItens);

let atualizar = {
  idOrdemServico,
  idCliente : parseInt(idCliente),
  idVeiculo : parseInt(idVeiculo),
  idProfissionais,
  idServicosExecutados,
  idItens
};
let CadastrarOrdemServicoViewModel ={
  atualizar
}
      
console.log(CadastrarOrdemServicoViewModel);

let response = await EnviarApi(CadastrarOrdemServicoViewModel);
console.log(response);
}

async function getOrdemServico(){
  const urlParams = new URLSearchParams(window.location.search);    
  let idOrdemServico = urlParams.get('id')
  let res = await ConsultaOrdemServico(urlParams.get('id'));
  PreencherFormulario(res);
  let idOrdemServicoInput = document.querySelector('#idOrdemServico');   
  idOrdemServicoInput.value = idOrdemServico;
}
async function ConsultaOrdemServico(id){      
  const options = {
      method: 'GET',  
      headers:{'content-type': 'application/json'}                     
  };    
  const req =  await fetch('https://localhost:44363/ordensServico/Confirmar?id=' +id, options )
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
  PreencherOpcoesCliente(json.idCliente)
  PreencherOpcoesVeiculo(json.idVeiculo)
  json.execucoes.forEach( element => {
    let select = document.createElement('select');
    select.classList.add('listagemProfissionais');  
    PreencherOpcoesProfissional(select, element.idProfissional);
  });
  json.servicosExecutados.forEach( element => {
    let select = document.createElement('select');
    select.classList.add('listagemServicos');  
    PreencherOpcoesServico(select, element.idServico);
  });
  json.itens.forEach( element => {
    let select = document.createElement('select');
    select.classList.add('listagemProdutos');  
    PreencherOpcoesProduto(select, element.idProduto);
  });
}

async function EnviarApi(viewmodel){

  //opções/dados para fazer a request;
  const options = {
    //método, se é um post, get etc..
    method: 'PUT',  
    headers:{'content-type': 'application/json'},  
    //converte o objeto em um Json real;
    body: JSON.stringify(viewmodel) 
  };

//TODO: mudar a url para o seu localhost.
const req =  await fetch('https://localhost:44363/ordensServico/atualizar', options )
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

(async() => {
 await getOrdemServico();
})();