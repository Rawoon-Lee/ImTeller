/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

const Room = (props: any) => {
	const { roomId, roomName, isLocked, peopleNum, maxPeopleNum, type, typeNum } = props.room

	return (
		<div css={roomCSS}>
			<div>{roomId}</div>
			<div>방이름 : {roomName}</div>
			<div>
				{peopleNum} / {maxPeopleNum}
			</div>
			<div>
				{type === 'score' ? '점수' : '라운드'} | {typeNum} {type === 'score' ? '점' : '라운드'}
			</div>
			<div>{isLocked ? '비공개' : '공개'}</div>
		</div>
	)
}
export default Room

const roomCSS = css({
	boxSizing: 'border-box',
	background: 'rgba(255, 255, 255, .3)',
	borderRadius: 15,
	margin: '1em',
	padding: '1em',
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: '40%',
	cursor: 'pointer',
	'&:hover': {
		boxShadow: '2px 2px 2px 2px rgba(255, 255, 255, 0.2)',
	},
})
