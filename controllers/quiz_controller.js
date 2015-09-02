/**
 * Created by USUARIO on 01/09/2015.
 */
var models = require('../models/models.js');

exports.question = function(req, res){
    models.Quiz.findAll().then(
        function(quiz){
            res.render('quizes/question',{title:'Preguntas',pregunta: quiz[0].pregunta});
        }
    )
};

exports.answer = function(req, res){
    models.Quiz.findAll().then(
        function(quiz){
            if (req.query.respuesta === quiz[0].respuesta){
                res.render('quizes/answer', {title:'Respuesta Correcta', respuesta:'correcta'});
            }
            else{
                res.render('quizes/answer', {title:'Respuesta Incorrecta', respuesta:'Incorrecta'});
            }
        }
    )
};


