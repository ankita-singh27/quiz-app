import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Result from "./Result";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    // Handle answer selection logic here
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    //console.log(updatedAnswers);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
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
    //navigate("/quiz");
  };

  return (
    <section>
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto">
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
        {loading && <Loading text="Wait for a moment! It's Loading..." />}
        {showResult && (
          <Result status={status} score={score} restartQuiz={restartQuiz} />
        )}
      </div>
    </section>
  );
};

export default Quiz;
