// controllers/edicoesController.js
const edicaoModel = require('../models/edicaoModel');

const getEdicoes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.org) {
      filter.organizador = req.query.org;
    }
    const edicoes = await edicaoModel.getEdicoes(filter);
    res.json(edicoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEdicaoById = async (req, res) => {
  try {
    const edicao = await edicaoModel.getEdicaoById(req.params.id);
    if (edicao) {
      res.json(edicao);
    } else {
      res.status(404).json({ error: "Edição não encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEdicao = async (req, res) => {
  try {
    const novaEdicao = req.body;
    const result = await edicaoModel.insertEdicao(novaEdicao);
    res.json({ message: "Edição inserida com sucesso", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEdicao = async (req, res) => {
  try {
    const result = await edicaoModel.deleteEdicao(req.params.id);
    if (result.deletedCount === 1) {
      res.json({ message: "Edição eliminada" });
    } else {
      res.status(404).json({ error: "Edição não encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEdicao = async (req, res) => {
  try {
    const result = await edicaoModel.updateEdicao(req.params.id, req.body);
    if (result.matchedCount === 1) {
      res.json({ message: "Edição atualizada" });
    } else {
      res.status(404).json({ error: "Edição não encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPaises = async (req, res) => {
  try {
    const papel = req.query.papel;
    const paises = await edicaoModel.getPaisesByPapel(papel);
    res.json(paises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInterpretes = async (req, res) => {
  try {
    const interpretes = await edicaoModel.getInterpretes();
    res.json(interpretes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEdicoes,
  getEdicaoById,
  createEdicao,
  deleteEdicao,
  updateEdicao,
  getPaises,
  getInterpretes
};
