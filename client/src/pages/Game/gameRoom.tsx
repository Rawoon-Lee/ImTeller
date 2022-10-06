import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import art from 'actions/api/art'
import { setCardList } from 'store/modules/art'
import { useModal } from 'actions/hooks/useModal'

import { normalBtn } from 'style/commonStyle'

export default function GameRoom(props: any) {
	const dispatch = useDispatch()
	const { nickname, client, roomId } = props

	const roomInfo = useSelector((state: any) => state.roomInfo)

	const [isReady, setIsReady] = useState(false)
	const [isLeader, setIsLeader] = useState(false)
	const [setModalState, setModalMsg] = useModal('')

	useEffect(() => {
		art.cardList({ nickname }).then((result) => {
			dispatch(setCardList(result.data.response))
		})
	}, [])

	useEffect(() => {
		if (roomInfo.ready[nickname]) {
			setIsReady(true)
		} else {
			setIsReady(false)
		}
	}, [roomInfo.ready])

	useEffect(() => {
		if (roomInfo.leader === nickname) {
			setIsLeader(true)
			try {
				client.publish({
					destination: `/pub/room/${roomId}/ready`,
					body: JSON.stringify({
						nickname,
						isReady: true,
					}),
				})
			} catch {}
		} else {
			setIsLeader(false)
		}
	}, [roomInfo.leader])

	const onReady = () => {
		client.publish({
			destination: `/pub/room/${roomId}/ready`,
			body: JSON.stringify({
				nickname,
				isReady: !isReady,
			}),
		})
	}

	const onStart = () => {
		client.publish({
			destination: `/pub/room/${roomId}/start`,
			body: JSON.stringify({
				nickname,
				isReady: !isReady,
			}),
		})
	}

	return (
		<div css={main}>
			<button
				css={{ ...normalBtn, ...gameRoomBtn }}
				onClick={() => {
					setModalState('cardSelect')
				}}
			>
				카드 선택
			</button>
			{/* <button
				css={button}
				onClick={() => {
					dispatch(setSelectedCards([]))
				}}
			>
				취소
			</button> */}

			{isLeader ? (
				<button css={{ ...normalBtn, ...gameRoomBtn }} onClick={onStart}>
					게임 시작
				</button>
			) : (
				<button css={{ ...normalBtn, ...gameRoomBtn }} onClick={onReady}>
					{isReady ? '준비 취소' : '준비'}
				</button>
			)}
		</div>
	)
}

const main = css({
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
})

const gameRoomBtn = css({
	width: '10em',
	height: '4em',
	border: 0,
	borderRadius: 15,
	margin: '1em',
	fontFamily: 'GmarketSansMedium',
	cursor: `url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto`,
})
