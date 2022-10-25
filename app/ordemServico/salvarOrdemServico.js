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
  let selectAddProfissional = document.createElement('select'); 
  selectAddProfissional.classList.add('listagemProfissionais');  
  selectAddProfissional.name = 'profissionais';
  profissionais.appendChild(selectAddProfissional);
  await PreencherOpcoesProfissional(selectAddProfissional);
}
async function AdicionarServico(){

  let servicos = document.querySelector('#dadosServico');
  let selectAddServico = document.createElement('select');  
  selectAddServico.classList.add('listagemServicos');  
  selectAddServico.name = 'servicos';
  servicos.appendChild(selectAddServico);
  await PreencherOpcoesServico(selectAddServico);
}      

async function AdicionarProduto(){

  let produtos = document.querySelector('#dadosProduto');
  let selectAddProduto= document.createElement('select');  
  selectAddProduto.classList.add('listagemProdutos');  
  selectAddProduto.name = 'produtos';
  produtos.appendChild(selectAddProduto);
  await PreencherOpcoesProduto(selectAddProduto);        
}

//convertendo o texto e adicionando em tela;
function converterParaDomElement(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};
  
//pegando os dados do formulário
async function SalvarOrdemServico(){
  let idCliente = parseInt(document.querySelector('#listagemClientes').value);  
  console.log(idCliente);
  let idVeiculo = parseInt(document.querySelector('#listagemVeiculos').value);  
  console.log(idVeiculo);

  //para cada lista de opções, vamos pegar as opções selecionadas e colocar na viewmodel.
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

  let CadastrarOrdemServicoViewModel = {
    idCliente : parseInt(idCliente),
    idVeiculo : parseInt(idVeiculo),
    idProfissionais,
    idServicosExecutados,
    idItens
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
  selectCliente.style.fontSize = 40+"px";
  selectCliente.style.paddingLeft = 30+"px";
 
  // selectCliente.classList.add('form-select');
  selectCliente.classList.add('.form-select-lg');
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
  selectVeiculo.style.fontSize = 40+"px";
  selectVeiculo.style.paddingLeft = 30+"px";
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

async function PreencherOpcoesProfissional(select, idProfissional){
  let profissionais = await ConsultaProfissional()
  let divProfissionais = document.querySelector('#dadosProfissional');
  let divProfissionalAdd = document.createElement('div');  
  divProfissionais.style.fontSize = 35+"px";
  divProfissionais.style.paddingLeft = 450+"px";
  divProfissionais.style.marginTop = 20+"px";

  let botaoRemover = document.createElement('input');

  botaoRemover.addEventListener('click', (element)=> {
      let div = element.currentTarget.parentNode;
      div.remove();
  });

  botaoRemover.value = 'Remover';
  botaoRemover.style.backgroundColor = 'red';
  botaoRemover.style.color = 'white'
  botaoRemover.style.paddingLeft = 10+"px";
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
async function PreencherOpcoesServico(select, idServico){
  let servicos = await ConsultaServico()    
  let divservicos = document.querySelector('#dadosServico');
  let divServicoAdd = document.createElement('div');
  divServicoAdd.style.fontSize = 25+"px";
  divServicoAdd.style.paddingLeft = 450+"px"; 
  divServicoAdd.style.marginTop = 20+"px"; 

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
async function PreencherOpcoesProduto(select, idproduto){
  let produtos = await ConsultaProduto()
  let divprodutos = document.querySelector('#dadosProduto');
  let divProdutoAdd = document.createElement('div'); 
  divProdutoAdd.style.fontSize = 25+"px";
  divProdutoAdd.style.paddingLeft = 450+"px";
  divProdutoAdd.style.marginTop = 20+"px";  

  let botaoRemover = document.createElement('input');

  botaoRemover.value = 'Remover';
  botaoRemover.style.backgroundColor = 'red';
  botaoRemover.style.color = 'white'
  botaoRemover.style.paddingLeft = 25+"px";
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
          alert('Ordem se Serviço Cadastrada!');
          return;
      })
       
    //caso dê erro, irá retornar o erro e mostrar no console
      .catch(erro => {
          console.log(erro);
          return erro;
      });
      return req;
  }

(async() => {
  await PreencherOpcoesCliente();
  await PreencherOpcoesVeiculo();
})();

