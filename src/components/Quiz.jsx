import { useEffect, useState } from "react";
import Loading from "./Loading";
import Result from "./Result";
import QuizHeader from "./QuizHeader";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [status, setStatus] = useState("");

  // Utility function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    return formattedTime;
  };

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz data:", error));

    // Set up the timer interval
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        // Check if the timer is greater than 0 before decrementing
        return prevTimer > 0 ? prevTimer - 1 : prevTimer;
      });
    }, 1000);
    setTimerIntervalId(intervalId);

    if (timer === 0) {
      handleSubmit();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    // Handle answer selection logic here
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    //console.log(updatedAnswers);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);
    // Calculate score and show result
    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      // Determine the status based on the percentage
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setStatus(newStatus);
      setShowResult(true);
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = questions.map((question) => question.answer);
    console.log(correctAnswers);
    let score = 0;
    for (const questionId in userAnswers) {
      if (userAnswers[questionId] === correctAnswers[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  // Reset states and reload the page
  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60);
    //navigate("/quiz");
  };

  return (
    <section>
      <QuizHeader timer={timer} formatTime={formatTime} />
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col-reverse  mx-auto">
        {/* question section */}
        <div className="md:w-[70%] w-full">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded "
            >
              <div className="flex items-center rounded text-xs p-2 cursor-pointer">
                <span className="h-8 w-8 bg-[#FCC822] rounded-full flex justify-center items-center text-base mr-3">
                  {index + 1}
                </span>
                <p className="text-base">{question.question}</p>
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
                {question.options.map((option, index) => (
                  <div
                    className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                      answers[question.id] === option ? "bg-gray-300" : ""
                    }`}
                    key={option}
                    onClick={() => handleAnswerSelect(question.id, option)}
                  >
                    <p className="text-[12px] mb-1">Option {index + 1}</p>
                    <p className="text-base">{option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-[#FCC822] px-6 py-2 my-5 text-white rounded"
          >
            Submit Quiz
          </button>
        </div>
        {/* answer  section*/}
        {loading && <Loading text="Wait for a moment! Loading..." />}
        {showResult && (
          <Result
            status={status}
            score={score}
            restartQuiz={restartQuiz}
            formatTime={formatTime}
            timer={timer}
          />
        )}
      </div>
    </section>
  );
};

export default Quiz;
