/* eslint-disable react/prop-types */
import { IoMdClock } from "react-icons/io";

const QuizHeader = ({timer,formatTime}) => {
    
  return (
    <section className="shadow-sm my-5 py-2  bg-white z-10 " >
      <div className="w-9/12 mx-auto flex md:flex-row flex-col justify-between items-center">
        <div className="font-normal">
          <span className="text-red-700">Attention!</span> You have 60 seconds to
          answer 6 questions.
          <br />
          Please keep an eye on the timer and make sure to answer all questions
          before time runs out.
        </div>

        <div className="flex flex-col items-center">
          <div className="mr-2 text-xl text-gray-700">
           < IoMdClock />
          </div>
            <h1 className="text-green-700 text-xl">
              {formatTime(timer)}
              <sub className="text-xs ml-1">sec</sub>
            </h1>
            <p className="text-xs -mt-1 text-gray-700">Time Consumed</p>
          </div>

        </div>
    </section>
  );
};


export default QuizHeader;
