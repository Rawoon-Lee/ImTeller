/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import { clearChat, addChat } from 'store/modules/game'
import { css } from '@emotion/react'

export default function Chat() {
	const dispatch = useDispatch()

	const { roomId } = useParams()
	const { currentRoomId, chats } = useSelector((state: any) => state.chats)
	const { nickname } = useSelector((state: any) => state.currentUser)
	const email = useSelector((state: any) => state.email)
	const [msgInput, setMsgInput] = useState('')

	useEffect(() => {
		if (roomId !== currentRoomId) {
			dispatch(clearChat())
		}
	}, [])

	let stompClient = useWebSocket({
		email,
		roomId,
		onConnect(frame, client) {
			client.subscribe(`/sub/room/${roomId}/chat`, (response) => {
				const content = JSON.parse(response.body)
				const time = new Date()
				content.time = time.toLocaleString()
				dispatch(addChat(content))
			})
		},
		beforeDisconnected() {},
	})

	const send = () => {
		stompClient.publish({
			destination: `/pub/room/${roomId}/chat`,
			body: JSON.stringify({
				nickname,
				userMsg: msgInput,
			}),
		})
		setMsgInput('')
	}

	const isMyMsg = (nick) => {
		if (nick === nickname) return true
		return false
	} // 이 값에 따라서 style 다르게

	return (
		<div css={chat}>
			<div>
				{chats.map((chat, idx) => (
					<div key={chat.time + String(idx)}>
						<div>{chat.nickname}</div>
						<div>{chat.msg}</div>
						<div>{chat.time}</div>
					</div>
				))}
			</div>
			<div>
				<input
					type="text"
					onChange={(e) => {
						setMsgInput(e.target.value)
					}}
					value={msgInput}
				/>
				<div onClick={send}>전송</div>
			</div>
		</div>
	)
}
const chat = css({
	border: '1px solid black',
	width: '30%',
	height: '80vh',
})
