import { readFile } from "fs/promises";
import { IQuiz } from "./types";
import path from 'path'

const pathname = path.resolve(process.cwd(), "db.json")

export const getAllQuizes = async (): Promise<IQuiz[]> => {
    const result = await readFile(pathname, 'utf-8')
    if (!result) return []

    return JSON.parse(result) as IQuiz[]
}

export const getQuizById = async (id: number): Promise<IQuiz | undefined> => {
    const all = await getAllQuizes()
    return all.find(quiz => quiz.id == id)
}