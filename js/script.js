function verificarSituacaoEstoque(quantidade) {
    let quantidadeProduto = Number(quantidade);

    if (quantidadeProduto < 100) {
        return "<span class='vermelho'>Comprar</span>";
    }
    else {
        return "Regular";
    }
}

function formatarMoeda(valor) 
{
    const numero = Number(valor.replace(",", "."));
    const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorFormatado = formatoMoeda.format(numero);

    return valorFormatado;
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
    e.preventDefault();

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
    document.querySelector("#txtNome").value = "";
    document.querySelector("#txtQtd").value = "";
    document.querySelector("#txtValor").value = "";
});

// Ao clicar no botão salvar, adicionará os dados digitados pelo usuário na tabela
btnSalvar.addEventListener("click", function (e) {
    const linhaProdutoNovo = document.createElement("tr"); 
    const nmProduto = document.createElement("td");
    const qtProduto = document.createElement("td");
    const vlProduto = document.createElement("td");
    const situacaoProduto = document.createElement("td");
    const cdNovo = document.createElement("td");

    cdNovo.textContent = document.querySelector("#txtCodigo").value;
    nmProduto.textContent = document.querySelector("#txtNome").value;
    qtProduto.textContent = document.querySelector("#txtQtd").value;
    vlProduto.textContent = formatarMoeda(document.querySelector("#txtValor").value)
    situacaoProduto.innerHTML = verificarSituacaoEstoque(qtProduto.textContent);

    linhaProdutoNovo.appendChild(cdNovo);
    linhaProdutoNovo.appendChild(nmProduto);
    linhaProdutoNovo.appendChild(qtProduto);
    linhaProdutoNovo.appendChild(vlProduto); 
    linhaProdutoNovo.appendChild(situacaoProduto);

    tbody.appendChild(linhaProdutoNovo);


    // Esconde o formulário
    document.querySelectorAll(".escondido").forEach(e => {
        e.style.display = "none";
    });

    // Reseta os valores da tabela
    document.querySelector("#txtNome").value = "";
    document.querySelector("#txtQtd").value = "";
    document.querySelector("#txtValor").value = "";
});