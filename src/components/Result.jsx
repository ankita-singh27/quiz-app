import React from "react";

const Result = ({ status, score, restartQuiz, formatTime, timer,viewAnswer }) => {
  return (
    <div className=" md:w-[30%] w-full p-4">
      <h2 className="text-2xl font-medium">Your Score: </h2>
      <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
        <h3
          className={`text-xl ${
            status === "Passed" ? "text-green-800" : "text-red-500"
          }`}
        >
          {status}
        </h3>
        <h1 className="text-3xl font-bold my-2 text-slate-800">
          {score * 10} /60
        </h1>

        <div>
          Total Time:
          <span className="text-xl text-orange-500">
            {formatTime(60 - timer)}
            <span className="text-xs">sec</span>
          </span>
        </div>
      </div>

      <div className="flex items-center mt-5">
          <button
            onClick={restartQuiz}
            className="bg-[#FCC822] px-6 py-2 text-white rounded"
            type="button"
          >
           Restart
          </button>

          <button
          onClick={viewAnswer}
            className="px-6 py-2 text-[#FCC822] hover:bg-[#FCC822] hover:text-white rounded flex ml-3 transition-all duration-300"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            Check Answer
          </button>
        </div>
    </div>
  );
};

export default Result;
