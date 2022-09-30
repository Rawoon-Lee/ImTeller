import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useModal } from 'actions/hooks/useModal'
import { setSelectedCards } from 'store/modules/game'

import CardList from 'components/cardList'

export default function GameTeller(props: any) {
	// 본인카드 나열, teller면 본인카드랑 그림 묘사 적어서 제출
	// teller 아니면 그림묘사어 생길때까지 기다리다가 선택해서 제출
	const dispatch = useDispatch()
	const cards = useSelector((state: any) => state.cards)
	const time = useSelector((state: any) => state.time)
	const description = useSelector((state: any) => state.discription)
	const selectedCards = useSelector((state: any) => state.selectedCards)

	const [setModalState, setModalMsg] = useModal('')
	const { stompClient } = props
	const { nickname } = props
	const { imteller } = props

	useEffect(() => {
		dispatch(setSelectedCards([]))
	}, [])

	if (time === 0 && !imteller) {
		if (selectedCards.length === 0) {
			dispatch(setSelectedCards(cards[Math.floor(Math.random() * cards.length)]))
		}
		stompClient.pubscribe({
			destination: 'others',
			body: JSON.stringify({
				nickname,
				cardId: selectedCards[0].cardId,
			}),
		})
	}
	// 모달에 imteller인지 여부에 따라 묘사 입력칸 넣기

	return (
		<div>
			<CardList cardList={cards} />
			{description}
			{description && !imteller ? (
				<div onClick={() => setModalState('cardSelect')}>카드 선택하기</div>
			) : null}
		</div>
	)
}
