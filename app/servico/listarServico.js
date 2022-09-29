async function PreencherTabelaServico(){
    
    let tabela = document.querySelector('#listagem-Servicos');    
    
    console.log(tabela);

    let servicos = await ListarServicos();  
    
    console.log(profissionais);

    servicos.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../..module/moduleServico/editarServico.html?nome=";
        });
        
        let IdServicoTd = document.createElement('td');        
        IdServicoTd.classList.add('row-IdServico-servico');        
        let DescricaoServicolTd = document.createElement('td');
        DescricaoServicoTd.classList.add('row-DescricaoServico-servico');
        let ValorServicoTd = document.createElement('td');
        ValorServicoTd.classList.add('row-ValorServico-servico');
        
        
        IdServicoTd.innerHTML = e.IdServico;
        DescricaoServicoTd.innerHTML = e.DescricaoServico;
        ValorServicoTd.innerHTML = e.ValorServico;
 
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

function Voltar(){
    window.location = "../../index.html";
}

PreencherTabelaServico();