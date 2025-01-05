document.addEventListener("DOMContentLoaded", function() {
    // Preencher o campo de data com a data atual
    var dataInput = document.getElementById("data");
    var dataAtual = new Date();
    var dataFormatada = dataAtual.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    dataInput.value = dataFormatada;

    // Alternar a visibilidade do campo descrição ao clicar no botão "Adicionar Descrição"
    document.getElementById("adicionarDescricaoBtn").addEventListener("click", function() {
        var descricaoInputGroup = document.getElementById("descricaoInputGroup");
        descricaoInputGroup.style.display = descricaoInputGroup.style.display === "none" ? "block" : "none";
    });
});
