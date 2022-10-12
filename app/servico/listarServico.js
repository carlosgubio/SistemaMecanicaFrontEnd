async function PreencherTabelaServico(){
    
    let tabela = document.querySelector('#listagem-servicos');    
    
    console.log(tabela);

    let servicos = await ListarServicos();  
    
    console.log(servicos);

    servicos.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../../module/moduleServico/editarServico.html?id="+e.idServico;
        });
        
        let IdServicoTd = document.createElement('td');        
        IdServicoTd.classList.add('row-idServico-servico');        
        let DescricaoServicoTd = document.createElement('td');
        DescricaoServicoTd.classList.add('row-descricaoServico-servico');
        let ValorServicoTd = document.createElement('td');
        ValorServicoTd.classList.add('row-valorServico-servico');
        
        
        IdServicoTd.innerHTML = e.idServico;
        DescricaoServicoTd.innerHTML = e.descricaoServico;
        ValorServicoTd.innerHTML = e.valorServico;
 
        linha.appendChild(IdServicoTd);
        linha.appendChild(DescricaoServicoTd);
        linha.appendChild(ValorServicoTd);

        tabela.appendChild(linha);
    });
}

async function ListarServicos(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/servicos/buscarTodos', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

PreencherTabelaServico();

function Voltar(){
    window.location = "../../index.html";
  }