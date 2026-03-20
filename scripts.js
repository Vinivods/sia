document.getElementById('btnConsultar').addEventListener('click', function() {
const cnpj = document.getElementById('cnpj').value;

// fetch(`https://api.opencnpj.org/${cnpj}`)
//   .then(response => response.json()) // Converte a resposta para JSON
//   .then(data => console.log(data))   // Manipula os dados
//   .catch(error => console.error('Erro:', error)); // Trata erros

// 37543498000149

fetch(`https://api.opencnpj.org/${cnpj}`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            alert("Erro: " + data.erro);
        } else {
            // dados cadastro
            document.getElementById('razao_social').value = data.razao_social;
            document.getElementById('email').value = data.email;

            const tel = data.telefones[0];
            const numeroFormatado = tel.numero.length === 8 
                ? tel.numero.slice(0, 4) + '-' + tel.numero.slice(4)
                : tel.numero.slice(0, 5) + '-' + tel.numero.slice(5);
            
            const telefoneCompleto = `(${tel.ddd}) ${numeroFormatado}`;
            document.getElementById('telefone').value = telefoneCompleto;

            // endereço
            document.getElementById('cep').value = data.cep;
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('numero').value = data.numero;
            document.getElementById('complemento').value = data.complemento;
            document.getElementById('municipio').value = data.municipio;
            document.getElementById('uf').value = data.uf;
        }
    })
    .catch(error => console.error('Erro na requisição:', error));
    });

document.getElementById('cnpj').value = document.getElementById('cnpj').value.str.replace(/^\.|\.$/g, "");


function adicionarLinha() {
    const area = prompt("Digite o nome da área:");
    const codigo = prompt("Digite o código:");
    
    if (area && codigo) {
        const tabela = document.getElementById("tabelaAreas").getElementsByTagName('tbody')[0];
        const novaLinha = tabela.insertRow();
        
        novaLinha.innerHTML = `
            <td>${area}</td>
            <td>${codigo}</td>
            <td class="btn-group">
                <button class="btn-edit d-flex align-items-center gap-1" onclick="editarLinha(this)"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1025 1023">
                    <path fill="currentColor" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"/></svg>Editar</button>
                <button class="btn-delete d-flex align-items-center gap-1" onclick="excluirLinha(this)"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 26 26">
                    <path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593h-3zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1V8zm2 2v12h2V10H8zm4 0v12h2V10h-2zm4 0v12h2V10h-2z"/></svg>Excluir</button>
            </td>
        `;
    }
}

function excluirLinha(botao) {
    if (confirm("Tem certeza que deseja excluir esta linha?")) {
        const linha = botao.parentNode.parentNode;
        linha.parentNode.removeChild(linha);
    }
}

function editarLinha(botao) {
    const linha = botao.parentNode.parentNode;
    const areaAtual = linha.cells[0].innerText;
    const codigoAtual = linha.cells[1].innerText;

    const novaArea = prompt("Editar Área:", areaAtual);
    const novoCodigo = prompt("Editar Código:", codigoAtual);

    if (novaArea !== null && novoCodigo !== null) {
        linha.cells[0].innerText = novaArea;
        linha.cells[1].innerText = novoCodigo;
    }
}