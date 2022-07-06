 const {DataTypes}=require('sequelize')
 const bd=require('../bd/conn')
const Usuario = require('./Usuario')

 //Usuário
 const Pensamento=bd.define('Pensamento', {
    titulo:{
        type:DataTypes.STRING,
        allowNull:false,
        required:true
    }
 })
 Pensamento.belongsTo(Usuario)
 Usuario.hasMany(Pensamento)
 module.exports=Pensamento