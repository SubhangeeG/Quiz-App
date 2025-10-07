import React, { useRef, useState } from "react";
import "./Quiz.css";
import { questions } from "../assets/data";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [ques, setQues] = useState(questions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const checkAns = (e, optSelected) => {
    if (lock === false) {
      if (ques.answer === ques.options[optSelected]) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        e.target.parentElement.children[
          ques.options.indexOf(ques.answer)
        ].classList.add("correct");
      }
    }
  };

  const next = (e) => {
    if (lock === true) {
      if (index === questions.length - 1) {
        setResult(true);
        return 0;
      }
      //   to remove previous selections
      const options = document.querySelectorAll("ul li");
      options.forEach((li) => li.classList.remove("correct", "wrong"));
      // setting the values
      setIndex(++index);
      setQues(questions[index]);
      setLock(false);
    }
  };

  const reset=()=>{
    setIndex(0);
    setQues(questions[0]);
    setScore(0)
    setLock(false)
    setResult(false)
  }
  return (
    <div className="container">
      <h1 style={{textAlign:"center"}}>Quiz App</h1>
      <hr />
      {result ? (
        <> <h2>You Scored {score} out of {questions.length}</h2>
      <button onClick={reset}>Reset</button></>
      ) : (
        <>
          {" "}
          <h2>
            {index + 1}. {ques.question}
          </h2>
          <ul>
            <li
              onClick={(e) => {
                checkAns(e, 0);
              }}
            >
              {ques.options[0]}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {ques.options[1]}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {ques.options[2]}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {ques.options[3]}
            </li>
          </ul>
          <button onClick={(e) => next(e)}>Next</button>
          <div className="index">
            {index + 1} of {questions.length} questions
          </div>
        </>

      )}
     
    </div>
  );
}

export default Quiz;
