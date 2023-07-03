import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'

const initialState = {
	questions: [],
	//Possible status: loading, error, ready, active, finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
}

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			}
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			}
		case 'start':
			return {
				...state,
				status: 'active',
			}
		case 'newAnswer':
			const question = state.questions.at(state.index)

			return {
				...state,
				answer: action.payload,
				points:
					action.paylod === question.correctOption
						? state.points + question.points
						: state.points,
			}
		default:
			throw new Error('Action is unknown')
	}
}

export default function App() {
	// const [state, dispatch] = useReducer(reducer, initialState)
	const [{ questions, status, index, answer }, dispatch] = useReducer(
		reducer,
		initialState,
	)

	const numQuestions = questions.length
	console.log(questions)

	useEffect(function () {
		fetch('http://localhost:9000/questions')
			.then(res => res.json())
			.then(data => dispatch({ type: 'dataReceived', payload: data }))
			.catch(err => dispatch({ type: 'dataFailed' }))
	}, [])
	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<Question
						question={questions[index]}
						dispatch={dispatch}
						answer={answer}
					/>
				)}
			</Main>
		</div>
	)
}
