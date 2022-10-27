async function PreencherTabelaBuscaVeiculoOrdemServico(resposta, limpar){
    
    let tabela = document.querySelector('#listagem-ordensServico');    
    
    if(limpar)
        tabela.innerHTML = '';

    if(!resposta.sucesso)
        alert(resposta.mensagem);
    else if(resposta.resultado.length == 0){
        tabela.innerHTML = 'Não há registros para exibir.';
    }
    else {
        ordensServico.forEach(function(e) {
            let linha = document.createElement('tr');
            linha.addEventListener('click', ()=> {            
                window.location.href = "../../module/moduleOrdemServico/editarOrdemServico.html?id="+e.idOrdemServico;
            });
   
        
            let idOrdemServicoTd = document.createElement('input'); 
            idOrdemServicoTd.type='hidden';
            idOrdemServicoTd.classList.add('row-IdOrdemServico-OrdemServico'); 
            let nomeClienteTd = document.createElement('td');        
            nomeClienteTd.classList.add('row-nomeCliente-cliente');        
            let veiculoClienteTd = document.createElement('td');
            veiculoClienteTd.classList.add('row-veiculoCliente-veiculo');
            let placaVeiculoClienteTd = document.createElement('td');
            placaVeiculoClienteTd.classList.add('row-placaVeiculoCliente-veiculo');
            let corVeiculoClienteTd = document.createElement('td');
            corVeiculoClienteTd.classList.add('row-corVeiculoCliente-veiculo');
            let nomeProfissionalTd = document.createElement('td');
            nomeProfissionalTd.classList.add('row-nomeProfissional-profissional');
            let descricaoServicoTd = document.createElement('td');
            descricaoServicoTd.classList.add('row-descricaoServico-servico');
            let valorServicoTd = document.createElement('td');
            valorServicoTd.classList.add('row-valorServico-servico');
            let descricaoPecaTd = document.createElement('td');
            descricaoPecaTd.classList.add('row-descricaoPeca-produto');
            let valorPecaTd = document.createElement('td');
            valorPecaTd.classList.add('row-valorPeca-produto');
            let totalGeralTd = document.createElement('td');
            totalGeralTd.classList.add('row-totalGeral-total');
            
            idOrdemServicoTd.value = e.idOrdemServico;
            nomeClienteTd.innerHTML = e.nomeCliente;
            veiculoClienteTd.innerHTML = e.veiculoCliente;
            placaVeiculoClienteTd.innerHTML = e.placaVeiculoCliente;
            corVeiculoClienteTd.innerHTML = e.corVeiculoCliente;
            nomeProfissionalTd.innerHTML = e.nomeProfissional;
            descricaoServicoTd.innerHTML = e.descricaoServico;
            valorServicoTd.innerHTML = e.valorServico;
            descricaoPecaTd.innerHTML = e.descricaoPeca;
            valorPecaTd.innerHTML = e.valorPeca;
            totalGeralTd.innerHTML = e.totalGeral;

            linha.appendChild(idOrdemServicoTd);
            linha.appendChild(nomeClienteTd);
            linha.appendChild(veiculoClienteTd);
            linha.appendChild(nomeProfissionalTd);
            linha.appendChild(placaVeiculoClienteTd);
            linha.appendChild(corVeiculoClienteTd);
            linha.appendChild(descricaoServicoTd);
            linha.appendChild(valorServicoTd);
            linha.appendChild(descricaoPecaTd);
            linha.appendChild(valorPecaTd);
            linha.appendChild(totalGeralTd);

            tabela.appendChild(linha);
        });
    }
}
async function ListarOrdensServico(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/ordensServico/ListarPorCriterio', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

async function ListarPorCriterio(elemento){
    let texto = elemento.value;
    let resposta = await ListarVeiculosUsandoCriterio(texto);
     PreencherTabelaBuscaVeiculoOrdemServico(resposta, true);
}

async function ListarVeiculosUsandoCriterio(criterio){  
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/ordensServico/ConsultarPorVeiculo?criterio'+criterio, options )
        .then(response => {              
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
    
(async() => {
    let res=await ListarOrdensServico();
    PreencherTabelaBuscaVeiculoOrdemServico(res, false);
})();

