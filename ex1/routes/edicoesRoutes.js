// routes/edicoesRoutes.js
const express = require('express');
const router = express.Router();
const edicoesController = require('../controllers/edicoesController');

router.get('/edicoes', edicoesController.getEdicoes);
router.get('/edicoes/:id', edicoesController.getEdicaoById);
router.post('/edicoes', edicoesController.createEdicao);
router.delete('/edicoes/:id', edicoesController.deleteEdicao);
router.put('/edicoes/:id', edicoesController.updateEdicao);

router.get('/paises', edicoesController.getPaises);
router.get('/interpretes', edicoesController.getInterpretes);

module.exports = router;
