import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [], // Question object
  status: 'loading', // Possible status are : 'loading', 'error', 'ready', 'active', 'finished'
  index: 0, // Curr question we are at
  answer: null, // Answer to curr question
  points: 0, // User score
  highscore: 0,
  secondsRemaining: null,
};
const reducer = (currState, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...currState, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...currState, status: 'error' };
    case 'start':
      return {
        ...currState,
        status: 'active',
        secondsRemaining: currState.questions.length * SECS_PER_QUESTION, // Calculate the total seconds for the quiz based on the length of the fetched questionaire.
      };
    case 'newAnswer':
      // Get a hold of the question object based on dispatch's index payload
      const question = currState.questions[currState.index];
      return {
        ...currState,
        answer: action.payload, // answer: option index
        points: action.payload === question.correctOption ? currState.points + question.points : currState.points, // if choosen option index is equal to correctOption increment score else keep it as is
      };
    case 'nextQuestion':
      return { ...currState, index: currState.index + 1, answer: null };
    case 'finish':
      return {
        ...currState,
        status: 'finished',
        highscore: Math.max(currState.highscore, currState.points), // Update highscore if current score is higher
      };
    case 'restart':
      return {
        ...currState,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: 10,
      };
    case 'tick':
      return {
        ...currState,
        secondsRemaining: currState.secondsRemaining - 1,
        status: currState.secondsRemaining === 0 ? 'finished' : currState.status,
      };
    default:
      throw new Error('Invalid action ' + action.type);
  }
};

function App() {
  const [currState, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore, secondsRemaining } = currState;

  // Derived State
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  const hasAnswered = answer !== null;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              hasAnswered={hasAnswered}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              hasAnswered={hasAnswered}
            />
            <Footer>
              <Timer
                secondsRemaining={secondsRemaining}
                dispatch={dispatch}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
