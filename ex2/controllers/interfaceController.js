// controllers/interfaceController.js
const axios = require('axios');
const API_BASE = 'http://localhost:25000';

exports.getHome = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/edicoes`);
    const edicoes = response.data;
    res.render('index', { edicoes });
  } catch (err) {
    res.status(500).send("Erro ao carregar edições: " + err.message);
  }
};

exports.getPais = async (req, res) => {
  try {
    const pais = req.params.pais;
    // Obtém todas as edições a partir da API
    const response = await axios.get(`${API_BASE}/edicoes`);
    const edicoes = response.data;

    // Participações: edições em que o país aparece nas músicas (participação)
    let participacoes = [];
    edicoes.forEach(edicao => {
      if (Array.isArray(edicao.musicas)) {
        edicao.musicas.forEach(musica => {
          if (musica.pais && musica.pais.toLowerCase() === pais.toLowerCase()) {
            participacoes.push({
              id: edicao.id,
              anoEdição: edicao.anoEdição,
              musica: musica.titulo || 'N/A',
              interprete: musica.interprete || 'N/A',
              // Vence se o país for igual ao vencedor
              venceu: (edicao.vencedor && edicao.vencedor.toLowerCase() === pais.toLowerCase()) ? 'Sim' : 'Não'
            });
          }
        });
      }
    });

    // Edições organizadas: filtra as edições em que o país é o organizador
    const organizadas = edicoes.filter(edicao =>
      edicao.organizador && edicao.organizador.toLowerCase() === pais.toLowerCase()
    );

    res.render('pais', { pais, participacoes, organizadas });
  } catch (err) {
    res.status(500).send("Erro ao carregar dados do país: " + err.message);
  }
};

exports.getEdicao = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${API_BASE}/edicoes/${id}`);
    const edicao = response.data;
    res.render('edicao', { edicao });
  } catch (err) {
    res.status(500).send("Erro ao carregar a edição: " + err.message);
  }
};
