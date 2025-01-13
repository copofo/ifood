
// Função para formatar os valores como moeda
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Chama a função do Google Apps Script para obter os dados da planilha
function loadData() {
  google.script.run.withSuccessHandler(function(data) {
    var tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    var tableHeader = document.getElementById('data-table').getElementsByTagName('thead')[0];
    
    // Cria o cabeçalho da tabela
    var headerRow = document.createElement('tr');
    data.headers.forEach(function(cell) {
      var th = document.createElement('th');
      th.textContent = cell;
      headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    // Preenche o corpo da tabela com os dados
    data.rows.forEach(function(row) {
      var tr = document.createElement('tr');
      row.forEach(function(cell, index) {
        var td = document.createElement('td');
        // Formata como moeda, se for um número, e não para o KM RODADO
        if (index !== 4 && !isNaN(cell) && cell !== "") {  // Aqui, "4" é o índice do KM RODADO
          td.textContent = formatCurrency(cell);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }).getDataFromSheet();
}

// Chama a função assim que a página for carregada
window.onload = loadData;



const formAdd = document.getElementById("formAdd")
const add = document.getElementById("add")

add.addEventListener('click', ()=>{
  formAdd.style.display = "block"
})











 

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("salvar").addEventListener("click", salvar);
  document.getElementById("cancelar").addEventListener("click", cancelar);
  });



function carregarFormulario() {
  google.script.run.withSuccessHandler(preencherFormulario).getInitialData();
}

function preencherFormulario(dados) {
const dataAtual = new Date(); // Obtém a data atual do sistema
const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
day: "2-digit",
month: "2-digit",
year: "numeric",
});

document.getElementById("kmInicial").value = dados.kmInicial;
document.getElementById("receita").value = dados.receita;
document.getElementById("data").value = dataFormatada;

// Salvar os valores originais para comparação
window.kmInicialOriginal = dados.kmInicial;
window.receitaOriginal = dados.receita;
}


window.salvar = function () {
const kmInicial = document.getElementById("kmInicial").value;
const receita = document.getElementById("receita").value;
const data = document.getElementById("data").value;
const kmFinal = document.getElementById("kmFinal").value;

const dados = {
kmInicial,
kmInicialAlterado: kmInicial !== window.kmInicialOriginal,
receita,
receitaAlterado: receita !== window.receitaOriginal,
data,
kmFinal,
};

google.script.run
.withSuccessHandler(() => {
alert("Dados salvos com sucesso!");
formAdd.style.display = "none"
})
.salvarFormulario(dados);

};

window.cancelar = function () {

formAdd.style.display = "none"
};


document.addEventListener("DOMContentLoaded", carregarFormulario);
