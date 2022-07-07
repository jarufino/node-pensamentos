const Pensamento=require('../models/Pensamento')
const Usuario=require('../models/Usuario')

module.exports=class PensamentoController{

    static async mostraPensamentos(req,res){
        console.log(req.session.logged_in);
        console.log(req.session.userid);
        res.render('pensamentos/home', {
            user: {
                logged_in: req.session.logged_in,
                id: req.session.userid
            }
        });
    }
    static async dashboard(req,res){
        const usuarioId=req.session.userid
        const usuario=await Usuario.findOne({
            where:{
                id:usuarioId,
            },
            include:Pensamento,
            plain:true
        })
        //checando existência do usuário
        if(!usuario){
            res.redirect('/login')
        }
        res.render('pensamentos/dashboard')
    }
    static async criaPensamento(req,res){
        res.render('pensamentos/criar',  {
            user: {
                logged_in: req.session.logged_in,
                id: req.session.userid
            }
        })
    }
    static async incluirPensamento(req, res) {
        const pensamento={
            titulo:req.body.titulo,
            UsuarioId:req.session.userid,            
        }
        await Pensamento.create(pensamento)
        req.flash('message','Pensamento Criado com Sucesso!!')
        req.session.save(()=>{
            res.redirect('/pensamentos/dashboard')
        })
        
    }
}