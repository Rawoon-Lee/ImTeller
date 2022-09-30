/** @jsxImportSource @emotion/react */
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

export default function Profile(props: any) {
	const navigate = useNavigate()
	const { nickname, profile } = props

	return (
		<div
			onClick={() => {
				navigate(`/mypage/${nickname}`)
			}}
			css={profileCss}
		>
			<img src={profile} alt="" css={profileImgCss} />
			<div>{nickname}</div>
		</div>
	)
}
const profileCss = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: 10,
	marginRight: 20,
	cursor: 'pointer',
})
const profileImgCss = css({
	width: 35,
	borderRadius: 50,
	margin: 10,
})
