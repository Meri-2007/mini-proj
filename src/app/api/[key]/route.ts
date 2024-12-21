import { getQuizById } from "@/_helpers/model";
import { NextRequest } from "next/server";

interface IProps {
    params: Promise<{key:number}>
}

export const GET = async (req: NextRequest, {params}:IProps ) => {
    const {key} = await params
    let result = await getQuizById(Number(key))
    if(result){
        result = {
            ...result,
            questions: result.questions.map(question => ({
                ...question,
                selectedIndex:-1,
                answers: question.answers.map(answer => ({
                    ...answer
                }))
            }))
        }
    }
    return Response.json({ result })
}