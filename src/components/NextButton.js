function NextButton({ dispatch, answer, numQuestions, index }) {
  // GUARD CLAUSE - IF NO ANSWER SHOW NO NEXT BUTTON
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish Quiz
      </button>
    );
}

export default NextButton;
