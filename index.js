const express   = require('express')
const exphbs    = require("express-handlebars")
const session   = require('express-session')
const FileStore = require('session-file-store')(session)
const flash     = require('express-flash')
const app       = express()
const conn      = require('./bd/conn')

//chamando models
const Pensamento    = require('./models/Pensamento')
const Usuario       = require('./models/Usuario')

//chamando Rotas
const pensamentosRotas  = require('./routes/pensamentosRotas')
const autenticaRotas    = require('./routes/autenticaRotas')

//chamando Controllers
const PensamentoController = require('./controllers/PensamentoController')

// template engine
app.engine('handlebars',exphbs())
app.set('view engine','handlebars')
//recebo resposta do body
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

//session middleware
app.use(
    session({
        name:"pensamentos-teste123",
        secret:"pensamentos-teste321",
        resave: false,
        saveUninitialized: true
    }),
)
// flash messages
app.use(flash())
//public path
app.use(express.static('public'))

//set session to res
app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.sesion=req.session
    }
    next()
})

//Routes
app.use('/pensamentos', pensamentosRotas)
app.use('/',autenticaRotas)

app.get('/', PensamentoController.mostraPensamentos)
conn
//sync({force:true})
.sync()
.then(() => {
    app.listen(3000)
}).catch((err) => console.log(err))
