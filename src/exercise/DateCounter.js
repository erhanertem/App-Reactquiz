import { useReducer } from 'react';

// INTITIAL STATE
const initialState = { count: 0, step: 1 };

// REDUCER FUNCTION
function reducer(currState, action) {
  console.log(currState, action);

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
      return { count: 0, step: 1 };
    default:
      throw new Error('Invalid action type: ' + action.type);
  }
  // if (action.type === 'inc') return currState + 1;
  // if (action.type === 'dec') return currState - 1;
  // if (action.type === 'setCount') return action.payload;
}

function DateCounter() {
  // USESTATE STATE
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  // USEREDUCER STATE
  const [currState, dispatch] = useReducer(reducer, initialState);
  const { count, step } = currState;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec' });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
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
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={defineCount}
        />
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
