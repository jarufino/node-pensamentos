const {DataTypes}=require('sequelize')
const bd=require('../bd/conn')
const Usuario=bd.define('Usuario', {
    nome:{
        type:DataTypes.STRING,
        require:true,        
    },
    email:{
        type:DataTypes.STRING,
        require:true,        
    },
    senha:{
        type:DataTypes.STRING,
        require:true,        
    }
})
module.exports=Usuario