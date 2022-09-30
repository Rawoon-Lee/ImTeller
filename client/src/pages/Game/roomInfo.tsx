/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import back from 'assets/image/arrow.png'

const RoomInfo = (props: any) => {
	const navigate = useNavigate()
	const { roomId, roomName, isLocked, peopleNum, maxPeopleNum, type, typeNum } = useSelector(
		(state: any) => state.roomInfo,
	)

	return (
		<div css={infos}>
			<div css={backBtn} onClick={() => navigate(-1)}>
				<img src={back} alt="뒤로 가기" css={imgSize} />
			</div>
			<div>{roomName}</div>
			<div>{isLocked ? '비공개' : '공개'}</div>
			<div>
				{typeNum} {type === 'score' ? '점수' : '라운드'}
			</div>
			<div>
				{peopleNum} / {maxPeopleNum}
			</div>
		</div>
	)
}
export default RoomInfo

const infos = css({
	display: 'flex',
})

const backBtn = css({
	cursor: 'pointer',
})

const imgSize = css({
	cursor: 'pointer',
	width: '2em',
	margin: 10,
})
