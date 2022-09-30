import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setTime } from 'store/modules/game'

export default function Timer() {
	const dispatch = useDispatch()
	const time = useSelector((state: any) => state.time)
	const interval = useRef(null)
	const initialTime = useRef(time)

	useEffect(() => {
		interval.current = setInterval(() => {
			initialTime.current -= 1
			dispatch(setTime(initialTime.current))
		}, 1000)
		return () => clearInterval(interval.current)
	}, [])

	useEffect(() => {
		if (initialTime.current < 0) {
			clearInterval(interval.current)
		}
	}, [time])

	return <div>{time !== -1 ? time + 's' : null}</div>
}
