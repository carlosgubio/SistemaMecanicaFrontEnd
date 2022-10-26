async function PreencherTabelaOrdemServico(){
    
    let tabela = document.querySelector('#listagem-ordensServico');    
    
    console.log(tabela);

    let ordensServico = await ListarOrdensServico();  
    
    console.log(ordensServico);

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
        let nomeProfissionalTd = document.createElement('td');
        nomeProfissionalTd.classList.add('row-nomeProfissional-profissional');

        
        idOrdemServicoTd.value = e.idOrdemServico;
        nomeClienteTd.innerHTML = e.nomeCliente;
        veiculoClienteTd.innerHTML = e.veiculoCliente;
        nomeProfissionalTd.innerHTML = e.nomeProfissional;

        linha.appendChild(idOrdemServicoTd);
        linha.appendChild(nomeClienteTd);
        linha.appendChild(veiculoClienteTd);
        linha.appendChild(nomeProfissionalTd);

        tabela.appendChild(linha);
    });
}

async function ListarOrdensServico(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/ordensServico/buscarTodas', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

PreencherTabelaOrdemServico();


// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://localhost:44363/ordensServico/buscarTodas'+ veiculo + '/json');
// xhr.onreadystatechange = function() {
// 	if (xhr.readyState == 4) {
// 		if (xhr.status = 200)
//         console.log(xhr.responseText);
// 	}
// }
// xhr.send();
// function buscaPorVeiculo() {
//     let inputVeiculo = document.querySelector('input[name=veiculo]');
//     let veiculo = inputVeiculo.value;

// }