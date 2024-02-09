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
import { useQuiz } from '../contexts/QuizContext';

export default function App() {
	const { status } = useQuiz();

	return (
		<div className="app">
			<Header />

			<Main>
				{/* SELECTIVE UI ELEMENT DISPLAY BASED ON UI STATUS  */}
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen
					// numQuestions={numQuestions}
					// dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<Progress
						// index={index}
						// numQuestions={numQuestions}
						// points={points}
						// maxPossiblePoints={maxPossiblePoints}
						// answer={answer}
						/>
						<Question
						// question={questions[index]}
						// dispatch={dispatch}
						// answer={answer}
						/>
						<Footer>
							<Timer
							// dispatch={dispatch}
							// secondsRemaining={secondsRemaining}
							/>
							<NextButton
							// dispatch={dispatch}
							// answer={answer}
							// index={index}
							// numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
					// dispatch={dispatch}
					// points={points}
					// maxPossiblePoints={maxPossiblePoints}
					// highscore={highscore}
					/>
				)}
			</Main>
		</div>
	);
}
