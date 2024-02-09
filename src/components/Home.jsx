import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/quiz");
      setLoading(false);
    }, 3000);
  };

  return (
    <section className="lg:w-9/12 md:w-[90%] w-[95%] mx-auto mt-12 flex flex-col md:flex-row-reverse justify-between items-center">
      {loading && <Loading text="Stay Seated, Stay Sharp. Starting Quiz In a moment!" />}

      <div className="md:w-1/2 w-full">
        <img src="/images/banner.png" alt="banner" className="w-full mx-auto" />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="my-8 lg:text-4xl text-3xl md:w-4/6 font-medium text-[#333] leading-normal mb-3">
          Learn new concepts for each question
        </h1>
        <p className="border-l-4 pl-2 py-2 mb-6 text-gray-500">
          We help you prepare for exams and quizzes
        </p>
        <div className="flex items-center">
          <button
            onClick={handleStartQuiz}
            className="bg-[#FCC822] px-6 py-2 text-white rounded"
            type="button"
          >
           Start Quiz
          </button>

          <button
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
            know more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
