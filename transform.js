const fs = require('fs');

// 1. Lê o ficheiro original
const rawData = fs.readFileSync('dataset.json', 'utf8');
const originalData = JSON.parse(rawData);

// 2. Cria um array para guardar as edições transformadas
const edicoesArray = [];

// 3. Itera sobre as chaves do objeto original (por exemplo, "ed1956", "ed1957", etc.)
for (let key in originalData) {
  if (originalData.hasOwnProperty(key)) {
    // Cada registo de edição
    let edicao = originalData[key];

    // Adiciona ou garante o campo "id" (pode já existir, mas vamos ter certeza)
    edicao.id = key;

    // Se existe o campo "organizacao", renomeia-o para "organizador" (para manter a consistência)
    if (edicao.organizacao) {
      edicao.organizador = edicao.organizacao;
      delete edicao.organizacao;
    }

    // Aqui podes verificar se existem outros campos que precisem ser padronizados.
    // Exemplo: se o campo "vencedor" não existir, define como null ou omite.

    // 4. Processa o array de músicas, garantindo que cada entrada é um objeto válido
    if (Array.isArray(edicao.musicas)) {
      // Remove entradas que não sejam objetos (por exemplo, números ou strings)
      edicao.musicas = edicao.musicas.filter(item => typeof item === 'object');

      // Para cada música, normaliza os nomes das propriedades (por exemplo, remover acentos ou padronizar)
      edicao.musicas = edicao.musicas.map(musica => {
        // Se existir "título", renomeia para "titulo" (sem acento) para padronizar
        if (musica.título) {
          musica.titulo = musica.título;
          delete musica.título;
        }
        // Se existir "país", renomeia para "pais"
        if (musica.país) {
          musica.pais = musica.país;
          delete musica.país;
        }
        // Se existir "intérprete", renomeia para "interprete"
        if (musica.intérprete) {
          musica.interprete = musica.intérprete;
          delete musica.intérprete;
        }

        // Retorna o objeto música já transformado
        return musica;
      });
    } else {
      // Caso o campo "musicas" não esteja definido ou não seja um array, inicializa-o como array vazio
      edicao.musicas = [];
    }

    // Adiciona o registo transformado ao array de edições
    edicoesArray.push(edicao);
  }
}

// 5. Cria uma nova estrutura com uma única chave "edicoes", onde todas as edições estarão dentro de um array.
const novoDataset = { edicoes: edicoesArray };

// 6. Escreve o novo dataset num ficheiro JSON (formatado com identação)
fs.writeFileSync('dataset_transformado.json', JSON.stringify(edicoesArray, null, 2), 'utf8');

console.log("Transformação concluída com sucesso!");
