function verificarSituacaoEstoque(quantidade) {
    let quantidadeProduto = Number(quantidade);

    if (quantidadeProduto < 100) {
        return "<span class='vermelho'>Comprar</span>";
    }
    else {
        return "Regular";
    }
}

function formatarMoeda(valor) {
    const numero = Number(valor.replace(",", "."));
    const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorFormatado = formatoMoeda.format(numero);

    return valorFormatado;
}

function adicionarLinha(produto) {
    const linhaProdutoNovo = document.createElement("tr");
    const nmProduto = document.createElement("td");
    const qtProduto = document.createElement("td");
    const vlProduto = document.createElement("td");
    const situacaoProduto = document.createElement("td");
    const cdNovo = document.createElement("td");

    cdNovo.textContent = produto.codigo;
    nmProduto.textContent = produto.nome;
    qtProduto.textContent = produto.qtd;
    vlProduto.textContent = produto.valor;
    situacaoProduto.innerHTML = produto.situacao;

    linhaProdutoNovo.appendChild(cdNovo);
    linhaProdutoNovo.appendChild(nmProduto);
    linhaProdutoNovo.appendChild(qtProduto);
    linhaProdutoNovo.appendChild(vlProduto);
    linhaProdutoNovo.appendChild(situacaoProduto);

    tbody.appendChild(linhaProdutoNovo);
}

function resetaFormulario()
{
    document.querySelector("#txtNome").value = "";
    document.querySelector("#txtQtd").value = "";
    document.querySelector("#txtValor").value = "";
}


const linhasProdutos = document.querySelectorAll('.linha-produto');
const btnNovo = document.querySelector('.btnNovo');
const btnCancelar = document.querySelector(".btnCancelar");
const btnSalvar = document.querySelector(".btnSalvar");

let tbody;

// Irá verificar a situação do produto e adicionará a situação no html
for (let i = 0; i < linhasProdutos.length; i++) {

    const localQuantidade = linhasProdutos[i].children[2];
    const localSituacao = linhasProdutos[i].children[4];
    const localVl = linhasProdutos[i].children[3];

    localSituacao.innerHTML = verificarSituacaoEstoque(localQuantidade.textContent);
    localVl.textContent = formatarMoeda(localVl.textContent);
}

/* Ao clicar no botão novo, mostrará na tela um formulário para que o usuário responda,
   junto com o maior código disponível */

btnNovo.addEventListener('click', function (e) {
    document.querySelectorAll(".escondido").forEach(e => {
        e.style.display = "block";
    });

    tbody = document.querySelector("tbody");
    document.querySelector("#txtCodigo").value = Number(tbody.children[tbody.children.length - 1].children[0].textContent) + 1;
});

// Ao clicar no botão cancelar, esconderá o formulário
btnCancelar.addEventListener("click", function (e) {
    document.querySelectorAll(".escondido").forEach(e => {
        e.style.display = "none";
    });

    // Reseta os valores do formulario
    resetaFormulario();
});

// Ao clicar no botão salvar, adicionará os dados digitados pelo usuário na tabela
btnSalvar.addEventListener("click", function (e) {
    const produto = {
        'codigo': document.querySelector("#txtCodigo").value,
        'nome': document.querySelector("#txtNome").value,
        'qtd': document.querySelector("#txtQtd").value,
        'valor': formatarMoeda(document.querySelector("#txtValor").value),
        'situacao': verificarSituacaoEstoque(document.querySelector("#txtQtd").value)
    };

    adicionarLinha(produto);

    // Esconde o formulário
    document.querySelectorAll(".escondido").forEach(e => {
        e.style.display = "none";
    });

    // Reseta os valores da tabela
    resetaFormulario();
});