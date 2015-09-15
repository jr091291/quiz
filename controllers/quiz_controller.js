/**
 * Created by USUARIO on 01/09/2015.
 */
var models = require('../models/models.js');

exports.load = function(req, res, next , quizId){
    models.Quiz.findByPrimary(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz =quiz;
                next();
            }
            else{
                next(new Error('No Existe QuizId: ' + quizId));
            }
        }
    )
};

exports.show = function(req, res){
    models.Quiz.findByPrimary(req.params.quizId).then(
        function(quiz){
            res.render('quizes/show',{title:quiz.pregunta , quiz: req.quiz, errors: [] });
        }
    )
};

exports.answer = function(req, res){
    models.Quiz.findByPrimary(req.params.quizId).then(
        function(quiz){
            if (req.query.respuesta === quiz.respuesta){
                res.render('quizes/answer',
                    {title:'Respuesta Correcta', respuesta:'correcta', quiz:quiz, errors:[] });
            }
            else{
                res.render('quizes/answer',
                    {title:'Respuesta Incorrecta', respuesta:'Incorrecta', quiz:quiz, errors:[] });
            }
        }
    )
};

exports.index = function(req ,res) {
    models.Quiz.findAll().then(
        function(quizes){
            res.render('quizes/index.ejs',
                {quizes: quizes, title: 'Quiz | Preguntas', errors:[]})
        })
};

exports.new = function(req, res) {
    var quiz = models.Quiz.build(
        {pregunta: "Pregunta", respuesta: "Respuesta"}
    );

    res.render('quizes/new', {title: 'Quiz | Nueva Pregunta', quiz: quiz, errors:[]});
};

exports.create = function(req, res){
    var quiz = models.Quiz.build(req.body.quiz);

    quiz.validate().then(
        function(err){
            if(err){
                res.render('quizes/new',{title:"Quiz | Error" , errors:[] });
            }
            else {
                quiz.save({fields: ["pregunta", "respuesta"]}).then(
                    function () {
                        res.redirect('/quizes');
                    });
            }
        }
    );
};

exports.create = function(req, res) {

    var quiz = models.Quiz.build( req.body.quiz );

    quiz
        .validate()
        .then(
        function(err){
            if (err) {
                res.render('quizes/new', {quiz: quiz, errors: err.errors});
            } else {
                quiz // save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta"]})
                    .then( function(){ res.redirect('/quizes')})
            }      // res.redirect: Redirección HTTP a lista de preguntas
        }
    )
};

exports.edit = function(req, res){
    var quiz = req.quiz;

    res.render('quizes/edit', {quiz: quiz, title: 'Quiz | Editar Pregunta', errors:[]});
}


exports.update = function(req, res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.respuesta     = req.body.quiz.respuesta;

    quiz
        .validate()
        .then(
        function(err){
            if (err) {
                res.render('quizes/new', {quiz: quiz, errors: err.errors});
            } else {
                quiz // save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta"]})
                    .then( function(){ res.redirect('/quizes')})
            }      // res.redirect: Redirección HTTP a lista de preguntas
        }
    )
    req.quiz.validate().then(
        function(err){
            if(err){
                res.render('quizes/edit', {quiz: req.quiz, errors: err.errors });
            }
            else{
                req.quiz.save({fields: ["pregunta", "respuesta"]}).then(
                    function () {
                        res.redirect('/quizes');
                    }
                );
            }
        }
    );
}

exports.destroy = function(req, res) {
    req.quiz.destroy().then( function() {
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
};
