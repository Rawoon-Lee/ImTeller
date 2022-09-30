import React from 'react'
import { useSelector } from 'react-redux'

export default function Card(props: any) {
	const {
		cardTitle,
		cardImageURL,
		description,
		grade,
		effect,
		effectDetail,
		createdDt,
		recentPrice,
	} = props.card
	const type = props.type

	const selectedCards = useSelector((state: any) => state.selectedCards)

	// type 0 인 경우 호버효과 X
	// type 1 인 경우 카드 선택 모달에서 사용. 선택카드의 경우(selectedCards에 포함) 표시
	// type 2 인 경우 게임 내에서 사용. 호버시 effect 표시. effect는 이미지로 바꿔서 표시

	return (
		<div>
			<img style={{ height: '15vh' }} src={cardImageURL} alt="" />
			{cardTitle}
			{description}
			{grade}
			{createdDt}
			{recentPrice}
		</div>
	)
}
