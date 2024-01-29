function NextButton({ dispatch, answer, index, numQuestions }) {
	//GUARD CLAUSE
	// NOTE: Return null is the intentional absence of any object value or below JSX gets returned
	if (answer === null) return null;

	if (index < numQuestions - 1)
		return (
			<button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
				Next
			</button>
		);

	if (index === numQuestions - 1)
		return (
			<button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
				Finish
			</button>
		);
}

export default NextButton;
