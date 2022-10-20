async function PreencherTabelaProfissional(){
    
    let tabela = document.querySelector('#listagem-profissionais');    
    
    console.log(tabela);

    let profissionais = await ListarProfissionais();  
    
    console.log(profissionais);

    profissionais.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../../module/moduleProfissional/editarProfissional.html?id="+e.idProfissional;
        });
        
        let idProfissionalTd = document.createElement('td');        
        idProfissionalTd.classList.add('row-idProfissional-profissional');        
        let nomeProfissionalTd = document.createElement('td');
        nomeProfissionalTd.classList.add('row-nomeProfissional-profissional');
        let cargoProfissionalTd = document.createElement('td');
        cargoProfissionalTd.classList.add('row-cargoProfissional-profissional');
        
        
        idProfissionalTd.innerHTML = e.idProfissional;
        nomeProfissionalTd.innerHTML = e.nomeProfissional;
        cargoProfissionalTd.innerHTML = e.cargoProfissional;
 
        linha.appendChild(idProfissionalTd);
        linha.appendChild(nomeProfissionalTd);
        linha.appendChild(cargoProfissionalTd);

        tabela.appendChild(linha);
    });
}

async function ListarProfissionais(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44363/profissionais/buscartodos', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

PreencherTabelaProfissional();

