import React from 'react'
import { useSelector } from 'react-redux'

export default function GameEnd() {
	const endResult = useSelector((state: any) => state.endResult)

	// 1, 2, 3 등은 시상대에 올리기
	// profile로 하기
	return (
		<div>
			1등 : {endResult[0].nickname} | {endResult[0].score}
			<br />
			2등 : {endResult[1].nickname} | {endResult[1].score}
			<br />
			3등 : {endResult[2].nickname} | {endResult[3].score}
			<br />
			{endResult.slice(3).map((player) => (
				<div key={player.nickname}>
					{player.nickname} | {player.score}
				</div>
			))}
		</div>
	)
}
