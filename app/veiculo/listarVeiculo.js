async function PreencherTabelaVeiculo(){
    
    let tabela = document.querySelector('#listagem-veiculo');    
    
    console.log(tabela);

    let veiculos = await ListarVeiculos();  
    
    console.log(veiculos);

    veiculos.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../../module/moduleVeiculo/ListarVeiculos.html?nome=";
        });
        
        let idClienteTd = document.createElement('td');        
        idClienteTd.classList.add('row-idCliente-veiculo');        
        let idVeiculoTd = document.createElement('td');
        idVeiculoTd.classList.add('row-idVeiculo-veiculo');
        let veiculoClienteTd = document.createElement('td');
        veiculoClienteTd.classList.add('row-veiculoCliente-veiculo');
        let placaVeiculoClienteTd = document.createElement('td');
        placaVeiculoClienteTd.classList.add('row-placaVeiculoCliente-veiculo');
        let corVeiculoClientTd = document.createElement('td');
        corVeiculoClientTd.classList.add('row-corVeiculoCliente-veiculo');
        
        idClienteTd.innerHTML = e.idCliente;
        idVeiculoTd.innerHTML = e.idVeiculo;
        veiculoClienteTd.innerHTML = e.veiculoCliente;
        placaVeiculoClienteTd.innerHTML = e.placaVeiculoCliente;
        corVeiculoClientTd.innerHTML = e.corVeiculoCliente;

        linha.appendChild(idClienteTd);
        linha.appendChild(idVeiculoTd);
        linha.appendChild(veiculoClienteTd);
        linha.appendChild(placaVeiculoClienteTd);
        linha.appendChild(corVeiculoClientTd);

        tabela.appendChild(linha);
    });
}

async function ListarVeiculos(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/veiculos/buscarTodos', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

PreencherTabelaVeiculo();

