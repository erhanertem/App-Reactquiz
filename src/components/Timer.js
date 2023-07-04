import { useEffect } from 'react'

function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60)
	const secs = secondsRemaining % 60

	useEffect(
		function () {
			const timerId = setInterval(function () {
				dispatch({ type: 'tick' })
			}, 1000)

			return () => clearInterval(timerId) //Cleanup timer function
		},
		[dispatch],
	)

	// return <div className="timer">{secondsRemaining}</div>
	return (
		<div className="timer">
			{mins < 10 && '0'}
			{mins}:{secs < 10 && '0'}
			{secs}
		</div>
	)
}

export default Timer
