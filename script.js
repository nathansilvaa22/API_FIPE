
async function carregarMarcas() {
    try {
        const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        const marcas = await response.json();
        const marcaSelect = document.getElementById('marca');
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.codigo;
            option.textContent = marca.nome;
            marcaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar marcas:', error);
    }
}

async function carregarModelos(marcaCodigo) {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`);
        const data = await response.json();
        const modeloSelect = document.getElementById('modelo');
        modeloSelect.innerHTML = '<option value="">Selecione um modelo</option>'; 
        data.modelos.forEach(modelo => {
            const option = document.createElement('option');
            option.value = modelo.codigo;
            option.textContent = modelo.nome;
            modeloSelect.appendChild(option);
        });
        modeloSelect.disabled = false; 
    } catch (error) {
        console.error('Erro ao carregar modelos:', error);
    }
}


async function carregarAnos(marcaCodigo, modeloCodigo) {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`);
        const anos = await response.json();
        const anoSelect = document.getElementById('ano');
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>'; 
        anos.forEach(ano => {
            const option = document.createElement('option');
            option.value = ano.codigo;
            option.textContent = ano.nome;
            anoSelect.appendChild(option);
        });
        anoSelect.disabled = false; 
    } catch (error) {
        console.error('Erro ao carregar anos:', error);
    }
}


async function consultarPreco(marcaCodigo, modeloCodigo, anoCodigo) {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`);
        const dados = await response.json();
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <p>Marca: ${dados.Marca}</p>
            <p>Modelo: ${dados.Modelo}</p>
            <p>Ano: ${dados.AnoModelo}</p>
            <p>Preço: ${dados.Valor}</p>
        `;
        resultadoDiv.style.display = 'block'; 
    } catch (error) {
        console.error('Erro ao consultar preço:', error);
    }
}


document.getElementById('marca').addEventListener('change', function () {
    const marcaCodigo = this.value;
    if (marcaCodigo) {
        carregarModelos(marcaCodigo);
    }
});

document.getElementById('modelo').addEventListener('change', function () {
    const marcaCodigo = document.getElementById('marca').value;
    const modeloCodigo = this.value;
    if (modeloCodigo) {
        carregarAnos(marcaCodigo, modeloCodigo);
    }
});

document.getElementById('vehicleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const marcaCodigo = document.getElementById('marca').value;
    const modeloCodigo = document.getElementById('modelo').value;
    const anoCodigo = document.getElementById('ano').value;

    if (marcaCodigo && modeloCodigo && anoCodigo) {
        consultarPreco(marcaCodigo, modeloCodigo, anoCodigo);
    } else {
        alert('Por favor, selecione a marca, o modelo e o ano.');
    }
});


document.addEventListener('DOMContentLoaded', carregarMarcas);
