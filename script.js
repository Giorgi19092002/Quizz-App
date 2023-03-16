const questions = [
    {
        question: "which is the best football club in the world?",
        answers:[
            {text:'Real Madrid' , correct : false},
            {text:'Barcelona FC' , correct : false},
            {text:'Liverpool FC' , correct : true},
            {text:'Manchester United' , correct : false}
        ]
    },
    {
        question: "Who Is premier minister of georgia?",
        answers:[
            {text:'Giorgi Beroshvili' , correct : false},
            {text:'Gubaz Sanikidze' , correct : false},
            {text:'Irakli Gharibashvili' , correct : true},
            {text:'Sheshlili Joni' , correct : false}
        ]
    },
    {
        question: "What is best programing language in the world",
        answers:[
            {text:'JavaScript' , correct : true},
            {text:'Python' , correct : false},
            {text:'C#' , correct : false},
            {text:'C++' , correct : false}
        ]
    },
    {
        question: "What happened in 1121",
        answers:[
            {text:'Georgians GangBanged Turks' , correct : true},
            {text:'John Lenon Died' , correct : false},
            {text:'Gubaz Sanikidze was born' , correct : false},
            {text:'Nikola Tesla Invented Light' , correct : false}
        ]   
    }
]

const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer-buttons')
const nextBtn = document.getElementById('next-btn')

let qurrentQuestionIndex = 0
let score = 0

let startQuizz = () => {
    qurrentQuestionIndex = 0
    score = 0
    nextBtn.innerHTML = "Next"

    showQuestions()
}

let showQuestions = () => {
    resetstate()
    let qurrentquestion = questions[qurrentQuestionIndex]
    let questionno = qurrentQuestionIndex + 1
    questionEl.innerHTML = questionno + '.' + qurrentquestion.question

    qurrentquestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerEl .appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
    })
}


let resetstate = () => {
    nextBtn.style.display = 'none'
    while(answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild)
    }
}

let selectAnswer = (e) => {
    const selctedBtn = e.target
    const iscorrect = selctedBtn.dataset.correct === 'true'
    if(iscorrect){
        selctedBtn.classList.add('correct')
        score++
    }
    else{
        selctedBtn.classList.add('incorrect')
    }
    Array.from(answerEl.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextBtn.style.display = 'block'
}

let showScore = () => {
    resetstate()
    questionEl.innerHTML = `You Scored ${score} out of ${questions.length}!`
    nextBtn.innerHTML = 'play again'
    nextBtn.style.display = 'block'
}

let handelNextButton = () => {
    qurrentQuestionIndex++
    if(qurrentQuestionIndex < questions.length){
        showQuestions()
    }
    else{
        showScore()
    }
}

nextBtn.addEventListener('click',() => {
    if(qurrentQuestionIndex < questions.length){
        handelNextButton()
    }
    else{
        startQuizz()
    }
})

startQuizz()