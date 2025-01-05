// Função para gerar transações fake
function fakeTransactions() {
    const transacoes = [
        { tipo: "Receita", descricao: "Venda de Produto A", valor: 100.00, data: "05/01/2025" },
        { tipo: "Despesa", descricao: "Combustível", valor: 50.00, data: "06/01/2025" },
        { tipo: "Receita", descricao: "Freelance Web Development", valor: 300.00, data: "07/01/2025" },
        { tipo: "Despesa", descricao: "Compra de material", valor: 150.00, data: "08/01/2025" },
        { tipo: "Receita", descricao: "Venda de Produto B", valor: 200.00, data: "09/01/2025" },
        { tipo: "Despesa", descricao: "Manutenção de equipamentos", valor: 120.00, data: "10/01/2025" },
        { tipo: "Receita", descricao: "Consultoria", valor: 400.00, data: "11/01/2025" },
        { tipo: "Despesa", descricao: "Pagamento de internet", valor: 80.00, data: "12/01/2025" },
        { tipo: "Receita", descricao: "Venda de serviço", valor: 500.00, data: "13/01/2025" },
        { tipo: "Despesa", descricao: "Aluguel", valor: 1000.00, data: "14/01/2025" },
        { tipo: "Receita", descricao: "Venda de Produto C", valor: 150.00, data: "15/01/2025" },
        { tipo: "Despesa", descricao: "Compra de software", valor: 200.00, data: "16/01/2025" },
        { tipo: "Receita", descricao: "Pagamento de projeto", valor: 350.00, data: "17/01/2025" }
    ];

    // Selecionar o elemento da lista no DOM
    const listaTransacoes = document.getElementById("transacoes");

    // Limpar a lista antes de adicionar as transações
    listaTransacoes.innerHTML = '';

    // Adicionar cada transação na lista
    transacoes.forEach(transacao => {
        const li = document.createElement("li");
        li.classList.add("transacao", transacao.tipo.toLowerCase());

        li.innerHTML = `
            <p><strong>${transacao.tipo}:</strong> ${transacao.descricao}</p>
            <p>Valor: R$ ${transacao.valor.toFixed(2)}</p>
            <p>Data: ${transacao.data}</p>
        `;

        listaTransacoes.appendChild(li);
    });
}

// Chama a função para adicionar as transações quando a página carregar
document.addEventListener("DOMContentLoaded", fakeTransactions);
