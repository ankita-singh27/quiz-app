import React from 'react'

const Result = ({status,score,restartQuiz}) => {
  return (
         <div className=" md:w-[30%] w-full p-4">
              <h2 className="text-2xl font-medium">Your Score: </h2>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
              <h3 className={`text-xl ${status === "Passed" ? "text-green-800" : "text-red-500"}`}>
              {status}
              </h3>
                <h1 className="text-3xl font-bold my-2 text-slate-800">
                  {score * 10} /60
                </h1>
              </div>

              <button
                onClick={restartQuiz}
                className="bg-[#FCC822] text-white w-full py-2 rounded mt-16"
              >
                Restart
              </button>
    </div>
  )
}

export default Result