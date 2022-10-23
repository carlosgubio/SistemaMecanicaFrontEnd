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
        // let descricaoServicoTd = document.createElement('td');
        // descricaoServicoTd.classList.add('row-descricaoServico-servico');
        // let descricaoPecaTd = document.createElement('td');
        // descricaoPecaTd.classList.add('row-descricaoPeca-produto');
        // let totalGeralTd = document.createElement('td');
        // totalGeralTd.classList.add('row-totalGeral-total');
        
        idOrdemServicoTd.value = e.idOrdemServico;
        nomeClienteTd.innerHTML = e.nomeCliente;
        veiculoClienteTd.innerHTML = e.veiculoCliente;
        nomeProfissionalTd.innerHTML = e.nomeProfissional;
        // descricaoServicoTd.innerHTML = e.descricaoServico;
        // descricaoPecaTd.innerHTML = e.descricaoPeca;
        // totalGeralTd.innerHTML = e.totalGeral;

        linha.appendChild(idOrdemServicoTd);
        linha.appendChild(nomeClienteTd);
        linha.appendChild(veiculoClienteTd);
        linha.appendChild(nomeProfissionalTd);
        // linha.appendChild(descricaoServicoTd);
        // linha.appendChild(descricaoPecaTd);
        // linha.appendChild(totalGeralTd);

        tabela.appendChild(linha);
    });
}
async function ListarPorCriterio(elemento){
    let texto = elemento.value;
    let resposta = await ListarVeiculosUsandoCriterio(texto);
    
}
async function ListarVeiculosUsandoCriterio(criterio){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/ordensServico/ConsultarPorVeiculo?veiculo={veiculo}'+criterio, options )
        .then(response => {
            tabelaCorpoOS2.empty()
                response.json().then(oss =>{
                    oss.forEach(os => {            
                        const linha = document.createElement('tr')

            const ordemServico = document.createElement('td')
            const nomeCliente = document.createElement('td')
            const veiculoCliente = document.createElement('td')
            const PlacaVeiculoCliente = document.createElement('td')
            const corVeiculoCliente = document.createElement('td')
            const nomeProfissional = document.createElement('td')
            const descricaoServico = document.createElement('td')
            const valorServico = document.createElement('td')
            const Peca = document.createElement('td')
            const valorPeca = document.createElement('td')
            const totalGeral = document.createElement('td')
            

            ordemServico.innerHTML = os.ordemServico
            nomeCliente.innerHTML = os.nomeCliente
            veiculoCliente.innerHTML = os.veiculoCliente
            PlacaVeiculoCliente.innerHTML = os.PlacaVeiculoCliente
            corVeiculoCliente.innerHTML = os.corVeiculoCliente
            nomeProfissional.innerHTML = os.nomeProfissional
            descricaoServico.innerHTML = os.descricaoServico
            valorServico.innerHTML = os.valorServico
            Peca.innerHTML = os.Peca
            valorPeca.innerHTML = os.valorPeca
            totalGeral.innerHTML = os.totalGeral
            
                        linha.addEventListener('click', ()=> {            
                            window.location.href = "EditarOrdemServico.html?id=" + os.id;
                        });
                        // acoes.appendChild(criarBotao(handlerDeleteFuncionario, 'Deletar', funcionario))  
                        linha.appendChild(ordemServico)
            linha.appendChild(ordemServico)
            linha.appendChild(nomeCliente)
            linha.appendChild(veiculoCliente)
            linha.appendChild(veiculoCliente)
            linha.appendChild(PlacaVeiculoCliente)
            linha.appendChild(corVeiculoCliente)
            linha.appendChild(nomeProfissional)
            linha.appendChild(descricaoServico)
            linha.appendChild(valorServico)
            linha.appendChild(Peca)
            linha.appendChild(valorPeca)
            linha.appendChild(totalGeral)

            tabelaCorpoOS2.append(linha)                   
                    })
                })
            })
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
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
