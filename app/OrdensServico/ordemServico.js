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
  
//convertendo o texto e adicionando em tela;
function converterParaDomElement(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};
  
//pegando os dados do formulário
async function CapturarDadosOrdemServico(){
  let idProfissional = parseInt(document.querySelector('#idProfissional').value);  
  console.log(idProfissional);
  let idCliente = parseInt(document.querySelector('#idCliente').value);  
  console.log(idCliente);
  let idServico = parseInt(document.querySelector('#idServico').value);  
  console.log(idServico);
  let entradaItens = document.querySelectorAll('.itens');  
  console.log(entradaItens);
  let idItens = [];

    entradaItens.forEach(function(element) {
    idItens.push(parseInt(element.value));
    
  });
        
  let CadastrarOrdemServicoViewModel = {
      idProfissional,
      idCliente,
      idServico,
      idItens
  };

  console.log(CadastrarOrdemServicoViewModel);

  let response = await EnviarApi(CadastrarOrdemServicoViewModel);
  console.log(response);
}
function Adicionar()
{
    //pegando o form
    var form = document.querySelector('#form');

    var entrada = document.createElement('input');
    entrada.type = 'idItens';
    entrada.classList.add('itens');
    
    var botao = document.createElement('input');
    botao.type = 'button';
    botao.value = '+';   

    botao.onclick = Adicionar;
    form.appendChild(entrada);
    form.appendChild(botao);
    Somar();
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