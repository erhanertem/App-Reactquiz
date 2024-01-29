import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
	const min = Math.floor(secondsRemaining / 60);
	const sec = secondsRemaining % 60;

	useEffect(
		function () {
			//>CORE USE EFFECT FUNCTION
			const timerId = setInterval(function () {
				// console.log('tick');
				dispatch({ type: 'tick' });
			}, 1000);

			//>CLEANUP FUNCTION
			return () => clearInterval(timerId);
		},
		[dispatch],
	);

	return (
		<div className="timer">
			{min < 10 && '0'}
			{min}:{sec < 10 && '0'}
			{sec}
		</div>
	);
}

export default Timer;
