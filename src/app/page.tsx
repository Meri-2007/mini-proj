import { getAllQuizes } from "@/_helpers/model";
import Link from "next/link";

export default async function Home() {
  const all = await getAllQuizes();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {all.map((quiz) => (
          <div
            key={quiz.id}
            className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="absolute top-0 left-0 h-2 w-2 bg-pink-400 rounded-full animate-ping"></div>
            <h2 className="text-xl font-bold text-white mb-2">{quiz.name}</h2>
            <p className="text-gray-300 text-sm">{quiz.questions.length} questions</p>
            <Link
              href={`/test/${quiz.id}`}
              className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition-all duration-300"
            >
              Take Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
