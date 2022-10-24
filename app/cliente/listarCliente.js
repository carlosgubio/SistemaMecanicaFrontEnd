async function PreencherTabelaCliente(){
    
    let tabela = document.querySelector('#listagem-clientes');    
    
    console.log(tabela);

    let clientes = await ListarClientes();  
    
    console.log(clientes);

    clientes.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../../module/moduleCliente/editarCliente.html?id="+e.idCliente;
        });
        let idClienteTd = document.createElement('input'); 
        idClienteTd.type="hidden";       
        idClienteTd.classList.add('row-idCliente-cliente');        
        let nomeClienteTd = document.createElement('td');
        nomeClienteTd.classList.add('row-nomeCliente-cliente');
        let cpfClienteTd = document.createElement('td');
        cpfClienteTd.classList.add('row-cpfCliente-cliente');
        let telefoneClienteTd = document.createElement('td');
        telefoneClienteTd.classList.add('row-telefoneCliente-cliente');
        let enderecoClienteTd = document.createElement('td');
        enderecoClienteTd.classList.add('row-enderecoCliente-cliente');
    
        idClienteTd.value = e.idCliente;
        nomeClienteTd.innerHTML = e.nomeCliente;
        cpfClienteTd.innerHTML = e.cpfCliente;
        telefoneClienteTd.innerHTML = e.telefoneCliente;
        enderecoClienteTd.innerHTML = e.enderecoCliente;

        linha.appendChild(idClienteTd);
        linha.appendChild(nomeClienteTd);
        linha.appendChild(cpfClienteTd);
        linha.appendChild(telefoneClienteTd);
        linha.appendChild(enderecoClienteTd);

        tabela.appendChild(linha);
    });
}

async function ListarClientes(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/clientes/buscarTodos', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

PreencherTabelaCliente();

