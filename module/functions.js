const arrAlunos = require('./simulando-banco-de-dados/alunos')
const listaAlunos = arrAlunos.alunos
const arrCursos = require('./simulando-banco-de-dados/cursos')
const listaCursos = arrCursos.cursos

// Recupera uma lista de todos os cursos oferecidos pela escola. 
function cursosLista(){
    let objetoRetorno = {"cursos": listaCursos}

    return Array.isArray(listaCursos)? objetoRetorno : false
}

// Recupera uma lista de todos os alunos matriculados na escola. 
function alunosLista(){
    let objetoRetorno = {"alunos": listaAlunos}

    return Array.isArray(listaAlunos)? objetoRetorno : false
}

// Recupera informações de um aluno específico com base no número de matrícula
function infoAluno(nubMatricula){
    let matricula = String(nubMatricula.toUpperCase())
    let objetoRetorno = false

    listaAlunos.forEach(function(aluno){
        if(String(aluno.matricula.toUpperCase()) == matricula){
            objetoRetorno = aluno
        }
    })

    return objetoRetorno
}

// Recupera uma lista de todos os alunos matriculados no curso especificado. DS ou REDES 
function alunosCurso(nomeCurso){
    let nCurso = String(nomeCurso.toUpperCase())
    let objetoRetorno = {curso : nCurso, alunos : []}

    if(listaCursos.some(curso => String(curso.sigla.toUpperCase()) === nCurso)){
        listaAlunos.forEach(function(aluno){
            aluno.curso.forEach(function(CursosDoAluno){
                if(String(CursosDoAluno.sigla.toUpperCase()) == nCurso){
                    objetoRetorno.alunos.push(aluno)
                }
            })
        })
    }else{
        objetoRetorno = false
    }

    return objetoRetorno
}

// Recupera uma lista de todos os alunos com o status especificado. Finalizado ou Cursando
function statusCurso(statusAlunosCursoS){
    let statusAC = String(statusAlunosCursoS.toUpperCase())
    let objetoRetorno = { status : statusAC, alunos : []}
    if(listaAlunos.some(aluno => String(aluno.status.toUpperCase()) === statusAC)){
        if(Array.isArray(listaAlunos)){
            listaAlunos.forEach(function(aluno){
                if(String(aluno.status.toUpperCase()) == statusAC){
                    objetoRetorno.alunos.push(aluno)
                }
            })
        }else{
            objetoRetorno = false
        }
    }else{
        objetoRetorno = false
    }


    return objetoRetorno
}

// Recupera uma lista de alunos matriculados em um curso especificado e com base em um status da disciplina Aprovado, Reprovado ou EXAME
function alunosStatusCurso(nomeCurso, statusAluno){
    let nCurso = String(nomeCurso.toUpperCase())
    let statusA = String(statusAluno.toUpperCase())
    let objetoRetorno = { curso : nCurso, status : statusA, alunos : []}
    if(listaCursos.some(curso => String(curso.sigla.toUpperCase()) === nCurso)){
        listaAlunos.forEach(function(aluno){
            let alunoRetorno = aluno
            let disciplinasStaus = []
            alunoRetorno.curso.forEach(function(CursosDoAluno){
                let cursoAluno = CursosDoAluno
                if(String(CursosDoAluno.sigla.toUpperCase()) == nCurso){
                    CursosDoAluno.disciplinas.forEach(function(disciplinaCurso){
                        if(String(disciplinaCurso.status.toUpperCase()) == statusA){
                            disciplinasStaus.push(disciplinaCurso)
                        }
                        cursoAluno.disciplinas = disciplinasStaus
                    })
                    alunoRetorno.curso = cursoAluno
                    objetoRetorno.alunos.push(alunoRetorno)
                }
            })
        })
    }else{
        objetoRetorno = false
    }    
    return objetoRetorno
}

// Recupera uma lista de alunos matriculados em um curso especificado e com base no ano de conclusão 
function alunosCursoDeAno(nomeCurso, anoDeConclusao) {
    let nCurso = nomeCurso.toUpperCase()
    let anoDC = anoDeConclusao
    let objetoRetorno = { curso: nCurso, anoDeConclusao: anoDC, alunos: [] }

    if (listaCursos.some(curso => curso.sigla === nCurso)) {
        listaAlunos.forEach(function(aluno) {
            aluno.curso.forEach(function(CursosDoAluno) {
                if (CursosDoAluno.sigla.toUpperCase() === nCurso && CursosDoAluno.conclusao == anoDC) {
                    objetoRetorno.alunos.push(aluno)
                }
            })
        })
    } else {
        return false
    }

    return objetoRetorno
}




function filtro(statusAlunosCursoS, nomeCurso, statusAluno, anoDeComnclusao) {
    let statusAC = statusAlunosCursoS
    let nCurso = nomeCurso
    let statusA = statusAluno
    let anoDC = anoDeComnclusao
    let objetoRetorno = false

    if (statusAC) {
        objetoRetorno = statusCurso(statusAC)
    } else if (nCurso && statusA && !anoDC) { 
        objetoRetorno = alunosStatusCurso(nCurso, statusA)
    } else if (nCurso && anoDC && !statusA) { 
        objetoRetorno = alunosCursoDeAno(nCurso, anoDC)
    }

    return objetoRetorno
}

// console.log(alunosCurso("DS"))
// console.log(alunosStatusCurso("Ds", "EXaME"))
// console.log(alunosCursoDeAno("ds", "2022"))
// console.log(filtro("", "ds","","2022"))
// console.log(filtro("", "ds","aprovado",""))

module.exports = {
    cursosLista,
    alunosLista,
    infoAluno,
    alunosCurso,
    statusCurso,
    alunosStatusCurso,
    alunosCursoDeAno,
    filtro
}
