import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import GameCard from 'pages/Game/gameCard'

import { setTime } from 'store/modules/game'
import { useModal } from 'actions/hooks/useModal'

export default function GameChoice(props: any) {
	const { nickname, client, roomId } = props
	const dispatch = useDispatch()

	const table = useSelector((state: any) => state.table)
	const teller = useSelector((state: any) => state.teller)
	const tellerMsg = useSelector((state: any) => state.tellerMsg)
	const itemState = useSelector((state: any) => state.itemState)

	const [isImteller, setIsImteller] = useState(false)
	const [choicedCard, setChoicedCard] = useState<any>({})
	const [isSubmit, setIsSubmit] = useState(false)

	const [blind, setBlind] = useState(false)
	const [blindDetail, setBlindDetail] = useState(0)
	const [darkmode, setDarkmode] = useState(false)

	const [setModalState, setModalMsg] = useModal('')

	useEffect(() => {
		if (teller === nickname) {
			setIsImteller(true)
		}
	}, [teller, nickname])

	useEffect(() => {
		itemState.map((item) => {
			if (item.effect === 6) setDarkmode(true)
			if (item.effect === 2) {
				setBlind(true)
				setBlindDetail(Math.max(blindDetail, item.effectNum))
			}
		})
	}, [])

	const onSubmit = () => {
		if (isImteller) return
		if (!choicedCard) {
			setModalMsg('선택된 카드가 없습니다.')
			setModalState('alert')
			return
		}

		setIsSubmit(true)
		client.publish({
			destination: `/pub/room/${roomId}/choice`,
			body: JSON.stringify({
				nickname,
				cardId: choicedCard.cardId,
				cardUrl: choicedCard.cardUrl,
			}),
		})
		dispatch(setTime(0))
	}

	return (
		<div css={choiceContainerCSS}>
			<div css={msgCSS}>
				{isImteller ? (
					<div>다른 사람들이 카드를 맞추는 중입니다.</div>
				) : (
					<div>작품설명으로 텔러의 그림을 맞춰주세요.</div>
				)}
			</div>

			<div css={selectCSS}>
				{!isImteller && choicedCard.cardUrl ? (
					<GameCard
						cardUrl={choicedCard.cardUrl}
						blind={blind}
						blindDetail={blindDetail}
						darkmode={darkmode}
					/>
				) : null}
				<span>{tellerMsg}</span>

				{isSubmit ? null : !isImteller ? (
					<button onClick={onSubmit} css={submitBtnCSS}>
						제출하기
					</button>
				) : null}
			</div>

			<div css={cardCSS}>
				{table.map((card) => (
					<div key={card.cardId} onClick={() => setChoicedCard(card)}>
						<GameCard
							cardUrl={card.cardUrl}
							blind={blind}
							blindDetail={blindDetail}
							darkmode={darkmode}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

const choiceContainerCSS = css`
	font-family: GmarketSansMedium;
	color: white;
`

const msgCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const selectCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		height: 30px;
		width: 100px;
		font-size: 15px;
	}
`
const submitBtnCSS = css`
	width: 10em;
	height: 4em;
	border: 0;
	border-radius: 12px;
	margin: 1em;
	font-family: GmarketSansMedium;
	padding: 10px 10px,
	cursor: url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto;
`
const cardCSS = css({
	display: 'flex',
	width: '100px',
})
