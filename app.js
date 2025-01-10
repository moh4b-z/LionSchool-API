const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

const LionSchool = require('./module/functions.js')

app.use((request, response, next) =>{

    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET')

    app.use(cors()) 

    next()
})
app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    let dados = LionSchool.cursosLista()

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
    let statusAC = request.query.sac
    let nCurso = request.query.nc
    let statusA = request.query.sa
    let anoDC = request.query.adc

    let dados = LionSchool.filtro(statusAC, nCurso, statusA, anoDC)


    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})

app.get('/v1/lion-school/alunos', cors(), async function(request, response){

    let dados = LionSchool.alunosLista()

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response){

    let uf = request.params.matricula

    let dados = LionSchool.infoAluno(uf)
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }

})

app.get('/v1/lion-school/alunos/cursos/:curso', cors(), async function(request, response){

    let uf = request.params.curso

    let dados = LionSchool.alunosCurso(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})
const port = process.env.PORT || 4000
app.listen(port, function(){
    console.log('API aguardando requisição ...')
})
