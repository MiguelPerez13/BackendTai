const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos.controller');
const { route } = require('express/lib/application');
const verifyToken = require("../middlewares/auth.middleware")

router.get('/',verifyToken, alumnosController.getAlumnos);
router.get('/:id', alumnosController.getAlumnoById);
router.post('/crear',verifyToken, alumnosController.createAlumno);
router.put('/edit/:id',verifyToken, alumnosController.updateAlumno);
router.delete('/eliminar/:id',verifyToken, alumnosController.deleteAlumno);
router.get('/informe/:id' ,alumnosController.informe);

module.exports = router;