/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import art from 'actions/api/art'
import { setCardList } from 'store/modules/art'
import { setSelectedCards } from 'store/modules/game'
import { useModal } from 'actions/hooks/useModal'
import nftGrade from 'actions/functions/nftGrade'

export default function GameRoom(props: any) {
	const dispatch = useDispatch()
	const roomId = useParams().roomId
	const { stompClient } = props

	const cardList = useSelector((state: any) => state.cardList)
	const selectedCards = useSelector((state: any) => state.selectedCards)
	const { nickname } = useSelector((state: any) => state.currentUser)

	const [cardGrade, setCardGrade] = useState('')

	const [setModalState, setModalMsg] = useModal('')

	useEffect(() => {
		art.cardList({ nickname }).then((result) => {
			dispatch(setCardList(result.data))
		})
	}, [])

	useEffect(() => {
		if (selectedCards.length) setCardGrade(nftGrade(selectedCards))
	}, selectedCards)

	return (
		<div css={main}>
			<button
				css={button}
				onClick={() => {
					setModalState('cardSelect')
				}}
			>
				카드 선택
			</button>
			<button
				css={button}
				onClick={() => {
					dispatch(setSelectedCards([]))
				}}
			>
				취소
			</button>
			{cardGrade}
		</div>
	)
}

const main = css({
	display: 'flex',
	justifyContent: 'space-evenly',
})

const button = css({
	width: '10em',
	borderRadius: 15,
	margin: '1em',
	cursor: 'pointer',
})
