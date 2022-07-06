const express=require('express')
const router=express.Router()
const AutenticaController = require('../controllers/AutenticaController')
//controller

router.get('/login', AutenticaController.login)
router.post('/login', AutenticaController.loginEntrar)
router.get('/registrar', AutenticaController.registro)
router.post('/registrar', AutenticaController.registroCadastro)
router.get('/logout', AutenticaController.logout)

module.exports=router