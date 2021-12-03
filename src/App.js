import "./App.css";
import { useState, useEffect } from "react";
import { DATA } from "./data/data.js";
function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [answerLetters, setAnswerLetters] = useState([]);
  const [resultQuestion, setResultQuestion] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  
  //!egerki useEffect ici bos olursa sadece component didmount şeklinde çalışır
  useEffect(() => {
    handleChangeAnswer();
    handleGetQuestion();
    setResultQuestion(false);
    setIsSelected([])
  }, [resultQuestion]);

  useEffect(() => {
    if (answerLetters.join("") === DATA[index].answer) {
      alert("tebrikler bildiniz");
      setResultQuestion(true);
      incrementIndex();
      setAnswerLetters([]);
    }
  }, [answerLetters]);

  const incrementIndex = () => {
    setIndex(index + 1);
    if (index + 1 === DATA.length) {
      alert("Sorulacak soru kalmadı");
      setIndex(0);
    }
  };
  const handleGetQuestion = () => {
    setQuestion(DATA[index].question);
  };

  const handleChangeAnswer = () => {
    setAnswer(
      DATA[index].answer.split("").sort((a, b) => {
        return Math.random() - 0.5;
      })
    );
  };

  const handleAddAnswer = (data, index) => {
    
    if (answerLetters.length < answer.length) {
      setAnswerLetters([...answerLetters, data]);
      setIsSelected([...isSelected,index]);
    } else {
      alert("cevaptan fazla harf giremezsiniz");
    }
  };
  
  const handleDelete = () => {
    answerLetters.pop();
    setAnswerLetters([...answerLetters]);
  };

  return (
    <div className="App">
      <h1>{question} ? </h1>
      <hr />
      <div className="buttons">
        <button className="button-change" onClick={handleChangeAnswer}>
          Change Letters
        </button>
        <button className="button-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        {answer
          ? answer.map((herBirHarf, index) => (
              <button
                 style={isSelected.includes(index) ? {backgroundColor:"black" , color:"white"}: {}}
                // style={{ marginRight: 1 + "em" }}
                className="button"
                key={index}
                onClick={() => handleAddAnswer(herBirHarf, index)}
              >
                {herBirHarf}
              </button>
            ))
          : "Veri yok"}
      </div>
      <div>
        {answerLetters.length > 0 ? (
          answerLetters.map((secilenHarf, index) => (
            <span className="letters" key={index}>
              {secilenHarf}
            </span>
          ))
        ) : (
          <span>"Henüz bir harf seçmediniz"</span>
        )}
      </div>
    </div>
  );
}

export default App;
