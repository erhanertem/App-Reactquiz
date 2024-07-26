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
	questions: [],
	//possible status states - 'loading', 'error', 'ready', 'active', 'finished'
	status: 'loading',
	index: 0, //state for keeping track of current question
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	// console.log(state);
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			// Derived State
			const currQuestion = state.questions.at(state.index);
			// console.log(currQuestion);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === currQuestion.correctOption
						? state.points + currQuestion.points
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore: state.points > state.highscore ? state.points : state.highscore,
			};
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			};

		default:
			throw new Error('Unknown action type');
	}
}

export default function App() {
	// const [state, dispatch] = useReducer(reducer, initialState);
	// const { questions, status } = state;
	const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
		useReducer(reducer, initialState);
	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

	useEffect(function () {
		fetch('http://localhost:9000/questions')
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataReceived', payload: data })) //dispatch({action})
			.catch((err) => dispatch({ type: 'dataFailed' }));
	}, []);

	return (
		<div className="app">
			<Header />

			<Main>
				{/* SELECTIVE UI ELEMENT DISPLAY BASED ON UI STATUS  */}
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question question={questions[index]} dispatch={dispatch} answer={answer} />
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
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
						dispatch={dispatch}
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
					/>
				)}
			</Main>
		</div>
	);
}