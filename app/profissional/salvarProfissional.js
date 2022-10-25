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
  async function SalvarProfissional(){
    let nomeProfissional = document.querySelector('#nomeProfissional').value;  
    console.log(nomeProfissional);
    let cargoProfissional = document.querySelector('#cargoProfissional').value;  
    console.log(cargoProfissional);
        
    let CadastrarProfissionalViewModel = {
        nomeProfissional,
        cargoProfissional
     };
  
    console.log(CadastrarProfissionalViewModel);
  
    let response = await EnviarApi(CadastrarProfissionalViewModel);
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
    const req =  await fetch('https://localhost:44363/profissionais/cadastrar', options )
    //caso a request dê certo, retornará a resposta;
    .then(response => { 
      response.text()
      .then(data=> {
          console.log(data);
          return data;
          });
          alert('Profissional Cadastrado com sucesso!');
          return;
      }) 
    //caso dê erro, irá retornar o erro e mostrar no console
      .catch(erro => {
          console.log(erro);
          return erro;
      });
  
      return req;
  }



