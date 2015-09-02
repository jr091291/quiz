/**
 * Created by USUARIO on 01/09/2015.
 */
module.exports = function(sequelize, DataTypes){
    return sequelize.define('Quiz',{
        pregunta: DataTypes.STRING,
        respuesta: DataTypes.STRING
    });
}
