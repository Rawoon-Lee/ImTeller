import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import { clearChat, addChat } from 'store/modules/game'

export default function Chat() {
	const dispatch = useDispatch()

	const { roomId } = useParams()
	const chats = useSelector((state: any) => state.chats)
	const { nickname } = useSelector((state: any) => state.currentUser)
	const email = useSelector((state: any) => state.email) || localStorage.getItem('email')
	const roomInfo = useSelector((state: any) => state.roomInfo)

	const [msgInput, setMsgInput] = useState('')
	const [ws, setWs] = useState<any>('')

	useEffect(() => {
		dispatch(clearChat())
	}, [])

	useEffect(() => {
		const client = useWebSocket({ email })
		client.onConnect = (frame) => {
			client.subscribe(`/sub/room/${roomId}/chat`, (response) => {
				const content = JSON.parse(response.body)
				const time = new Date()
				content.time = time.toLocaleString()
				dispatch(addChat(content))
			})
		}
		client.activate()
		setWs(client)
		return () => {
			client.deactivate()
		}
	}, [])

	const send = () => {
		ws.publish({
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
	} // 이 값에 따라서 style 다르게. 카톡처럼 내꺼면 오른쪽

	const getProfile = (nickname) => {
		return roomInfo.profiles[nickname]
	} // 프로필 url 가져오기

	return (
		<div css={chatCSS}>
			<div className="chat">
				{chats.length
					? chats.map((chat, idx) => (
							<div
								className="msg"
								key={String(idx) + chat.time}
								style={isMyMsg(chat.nickname) ? { backgroundColor: 'rgb(255,255,255,0.5)' } : null}
							>
								<div className="profileBox">
									<img className="profile" src={getProfile(chat.nickname)} title={chat.time} />
								</div>
								<div className="vertical">
									<div className="name">{chat.nickname}</div>
									<p className="content">{chat.userMsg}</p>
								</div>
								{/* <div>{chat.time ? chat.time : null}</div> */}
							</div>
					  ))
					: null}
			</div>
			<div className="line">
				<input
					className="input"
					type="text"
					onChange={(e) => {
						setMsgInput(e.target.value)
					}}
					value={msgInput}
					onKeyDown={(e) => {
						if (e.key === 'Enter') send()
					}}
				/>
				<button className="btn" onClick={send}>
					+
				</button>
			</div>
		</div>
	)
}

const chatCSS = css`
	border-radius: 15px;
	background-color: rgb(0, 0, 0, 0.4);
	padding: 5px;
	width: 400px;
	height: 70vh;
	color: white;
	position: relative;
	margin: 1em;

	.chat {
		height: 90%;
		overflow: auto;
		border-radius: 10px;
	}

	.msg {
		padding: 3px;
		margin-top: 3px;
		border-radius: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		.profileBox {
			width: 40px;
			height: 40px;
			border-radius: 60%;
			overflow: hidden;
			margin: 5px;
			.profile {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.vertical {
			display: flex;
			flex-direction: column;

			.name {
				font-family: 'GmarketSansMedium';
				font-size: 18px;
			}
			.content {
				font-family: 'GmarketSansMedium';
				white-space: pre-line;
				word-break: break-all;
				position: relative;
				padding: 3px 0;
			}
		}
	}

	.line {
		position: absolute;
		bottom: 0;
		left: -4px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 96%;
		height: 50px;
		margin: 0 5px;

		.input {
			align-items: stretch;
			width: 80%;
			height: 30px;
			border-radius: 20px;
			background-color: white;
			margin: 5px;
			border: 0px;
			padding-left: 10px;
			font-family: 'GmarketSansMedium';
		}

		.btn {
			height: 33px;
			width: 33px;
			border: 0px;
			border-radius: 70%;
		}
	}
`
