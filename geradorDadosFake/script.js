document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Coleta os valores dos campos do formulário
    const numLinhas = parseInt(document.getElementById("num_linhas").value);
    const cabecalhosInput = document.getElementById("cabecalhos").value;
    const cabecalhos = cabecalhosInput.split(",").map(cabecalho => cabecalho.trim());

    // Função para gerar dados fictícios
    function gerarDadosFicticios(numLinhas, cabecalhos) {
        const dados = [];

        // Funções para gerar os dados fictícios
        const gerarNome = () => {
            const nomes = ["João", "Maria", "Pedro", "Ana", "Carlos", "Julia", "Rafael", "Fernanda", "Lucas", "Paula"];
            return nomes[Math.floor(Math.random() * nomes.length)];
        };

        const gerarEmail = nome => {
            const dominio = "email.com";
            const base = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
            return `${base}${Math.floor(Math.random() * 1000)}@${dominio}`;
        };

        const gerarTelefone = () => {
            const ddd = Math.floor(Math.random() * (99 - 10 + 1)) + 10; // DDD fictício entre 10 e 99
            const numero = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000; // Número de 8 dígitos
            return `(${ddd}) ${numero.toString().slice(0, 4)}-${numero.toString().slice(4)}`;
        };

        // Gera as linhas de dados fictícios
        for (let i = 0; i < numLinhas; i++) {
            const linha = {};
            let nomeAtual = ""; // Armazena o nome gerado para uso no e-mail

            cabecalhos.forEach(cabecalho => {
                switch (cabecalho.toLowerCase()) {
                    case "nome":
                        nomeAtual = gerarNome();
                        linha[cabecalho] = nomeAtual;
                        break;
                    case "email":
                    case "e-mail": // Aceita ambas as formas
                        // Garante que o nome seja usado para gerar o e-mail
                        if (!nomeAtual) nomeAtual = gerarNome();
                        linha[cabecalho] = gerarEmail(nomeAtual);
                        break;
                    case "telefone":
                        linha[cabecalho] = gerarTelefone();
                        break;
                    default:
                        linha[cabecalho] = "Informação Indisponível";
                }
            });

            dados.push(linha);
        }

        return dados;
    }

    // Função para gerar o arquivo CSV
    function gerarCSV(cabecalhos, dados) {
        let csv = cabecalhos.join(",") + "\n"; // Cabeçalho
        dados.forEach(linha => {
            const valores = cabecalhos.map(cabecalho => linha[cabecalho] || ""); // Garante alinhamento dos valores
            csv += valores.join(",") + "\n";
        });

        return csv;
    }

    // Gera os dados fictícios com base nos cabeçalhos fornecidos
    const dados = gerarDadosFicticios(numLinhas, cabecalhos);

    // Gera o conteúdo do CSV
    const csv = gerarCSV(cabecalhos, dados);

    // Cria um Blob e gera o link para download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.getElementById("baixar");

    link.href = url;
    link.style.display = "block"; // Exibe o link de download

    // Limpa os campos do formulário
    document.getElementById("form").reset();
});
