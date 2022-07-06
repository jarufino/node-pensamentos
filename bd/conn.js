const {Sequelize}=require('sequelize')
const sequelize=new Sequelize('pensamentos', 'root','', {
    host:'localhost',
    dialect:'mysql'
})
try {
    sequelize.authenticate()
    console.log('Banco conectato, mestre')
} catch (error) {
    console.log(`Ih, deu isso aqui:${error}`)
}
module.exports=sequelize