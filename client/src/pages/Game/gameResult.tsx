import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addScore } from 'store/modules/game'

export default function GameResult(props: any) {
	const dispatch = useDispatch()
	const players = useSelector((state: any) => state.players)
	const [newScores, setNewScores] = useState([])
	const { result } = props

	useEffect(() => {
		players
			.forEach((player: any) => {
				for (const p of result) {
					if (player.nickname === p.nickname) {
						const newPlayer = player
						newPlayer.score = p.score - player.score
						setNewScores([...newScores, newPlayer])
						break
					}
				}
			})
			.then(() => {
				setNewScores(newScores.sort((player) => -player.score))
			})
		return () => {
			dispatch(addScore(newScores))
		}
	}, [])

	// 카드 주인하고 table에 있던 카드가 매칭되어 누가 주인이였는지 알게 해야함
	// 추가된 점수를 알 수 있도록 해야함
	return <div>여긴 GameResult</div>
}
