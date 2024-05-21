if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
} 
// verificação para saber as funções estão funcionando corretamente e também para evitar futuros erros no projeto
// é ótimo para projetos grandes.

let totalDoCarrinho = "0,00"

function ready() {
    const removerBotaoDeProduto = document.getElementsByClassName("remove-product-button")
    for (let i = 0; i < removerBotaoDeProduto.length; i ++) {
        removerBotaoDeProduto[i].addEventListener('click', removerProduto)
    }

    const quantidadeDeInputs = document.getElementsByClassName("product-qtd-input")
    for (let i = 0; i < quantidadeDeInputs.length; i++) {
        quantidadeDeInputs[i].addEventListener("change", verificaAlteracaoDeValor)
    }

    const botaoCardAdicionar = document.getElementsByClassName("button-hover-background")
    for (let i = 0; i < botaoCardAdicionar.length; i++) {
        botaoCardAdicionar[i].addEventListener('click', adicionarProduto)
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    if(totalDoCarrinho === "0,00") {
        alert("Seu carinho está vazio.")
    } else {
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: R$${totalDoCarrinho}
            Volte SEMPREEEEEEEEEE!
            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = "";
    atualizacaoTotal();
}

function verificaAlteracaoDeValor(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    }

    atualizacaoTotal()
}

function adicionarProduto(event) {
    const button = event.target
    const informacoesDoProduto = button.parentElement.parentElement
    const imagemDoProduto = informacoesDoProduto.getElementsByClassName("product-image")[0].src
    const tituloDoProduto = informacoesDoProduto.getElementsByClassName("product-title")[0].innerText
    const precosDoProduto = informacoesDoProduto.getElementsByClassName("product-price")[0].innerText
    
    const nomeCardDoProduto = document.getElementsByClassName("cart-product-title")
    for (let i = 0; i < nomeCardDoProduto.length; i++) {
        if (nomeCardDoProduto[i].innerText === tituloDoProduto) {
            nomeCardDoProduto[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            atualizacaoTotal()
            return
        }
    }

    let novoCardProduto = document.createElement("tr")
    novoCardProduto.classList.add("cart-product")

    novoCardProduto.innerHTML = 
    `
        <td class="product-identification">
            <img src="${imagemDoProduto}" alt="${tituloDoProduto}" class="cart-product-image">
            <strong class="cart-product-title">${tituloDoProduto}</strong>
        </td>
        <td>
            <span class="cart-product-price">${precosDoProduto}</span>
        </td>
        <td>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
        </td>
    `

    const corpoDaTabela = document.querySelector(".cart-table tbody")
    corpoDaTabela.append(novoCardProduto)

    atualizacaoTotal()
    console.log(novoCardProduto)
    novoCardProduto.getElementsByClassName("product-qtd-input")[0].addEventListener("change", verificaAlteracaoDeValor)
    novoCardProduto.getElementsByClassName("remove-product-button")[0].addEventListener("click", removerProduto)

}

function removerProduto(event) {
    event.target.parentElement.parentElement.remove()
    atualizacaoTotal();
}


function atualizacaoTotal() {
    totalDoCarrinho = 0;
    const cardProdutos = document.getElementsByClassName("cart-product")
    for (let i = 0; i < cardProdutos.length; i++) {
        const precoDoProduto = cardProdutos[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
        const produtoQualidade = cardProdutos[i].getElementsByClassName("product-qtd-input")[0].value
        // console.log(precoDoProduto)
    
        totalDoCarrinho += precoDoProduto * produtoQualidade
    }
    
    totalDoCarrinho = totalDoCarrinho.toFixed(2) // para colocar 2 números decimais depois da vírgula
    totalDoCarrinho = totalDoCarrinho.replace(".", ",") // para mudar o ponto por uma vírgula
    document.querySelector(".cart-total-container span").innerText = "R$" + totalDoCarrinho
}
