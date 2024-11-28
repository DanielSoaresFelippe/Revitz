function adicionarItem() {
    const nomeItem = document.getElementById('nome-item').value;
        if(nomeItem) {
        const item = document.createElement('li');
        item.innerHTML = `${nomeItem} - Quantidade: <span>1</span> 
        <button onclick="alterarQuantidade(this, 1)">+</button> 
        <button onclick="alterarQuantidade(this, -1)">-</button>
        <button onclick="editarItem(this)" class="editar">Editar</button>
        <button onclick="excluirItem(this)" class="excluir">Excluir</button>`;
        document.getElementById('lista-itens').appendChild(item);
        document.getElementById('nome-item').value = '';
    }
}


function alterarQuantidade(elemento, valor) {
    const quantidade = elemento.parentElement.querySelector('span');
    let novaQuantidade = parseInt(quantidade.innerText) + valor;

    if (novaQuantidade < 0) {
        adicionarConfirmacaoExclusao(elemento.parentElement);
    } else {
        quantidade.innerText = novaQuantidade;
    }
}


function adicionarConfirmacaoExclusao(item) {
    if (!item.querySelector('.confirmar-exclusao')) {
        const botaoDiv = document.createElement('div')
        const botaoConfirmacao = document.createElement('button');
        const textoConfirmacao = document.createElement('p');
        const botaoNegacao = document.createElement('button')
        textoConfirmacao.innerText = "Deseja realmente excluir?"
        botaoConfirmacao.innerText = "Sim";
        botaoNegacao.innerText = "Não";
        botaoConfirmacao.className = 'confirmar-exclusao';

        botaoConfirmacao.onclick = function() {
            item.remove();
        };
        botaoNegacao.onclick = function() {
            botaoDiv.appendChild(textoConfirmacao)
            botaoDiv.appendChild(botaoConfirmacao)
            botaoDiv.appendChild(botaoNegacao)
            botaoDiv.remove()
        }
        item.appendChild(botaoDiv)
        item.appendChild(textoConfirmacao);
        item.appendChild(botaoConfirmacao);
        item.appendChild(botaoNegacao);
    }
}
function excluirItem(elemento) {
    const item = elemento.parentElement;
        adicionarConfirmacaoExclusao(item)

}   

function editarItem(elemento) {
    const item = elemento.parentElement;
    const nomeAtual = item.childNodes[0].textContent.trim().split(" ")[0];
    const novoNome = prompt("Altere o nome do item:", nomeAtual);
    if (novoNome) {
        item.childNodes[0].textContent = `${novoNome} - Quantidade: `;
    }
}


function adicionarPonto() {
    const nomeLocal = document.getElementById('nome-local').value;
    const enderecoLocal = document.getElementById('endereco-local').value;
    if (nomeLocal && enderecoLocal) {
        const ponto = document.createElement('li');
        ponto.innerHTML = `<strong>${nomeLocal}</strong> - ${enderecoLocal}
        <button onclick="editarPonto(this)" class="editar">Editar</button>
        <button onclick="excluirItem(this)" class="excluir">Excluir</button>`;
        document.getElementById('lista-pontos').appendChild(ponto);
        document.getElementById('nome-local').value = '';
        document.getElementById('endereco-local').value = '';
    }
}

// Função para editar o ponto de coleta
function editarPonto(elemento) {
    const ponto = elemento.parentElement;
    const nomeAtual = ponto.querySelector('strong').textContent;
    const enderecoAtual = ponto.childNodes[1].textContent.trim().replace('-','');

    const novoNome = prompt("Altere o nome do local:", nomeAtual);
    const novoEndereco = prompt("Altere o endereço do local:", enderecoAtual);

    if (novoNome) ponto.querySelector('strong').textContent = novoNome;
    if (novoEndereco) ponto.childNodes[1].textContent = ` - ${novoEndereco}`;
}