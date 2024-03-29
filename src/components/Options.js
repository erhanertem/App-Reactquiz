import { useQuiz } from '../contexts/QuizContext';

function Options({ question }) {
	const { answer, dispatch } = useQuiz();

	const isAnswered = answer !== null;

	return (
		<div className="options">
			{question.options.map((option, index) => (
				<button
					className={`btn btn-option ${index === answer ? 'answer' : ''} ${
						isAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''
					}`}
					onClick={() => dispatch({ type: 'newAnswer', payload: index })}
					disabled={isAnswered}
					key={option}
				>
					{option}
				</button>
			))}
		</div>
	);
}

export default Options;
