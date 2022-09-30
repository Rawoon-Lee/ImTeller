import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import game from 'actions/api/game'
import { setIsChecked } from 'store/modules/game'
import { setModalState } from 'store/modules/util'

export default function MakeRoomModal(props: any) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const currentUser = useSelector((state: any) => state.currentUser)

	const [roomName, setRoomName] = useState('')
	const [isLocked, setIsLocked] = useState(false)
	const [maxNum, setMaxNum] = useState(6)
	const [type, setType] = useState('0')
	const [typeNum, setTypeNum] = useState(10)
	const [roomPw, setRoomPw] = useState('')

	const onSubmit = (event) => {
		event.preventDefault()
		if (!roomName || !maxNum) return

		const roomInfo = {
			roomName,
			roomPw,
			maxNum,
			type,
			typeNum,
			leader: currentUser.nickname,
		}
		if (!isLocked) {
			roomInfo.roomPw = ''
		}

		game
			.make(roomInfo)
			.then((result) => {
				dispatch(setIsChecked(true))
				dispatch(setModalState(''))
				navigate(`/game/${result.data}`)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	// 라디오 말고 버튼으로 만들면 더 꾸미기 좋을듯. radio 기본값 선택
	return (
		<div>
			<form>
				<input onChange={(e) => setRoomName(e.target.value)} placeholder="방 제목"></input>
				<select onChange={(e: any) => setMaxNum(e.target.value)}>
					<option value={0} disabled>
						인원
					</option>
					<option value={3}>3명</option>
					<option value={4}>4명</option>
					<option value={5}>5명</option>
					<option value={6}>6명</option>
				</select>
				<label>
					<input onChange={() => setType('times')} type="radio" name="type"></input>
					라운드
				</label>
				<label>
					<input onChange={() => setType('score')} type="radio" name="type"></input>
					점수
				</label>
				{!type ? (
					<input onChange={(e: any) => setTypeNum(e.target.value)} placeholder="승리 점수"></input>
				) : (
					<select onChange={(e: any) => setTypeNum(e.target.value)}>
						<option value={0} disabled>
							승리 조건
						</option>
						<option value={2}>2라운드</option>
						<option value={3}>3라운드</option>
						<option value={4}>4라운드</option>
						<option value={5}>5라운드</option>
					</select>
				)}
				<label>
					<input
						onChange={(e) => setIsLocked(false)}
						type="radio"
						name="lock"
						value={'공개'}
					></input>
					공개
				</label>
				<label>
					<input onChange={(e) => setIsLocked(true)} type="radio" name="lock"></input>
					비공개
				</label>
				{isLocked ? (
					<input onChange={(e) => setRoomPw(e.target.value)} placeholder="비밀번호"></input>
				) : null}
			</form>

			<button onClick={onSubmit}>완료</button>
			<button
				onClick={() => {
					dispatch(setModalState(''))
				}}
			>
				취소
			</button>
		</div>
	)
}

const makeRoomModal = css`
	.modal {
		display: none;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.6);
	}
	section {
		width: 90%;
		max-width: 450px;
		margin: 0 auto;
		border-radius: 0.3rem;
		background-color: #fff;
		/* 팝업이 열릴때 스르륵 열리는 효과 */
		animation: modal-show 0.3s;
		overflow: hidden;
	}
	header {
		position: relative;
		padding: 16px 16px 0px 16px;
		font-weight: 700;
		display: flex;
		justify-content: center;
	}
	main {
		padding: 16px;
	}
	footer {
		padding: 12px 16px;
		text-align: right;
		display: flex;
		justify-content: center;
	}
	button {
		outline: none;
		cursor: pointer;
		border: 0;
		padding: 6px 12px;
		margin: 0px 10px 5px 10px;
		color: #1b5198;
		background-color: #d1e4ff;
		border-radius: 12px;
		font-size: 13px;
		width: 8em;
	}
	.openModal {
		display: flex;
		align-items: center;
		/* 팝업이 열릴때 스르륵 열리는 효과 */
		animation: modal-bg-show 0.3s;
	}
	@keyframes modal-show {
		from {
			opacity: 0;
			margin-top: -50px;
		}
		to {
			opacity: 1;
			margin-top: 0;
		}
	}
	@keyframes modal-bg-show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`
