async function PreencherTabelaProduto(){
    
    let tabela = document.querySelector('#listagem-produtos');    
    
    console.log(tabela);

    let produtos = await ListarProdutos();  
    
    console.log(produtos);

    produtos.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../../module/moduleProduto/editarProduto.html?id="+e.idProduto;
        });
        
        let idProdutoTd = document.createElement('td');        
        idProdutoTd.classList.add('row-idProduto-produto');        
        let descricaoPecaTd = document.createElement('td');
        descricaoPecaTd.classList.add('row-descricaoPeca-produto');
        let valorPecaTd = document.createElement('td');
        valorPecaTd.classList.add('row-valorPeca-produto');
        
        
        idProdutoTd.innerHTML = e.idProduto;
        descricaoPecaTd.innerHTML = e.descricaoPeca;
        valorPecaTd.innerHTML = e.valorPeca;
 
        linha.appendChild(idProdutoTd);
        linha.appendChild(descricaoPecaTd);
        linha.appendChild(valorPecaTd);

        tabela.appendChild(linha);
    });
}

async function ListarProdutos(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/produtos/buscarTodos', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

PreencherTabelaProduto();

