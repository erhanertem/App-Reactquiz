import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };
const reducer = (currState, action) => {
	// function reducer(currState, action) {
	// console.log(currState, action);
	// return currState + action;
	// // if (action.type === 'inc') return currState + action.payload;
	// if (action.type === 'inc') return currState + 1; //>PAYLOAD IS OPTIONAL IN THIS CASE
	// // if (action.type === 'dec') return currState - action.payload;
	// if (action.type === 'dec') return currState - 1; //>PAYLOAD IS OPTIONAL IN THIS CASE
	// if (action.type === 'setCount') return action.payload;
	switch (action.type) {
		case 'dec':
			return { ...currState, count: currState.count - currState.step };
		case 'inc':
			return { ...currState, count: currState.count + currState.step };
		case 'setCount':
			return { ...currState, count: action.payload };
		case 'setStep':
			return { ...currState, step: action.payload };
		case 'reset':
			return initialState;
		default:
			throw new Error('⚠️⚠️⚠️⚠️Unknown action');
	}
};

function DateCounter() {
	// const [count, setCount] = useState(0);
	// const [step, setStep] = useState(1);
	// const [count, dispatch] = useReducer(reducer, 0);
	const [{ count, step }, dispatch] = useReducer(reducer, initialState);
	// const [state, dispatch] = useReducer(reducer, initialState);
	// const { count, step } = state;

	// This mutates the date object.
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const dec = function () {
		// dispatch(-1);
		// dispatch({ type: 'dec', payload: -1 });
		dispatch({ type: 'dec' });
		// setCount((count) => count - 1);
		// setCount((count) => count - step);
	};

	const inc = function () {
		// dispatch(1);
		// dispatch({ type: 'inc', payload: 1 });
		dispatch({ type: 'inc' });
		// setCount((count) => count + 1);
		// setCount((count) => count + step);
	};

	const defineCount = function (e) {
		dispatch({ type: 'setCount', payload: Number(e.target.value) });
		// setCount(Number(e.target.value));
	};

	const defineStep = function (e) {
		dispatch({ type: 'setStep', payload: Number(e.target.value) });
		// setStep(Number(e.target.value));
	};

	const reset = function () {
		dispatch({ type: 'reset' });
		// setCount(0);
		// setStep(1);
	};

	return (
		<div className="counter">
			<div>
				<input type="range" min="0" max="10" value={step} onChange={defineStep} />
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
