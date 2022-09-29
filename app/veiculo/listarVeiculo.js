async function PreencherTabelaVeiculo(){
    
    let tabela = document.querySelector('#listagem-Veiculos');    
    
    console.log(tabela);

    let clientes = await ListarVeiculos();  
    
    console.log(veiculos);

    veiculos.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../..module/moduleVeiculo/ListarVeiculos.html?nome=";
        });
        
        let idClienteTd = document.createElement('td');        
        idClienteTd.classList.add('row-idCliente-cliente');        
        let idVeiculoTd = document.createElement('td');
        nomeClienteTd.classList.add('row-idVeiculo-cliente');
        let veiculoClienteTd = document.createElement('td');
        cpfClienteTd.classList.add('row-veiculoCliente-cliente');
        let placaVeiculoClienteTd = document.createElement('td');
        telefoneClienteTd.classList.add('row-placaVeiculoCliente-cliente');
        let corVeiculoClientTd = document.createElement('td');
        enderecoClienteTd.classList.add('row-corVeiculoCliente-cliente');
        
        idClienteTd.innerHTML = e.idCliente;
        idVeiculoTd.innerHTML = e.idVeiculo;
        veiculoClienteTd.innerHTML = e.veiculoCliente;
        placaVeiculoClienteTd.innerHTML = e.placaVeiculoCliente;
        corVeiculoClientTd.innerHTML = e.corVeiculoCliente;

        linha.appendChild(idClienteTd);
        linha.appendChild(idVeiculo);
        linha.appendChild(veiculoCliente);
        linha.appendChild(placaVeiculoCliente);
        linha.appendChild(corVeiculoCliente);

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

function Voltar(){
    window.location = "../../index.html";
}

PreencherTabelaVeiculo();