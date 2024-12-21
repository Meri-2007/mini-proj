export interface IQuiz{
    id:number
    name:string
    questions: IQuestion[]
}

export interface IQuestion{
    id:number
    text:string
    answers: IAnswer[]
    selectedIndex:number
}

export interface IAnswer{
    id:number
    text:string
    is_correct:number
    question_id: number
}