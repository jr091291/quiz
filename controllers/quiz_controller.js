/**
 * Created by USUARIO on 01/09/2015.
 */
exports.question = function(req, res){
    res.render('quizes/question',{title:'Preguntas',pregunta:'¿Capital De Italia?'});
}

exports.answer = function(req, res){
    if (req.query.respuesta === 'roma'){
        res.render('quizes/answer', {title:'Respuesta Correcta', respuesta:'correcta'});
    }
    else{
        res.render('quizes/answer', {title:'Respuesta Incorrecta', respuesta:'Incorrecta'});
    }
}
