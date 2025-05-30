// routes/interfaceRoutes.js
const express = require('express');
const router = express.Router();
const interfaceController = require('../controllers/interfaceController');

// Rota principal: lista as edições
router.get('/', interfaceController.getHome);

// Rota para página de país (deve vir antes da rota dinâmica)
router.get('/paises/:pais', interfaceController.getPais);

// Rota para página da edição
router.get('/:id', interfaceController.getEdicao);

module.exports = router;
