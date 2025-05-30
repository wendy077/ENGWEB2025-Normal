1. Persistência de Dados e Setup da Base de Dados
1.1. Instalação e Configuração do MongoDB

    Utilizei o MongoDB instalado localmente, acessível via mongodb://localhost:27017.

    A base de dados foi nomeada eurovisao.

1.2. Transformação e Importação do Dataset

Transformação: Durante o processo de inserção dos dados, foi necessário padronizar diversos campos para garantir a consistência da API e facilitar as comparações na aplicação. As principais alterações realizadas foram:

    "país" → "pais" O campo originalmente nomeado "país" (com acento) foi transformado em "pais", tudo em minúsculas e sem acento, para padronizar as comparações nos controllers.

    "AnoEdição" → "anoEdição" O campo relacionado ao ano da edição foi padronizado para "anoEdição" (mantendo a formatação com a primeira letra minúscula e acentuação, conforme necessário) para uniformizar os nomes e evitar discrepâncias.

    "Organizador" e "Vencedor" Os campos que registram o organizador e o vencedor foram uniformizados na grafia – garantindo que sejam comparados de maneira consistente (por exemplo, convertidos para minúsculas durante as operações de comparação) – para que não houvesse conflitos devido à diferenciação de caixa ou formatação.

    "Músicas" → "musicas" Caso o dataset original utilizasse inicial maiúscula ou acentuação neste campo, o mesmo foi padronizado para "musicas", assegurando que a estrutura dos documentos corresponda ao esperado pela API e pelas funções de iteração que processam o array de músicas.

Para realizar essa padronização, foi desenvolvido e executado o arquivo transform.js.
Este script processou o dataset original, mapeando e convertendo os nomes dos campos conforme as regras descritas, além de aplicar qualquer outra transformação necessária para deixar os documentos compatíveis com a lógica da API.

Importação: Após a transformação, as alterações foram confirmadas e o dataset final (armazenado no arquivo dataset_transformado.json) foi importado para a collection edicoes utilizando o seguinte comando:

mongoimport --db eurovisao --collection edicoes --file dataset_transformado.json --jsonArray

2. Instruções para Execução das Aplicações

Para ambos os projetos, os comandos principais são:

    npm install – Para instalar as dependências.

    npm start – Para iniciar a aplicação.



Todas as decisões técnicas (como a organização em MVC e a padronização dos campos) foram tomadas com o objetivo de manter o código modular, facilitar a manutenção e assegurar que os requisitos do enunciado fossem atendidos.