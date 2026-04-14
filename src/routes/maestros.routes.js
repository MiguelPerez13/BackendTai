const express = require('express');
const router = express.Router();
const maestrosController = require('../controllers/maestros.controller');
const { route } = require('express/lib/application');
const verifyToken = require("../middlewares/auth.middleware")


router.get('/', verifyToken, maestrosController.getMaestros);
router.get('/:id', verifyToken, maestrosController.getMaestroById);
router.post('/crear', verifyToken, maestrosController.createMaestro);
router.put('/edit/:id', verifyToken, maestrosController.updateMaestro);
router.delete('/eliminar/:id', verifyToken, maestrosController.deleteMaestro);

module.exports = router;