/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import GameHeader from 'pages/Game/gameHeader'
import Items from 'pages/Game/items'
import GameTeller from 'pages/Game/gameTeller'
import GameChoice from 'pages/Game/gameChoice'
import GameResult from 'pages/Game/gameResult'
import GameRoom from 'pages/Game/gameRoom'
import GameEnd from 'pages/Game/gameEnd'
import Chat from 'components/chat'
import GameProfile from 'components/gameProfile'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import { useModal } from 'actions/hooks/useModal'
import {
	setIsChecked,
	setPlayers,
	setGameCards,
	addGameCard,
	setTime,
	setDescription,
	setTable,
	setEndResult,
} from 'store/modules/game'
import art from 'actions/api/art'
import game from 'actions/api/game'
import { useBGM } from 'actions/hooks/useBGM'
import { setBgmSrc } from 'store/modules/util'

export default function Game() {
	const location = useLocation()
	const dispatch = useDispatch()
	const { roomId } = useParams()
	const { nickname } = useSelector((state: any) => state.currentUser)
	const email = useSelector((state: any) => state.email)
	const isChecked = useSelector((state: any) => state.isChecked)
	const players = useSelector((state: any) => state.players)
	const selectedCard = useSelector((state: any) => state.selectedCards)

	const [state, setState] = useState(0) // 0 이면 gameRoom, 1이면 gamePlay, 2면 gameEnd
	const [turn, setTurn] = useState(0) // 0이면 teller 단계(텔러면 문장 적기, 아니면 유사 그림 선택), 1이면 choice단계, 2면 result단계
	const [imteller, setImteller] = useState(false)
	const [result, setResult] = useState([])
	const [playPause, volumeControl] = useBGM({ src: 'assets/audio/gameBgm.mp3' })

	const [setModalState, setModalMsg] = useModal('')

	const blockRefresh = (event) => {
		event.preventDefault()
		event.returnValue = ''
	}
	useEffect(() => {
		window.addEventListener('beforeunload', blockRefresh)
		art
			.cardList({ nickname })
			.then((result) => {
				dispatch(setGameCards(result.data))
			})
			.catch((error) => {
				console.error(error)
			})
		return () => {
			window.removeEventListener('beforeunload', blockRefresh)
		}
	}, [])

	let stompClient = useWebSocket({
		email,
		roomId,
		onConnect(frame, client) {
			// 서버와 다른 사용자들에게 들어왔음을 알림
			client.publish({
				destination: `/pub/room/${roomId}/join`,
				body: JSON.stringify({
					nickname: nickname,
				}),
			})

			// 다른 플레이어들 상태 변경
			client.subscribe(`/sub/room/${roomId}/join`, (action) => {
				const content = JSON.parse(action.body)
				console.log(content)
				// dispatch(setPlayers(content))
			})

			// 방장이 시작하고 서버에서 시작한다는 요청이 오면 선택했던 카드들 보내기. 보내면서 아이템 넣기
			client.subscribe(`/sub/room/${roomId}/start`, (action) => {
				client.publish({
					destination: 'select',
					body: JSON.stringify({
						nickname,
						selectedCard,
					}),
				})
			})

			// 서버에서 카드 나눠주면 게임 시작
			client.subscribe(`/sub/room/${roomId}/table`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setGameCards(content))
				setState(1)
				setTurn(0)
			})

			// 새 텔러 받으면 새 턴 시작
			client.subscribe('/sub/room/${roomId}/newteller', (action) => {
				const content = JSON.parse(action.body)
				setImteller(false)
				setState(1)
				setTurn(0)
				if (content.nickname === nickname) {
					setImteller(true)
					dispatch(setTime(45))
				}
			})

			// 텔러가 그림 묘사를 완료하면 그때부터 낚시그림 선택
			client.subscribe(`/sub/room/${roomId}/teller`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setDescription(content.cardMsg))
				dispatch(setTime(20))
			})

			// 모두 낚시그림 선택하고 서버가 모아서 보내주면 텔러그림찾기 시작
			client.subscribe(`/sub/room/${roomId}/other`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setTable(content.cardList))
				dispatch(setTime(content.time ? content.time : 45))
				setTurn(1)
			})

			// 아이템에 따라 효과 발동시키기
			client.subscribe(`/sub/room/${roomId}/item`, (action) => {
				const content = JSON.parse(action.body)
				// 미구현
			})

			// 카드 덱 채워넣기
			client.subscribe(`/sub/room/${roomId}/draw`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(addGameCard(content))
			})

			// 유저 점수 갱신
			client.subscribe(`/sub/room/${roomId}/result`, (action) => {
				const content = JSON.parse(action.body)
				setResult(content.result) // useState result가 최신점수, useSelector가 이전 점수, 차이보여주고 useSelector에 반영
				setTurn(2)
				setTimeout(() => {
					setTurn(0)
				}, 10000)
			})

			// 게임 최종 결과창으로
			client.subscribe(`/sub/room/${roomId}/end`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setEndResult(content.result))
				setState(2)
				setTimeout(() => {
					setTurn(0)
				}, 12000)
			})
		},

		beforeDisconnected(frame, client) {
			client.publish({
				destination: 'exit',
				body: JSON.stringify({
					nickname,
				}),
			})
		},
	})

	useEffect(() => {
		console.log(123, isChecked)
		if (!isChecked) {
			setModalState('joinRoom')
		}
		return () => {
			setIsChecked(false)
		}
	}, [])

	const mainComponent = () => {
		if (state === 0) return <GameRoom stompClient={stompClient} /> // 대기실
		if (state === 1) {
			if (turn === 0)
				return <GameTeller stompClient={stompClient} imteller={imteller} nickname={nickname} /> // 텔러의 그림 선택 or 비슷한 그림 선택
			if (turn === 1) return <GameChoice stompClient={stompClient} /> // 텔러그림 맞추기
			if (turn === 2) return <GameResult result={result} /> // 이번턴 결과
		}
		if (state === 2) return <GameEnd /> // 최종 결과
	}

	return (
		<main css={roomBg}>
			<div>
				<GameHeader />
			</div>
			<div css={players}>
				{players.map((player: any) => (
					<div key={player.nickname} css={playerOne}>
						<GameProfile player={player} />
					</div>
				))}
			</div>
			<div>{mainComponent()}</div>
			<div>
				<Items />
			</div>
			<div>
				<Chat />
			</div>
		</main>
	)
}

const roomBg = css({
	// backgroundImage: 'linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)',
	backgroundImage: 'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
	backgroundSize: 'cover',
})

const players = css({
	display: 'flex',
	justifyContent: 'space-evenly',
	flexWrap: 'wrap',
	width: '65%',
})

const playerOne = css({
	margin: '10px',
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: '20%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})
