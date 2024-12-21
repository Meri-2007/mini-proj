'use client';

import { IQuiz } from "@/_helpers/types";
import { copyFile } from "fs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Quiz() {
  const params = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [count,setCount]=useState<number>(0)

  useEffect(() => {
    fetch("/api/" + params.id)
      .then((res) => res.json())
      .then((response) => {
        setQuiz(response.result);
      });
  }, [params.id]);

  const handleAnswerClick = (questionId: number, answerId: number) => {
    setCount(count=>count+1)
    const question = quiz?.questions.find(q => q.id === questionId);
    const selectedAnswer = question?.answers.find(a => a.id === answerId);
    
    if (selectedAnswer) {
      if (selectedAnswers[questionId]) {
        return        
      }else{
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: selectedAnswer.is_correct ? answerId : -answerId,
      }));
    }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-6">
      {quiz && (
        <div className="w-full max-w-4xl">
          {/* Quiz Title */}
          <h3 className="text-3xl font-bold text-pink-500 mb-8 text-center">{quiz.name}</h3>

          {/* Questions */}
          {quiz.questions.map((question, qIndex) => (
            <div
              key={question.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transform transition duration-300 hover:scale-105"
            >
              {/* Question Title */}
              <p className="text-lg font-semibold text-indigo-400 mb-4">
                Q{qIndex + 1}: {question.text}
              </p>

              {/* Answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.answers.map((answer) => {
                  const isSelected = Math.abs(selectedAnswers[question.id]) === answer.id;
                  const isCorrect = selectedAnswers[question.id] === answer.id;

                  return (
                    <div
                      key={answer.id}
                      className={`p-4 rounded-lg cursor-pointer shadow-md transition-colors duration-300 ${
                        isSelected
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-pink-500 hover:text-white"
                      }`}
                      onClick={() => handleAnswerClick(question.id, answer.id)
                        
                      }
                    >
                      {answer.text}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
