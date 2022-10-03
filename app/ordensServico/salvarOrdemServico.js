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
  let idCliente = parseInt(document.querySelector('#idCliente').value);  
  console.log(idCliente);
  let idVeiculo = parseInt(document.querySelector('#idVeiculo').value);  
  console.log(idVeiculo);
  let idProfissional = parseInt(document.querySelector('#idProfissional').value);  
  console.log(idProfissional);
  let idServico = parseInt(document.querySelector('#idServico').value);  
  console.log(idServico);
  let idPeca = document.querySelectorAll('#IdPeca');  
  console.log(idPeca);

  let ordemServico = {
    idCliente,
    idVeiculo,
    idProfissional,
    idServico,
    idPeca
  };
  let CadastrarOrdemServicoViewModel = {
    ordemServico
  };

  var divProfissionais = document.querySelectorAll('.areaProfissional');
  let profissionais = [];   
  divProfissionais.forEach(function(e){
      let nomeProfissional = e.querySelector('#nomeProfissional');
      let cargoProfisional = e.querySelector('#cargoProfissional');
      let objetoProfissional = {
        nomeProfissional : nomeProfissional.value,
        cargoProfisional : cargoProfisional.value 
      };
      profissionais.push(objetoProfissional);      
  }); 
  var divServicos = document.querySelectorAll('.areaServico');
  let servicos = [];   
  divServicos.forEach(function(e){
      let descricaoServico = e.querySelector('#descricaoServico');
      let valorServico = e.querySelector('#valorServico');
      let objetoServico = {
        descricaoServico : descricaoServico.value,
        valorServico : valorServico.value 
      };
      servicos.push(objetoServico);      
  });
  var divProdutos = document.querySelectorAll('.areaProduto');
  let produtos = [];   
  divProdutos.forEach(function(e){
      let descricaoPeca = e.querySelector('#descricaoPeca');
      let valorPeca = e.querySelector('#valorPeca');
      let objetoProduto = {
        descricaoPeca : descricaoPeca.value,
        valorPeca : valorPeca.value 
      };
      produtos.push(objetoProduto);      
  });  
        
  console.log(CadastrarOrdemServicoViewModel);

  let response = await EnviarApi(CadastrarOrdemServicoViewModel);
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