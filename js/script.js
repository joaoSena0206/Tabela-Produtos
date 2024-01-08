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


// Adiciona o event listener ao botão delete do produto criado.
function addDelete(btn)
{
    btn.addEventListener("click", function(e) {
        const linhaProduto = e.target.parentElement.parentElement;
        linhaProduto.remove();
    });
}

function adicionarLinha(produto) {
    const linhaProdutoNovo = document.createElement("tr");
    const nmProduto = document.createElement("td");
    const qtProduto = document.createElement("td");
    const vlProduto = document.createElement("td");
    const situacaoProduto = document.createElement("td");
    const cdNovo = document.createElement("td");
    const buttonDelete = document.createElement("td");
    buttonDelete.classList.add("delete");
    addDelete(buttonDelete);
    

    cdNovo.textContent = produto.codigo;
    nmProduto.textContent = produto.nome;
    qtProduto.textContent = produto.qtd;
    vlProduto.textContent = produto.valor;
    situacaoProduto.innerHTML = produto.situacao;
    buttonDelete.innerHTML = produto.delete;

    linhaProdutoNovo.appendChild(cdNovo);
    linhaProdutoNovo.appendChild(nmProduto);
    linhaProdutoNovo.appendChild(qtProduto);
    linhaProdutoNovo.appendChild(vlProduto);
    linhaProdutoNovo.appendChild(situacaoProduto);
    linhaProdutoNovo.appendChild(buttonDelete);

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
const btnsDelete = document.querySelectorAll(".delete");
const barraPesquisa = document.querySelector(".pesquisa");

let tbody;

// Irá verificar a situação do produto e adicionará a situação no html
for (let i = 0; i < linhasProdutos.length; i++) {

    const localQuantidade = linhasProdutos[i].children[2];
    const localSituacao = linhasProdutos[i].children[4];
    const localVl = linhasProdutos[i].children[3];

    localSituacao.innerHTML = verificarSituacaoEstoque(localQuantidade.textContent);
    localVl.textContent = formatarMoeda(localVl.textContent);
}

// Adiciona a função de deletar para cada btnDelete já criado na tabela
btnsDelete.forEach(btnDelete => {
    btnDelete.addEventListener("click", function(e) {
        const linhaProduto = e.target.parentElement.parentElement;
        linhaProduto.remove();
    });
});

// Quando o usuário digitar na barra de pesquisa, mudará a tabela
barraPesquisa.addEventListener("input", function (e) {
    let txtPesquisa = e.target.value.toLowerCase();

    const produtos = document.querySelectorAll('.linha-produto');
    produtos.forEach(produto => {
        if (produto.children[1].textContent.toLowerCase().includes(txtPesquisa))
        {
            produto.classList.remove("escondido");
        }   
        else
        {
            produto.classList.add("escondido");
        }
    });
});


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
        'situacao': verificarSituacaoEstoque(document.querySelector("#txtQtd").value),
        'delete': document.querySelector(".delete").innerHTML
    };

    adicionarLinha(produto);

    // Esconde o formulário
    document.querySelectorAll(".escondido").forEach(e => {
        e.style.display = "none";
    });

    // Reseta os valores da tabela
    resetaFormulario();
});

// Ao clicar no botão de delete, deleta o produto da tabela
