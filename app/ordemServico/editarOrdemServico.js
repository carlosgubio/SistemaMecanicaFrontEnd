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
  async function AdicionarVeiculo(){
    let veiculos = document.querySelector('#dadosVeiculo');
    let selectAddVeiculo = document.createElement('select');  
    selectAddVeiculo.classList.add('listagemVeiculos');  
    selectAddVeiculo.name = 'veiculos';
    veiculos.appendChild(selectAddVeiculo);
    await PreencherOpcoesServico(selectAddVeiculo);
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

async function SalvarOrdemServico(){
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

async function getOrdemServico(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await ConsultaOrdemServico(urlParams.get('id'));
    PreencherFormulario(res);   
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
    let nomeCliente = dadosForm.querySelector('#nomeCliente');
    let veiculoCliente = dadosForm.querySelector('#veiculoCliente');
    let nomeProfissional = dadosForm.querySelector('#nomeProfissional');
    let descricaoServico = dadosForm.querySelector('#descricaoServico');
    let descricaoPeca = dadosForm.querySelector('#descricaoPeca');
    let totalGeral = dadosForm.querySelector('#totalGeral');

    console.log(json);
    nomeCliente.value = json.nomeCliente;
    veiculoCliente.value = json.veiculoCliente;
    nomeProfissional.value = json.nomeProfissional;
    descricaoServico.value = json.descricaoServico;
    descricaoPeca.value = json.descricaoPeca;
    totalGeral.value = json.totalGeral;


}

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

getOrdemServico();

function Voltar(){
window.location = "../../index.html";
}