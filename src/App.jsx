import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  divisionData,
  getRandomQuestion,
  multiplicationData,
} from "./data/multiplication";

const RANGE = 30;
const IMG_PATH = "";
const IMG_PATH_CORRECT = `${IMG_PATH}correct.png`;
const IMG_PATH_WRONG = `${IMG_PATH}wrong.png`;
const IMG_PATH_QUESTION = `${IMG_PATH}question.png`;

const IMG_STYLE = {
  height: "200px",
  borderWidth: "5px",
  borderColor: "#fff",
};

const data = [
  ...multiplicationData({ range: RANGE }),
  ...divisionData({ range: RANGE }),
];

function App() {
  // const [logs, setLogs] = useState([]);
  const formRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [question, setQuestion] = useState({});

  // const randomQuestion = getRandomQuestion({ range: 30 });

  useEffect(() => {
    setQuestion(getRandomQuestion(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = Number(e.target.answer.value);
    const isCorrect = question?.result === answer;

    formRef.current.answer.value = "";
    formRef.current.answer.focus();

    if (!isCorrect) {
      setIsCorrect(false);
      return;
    }

    setIsCorrect(true);
    setQuestion(getRandomQuestion(data));
  };

  console.log("Question: ", question);

  return (
    <>
      <div style={{ display: "flex-col", alignItems: "center" }}>
        <div>
          {isCorrect === true && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={IMG_PATH_CORRECT}
                alt="Correct Answer"
                style={IMG_STYLE}
              />
              <span style={{ fontSize: "20px", color: "green" }}>DOBRZE</span>
            </div>
          )}
          {isCorrect === false && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={IMG_PATH_WRONG}
                alt="Incorrect Answer"
                style={IMG_STYLE}
              />
              <span style={{ fontSize: "20px", color: "#f4f745" }}>
                Spróbuj jeszcze raz
              </span>
            </div>
          )}
        </div>
        {isCorrect === null && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={IMG_PATH_QUESTION} alt="Question" style={IMG_STYLE} />
            <span style={{ fontSize: "20px", color: "#44b4f4" }}>
              Pomóż mi rozwiązać zadanie
            </span>
          </div>
        )}
        <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
              gap: "20px",
            }}
          >
            <h1>{question?.a}</h1>
            <h1>{question?.type === "x" ? " · " : " : "}</h1>
            <h1>{question?.b}</h1>
            <h1> = </h1>
            <input
              type="number"
              id="answer"
              name="answer"
              onChange={(e) => e.target.value}
              style={{
                width: "60px",
                height: "60px",
                fontSize: "40px",
              }}
            />
            <button type="submit" style={{ backgroundColor: "#1a68bc" }}>
              Sprawdź
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
