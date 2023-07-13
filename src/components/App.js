import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'
import { useQuiz } from '../contexts/QuizContext'

export default function App() {
	const { status } = useQuiz()
	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen
					// numQuestions={numQuestions} dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<Progress
						// numQuestions={numQuestions}
						// index={index}
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
							// dispatch={dispatch} secondsRemaining={secondsRemaining}
							/>
							<NextButton
							// dispatch={dispatch}
							// answer={answer}
							// numQuestions={numQuestions}
							// index={index}
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
	)
}
