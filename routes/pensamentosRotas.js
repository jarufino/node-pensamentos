const express=require('express')
const PensamentoController = require('../controllers/PensamentoController')
const router=express.Router()

//controller

router.get('/adicionar', PensamentoController.criaPensamento)
router.post('/adicionar', PensamentoController.incluirPensamento)
router.get('/dashboard', PensamentoController.dashboard)
router.get('/', PensamentoController.mostraPensamentos)

module.exports=router