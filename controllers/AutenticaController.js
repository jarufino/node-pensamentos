const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

module.exports = class AutenticaController {
    static login(req, res) {
        res.render('autentica/login')
    }
    static async loginEntrar(req, res) {
        const { email, senha } = req.body

        //verificando existência de usuário
        const usuario=await Usuario.findOne({where:{email:email}})
        if(!usuario){
            req.flash('message', 'Usuário não confere!!!')
            return res.render('autentica/login')
        }
        // checando senha 
        const verificaSenha= bcrypt.compareSync(senha, usuario.senha)
        if(!verificaSenha){
            req.flash('message', 'Senha inválida!!!')
            res.render('autentica/login')
            return
        }
        req.session.logged_in = true;
        req.session.userid = usuario.id;

        req.flash('message', `Seja bemvindo(a) ${usuario.nome}`);
        req.session.save(() => {
            res.redirect('/')
        }) 

    }

    static async registro(req, res) {
        console.log(req.session.logged_in);
        console.log(req.session.userid);

        res.render('autentica/registrar')
    }

    static async registroCadastro(req, res) {
        const { nome, email, senha, confsenha } = req.body

        //validando senha
        if (senha != confsenha) {
            req.flash('message', 'As senhas não conferem, tente novamente!!!')
            return res.render('autentica/registrar')
        }
        //o usuário existe?
        const checkSeUsuarioExiste = await Usuario.findOne({ where: { email: email } })
        if (checkSeUsuarioExiste) {
            req.flash('message', 'email já está em uso!!!')
            return res.render('autentica/registrar')

        }
        //criando senha
        const salt = bcrypt.genSaltSync(3)
        const hashedSenha = bcrypt.hashSync(senha, salt)
        const usuario = {
            nome,
            email,
            senha: hashedSenha
        }
        try {
            const usuarioCriado = await Usuario.create(usuario);

            //inicializando a sessão
            req.session.logged_in = true;
            req.session.userid = usuarioCriado.id;

            req.flash('message', 'Cadastro realizado!');
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}