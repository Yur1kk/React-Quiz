import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    title: "Вкажіть тег для блоку",
    variants: ['a', 'div', 'img', 'p'],
    correct: 1,
  },
  {
    title: "Вкажіть тег для гіперпосилання",
    variants: ['a', 'div', 'span', 'p'],
    correct: 0,
  },
  {
    title: "Вкажіть тег для назви сторінки",
    variants: ['a', 'div', 'title', 'p'],
    correct: 2,
  },
  {
    title: "Вкажіть тег для тексту",
    variants: ['a', 'div', 'img', 'p'],
    correct: 3,
  },
  {
    title: "Вкажіть тег для заголовку",
    variants: ['h', 'p', 'cite', 'b'],
    correct: 0,
  },
];

function Test({ step, question, onClickVariant, chosenQuestions }) {
  const percentage = Math.round((step / chosenQuestions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress_inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function Result({ correct, totalQuestions }) {
  return (
    <div className="result">
      <img src="./img1.jpg" alt="result"/>
      <h2>Ви відповіли правильно на {correct} питань з {totalQuestions}</h2>
      <a href="/">
        <button>Спробувати знову</button>
      </a>
    </div>
  );
}

function ChooseQuestions({ onChoose }) {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleCheckboxChange = (index) => {
    const newSelectedQuestions = [...selectedQuestions];
    if (newSelectedQuestions.includes(index)) {
      
      const indexToRemove = newSelectedQuestions.indexOf(index);
      newSelectedQuestions.splice(indexToRemove, 1);
    } else {
     
      newSelectedQuestions.push(index);
    }
    setSelectedQuestions(newSelectedQuestions);
  };

  const confirmSelection = () => {
    if (selectedQuestions.length > 0) {
      onChoose(selectedQuestions.map(index => questions[index])); 
    } else {
      alert("Будь ласка, оберіть хоча б одне питання");
    }
  };

  return (
    <div className="question-list">
      <h1>Виберіть питання:</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
              />
              {question.title}
            </label>
          </li>
        ))}
      </ul>
      <button className="confirm-button" onClick={confirmSelection}>Підтвердити вибір</button>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(-1);
  const [correct, setCorrect] = useState(0);
  const [chosenQuestions, setChosenQuestions] = useState([]);

  const onClickVariant = (index) => {
    setStep(step + 1);
    const chosenQuestion = chosenQuestions[step];
    if (chosenQuestion && index === chosenQuestion.correct) {
      setCorrect(correct + 1);
    }
  };

  const handleChoose = (selectedQuestions) => {
    if (selectedQuestions.length > 0) {
      setChosenQuestions(selectedQuestions);
      setStep(0);
      setCorrect(0);
    } else {
      alert("Будь ласка, оберіть хоча б одне питання");
    }
  };

  return (
    <div className="App">
      {step === -1 ? (
        <ChooseQuestions onChoose={handleChoose} />
      ) : (
        step !== chosenQuestions.length ? (
          <Test
            step={step}
            question={chosenQuestions[step]}
            onClickVariant={onClickVariant}
            chosenQuestions={chosenQuestions}
          />
        ) : (
          <Result correct={correct} totalQuestions={chosenQuestions.length} />
        )
      )}
    </div>
  );
}

export default App;