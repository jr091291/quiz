/**
 * Created by USUARIO on 01/09/2015.
 */
var models = require('../models/models.js');

exports.show = function(req, res){
    models.Quiz.findByPrimary(req.params.quizId).then(
        function(quiz){
            res.render('quizes/show',{title:quiz.pregunta , quiz: quiz});
        }
    )
};

exports.answer = function(req, res){
    models.Quiz.findByPrimary(req.params.quizId).then(
        function(quiz){
            if (req.query.respuesta === quiz.respuesta){
                res.render('quizes/answer',
                    {title:'Respuesta Correcta', respuesta:'correcta', quiz:quiz});
            }
            else{
                res.render('quizes/answer',
                    {title:'Respuesta Incorrecta', respuesta:'Incorrecta', quiz:quiz});
            }
        }
    )
};

exports.index = function(req ,res) {
    models.Quiz.findAll().then(
        function(quizes){
            res.render('quizes/index.ejs',
                {quizes: quizes, title: 'Quiz | Preguntas'})
        })
};
