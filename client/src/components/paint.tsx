/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { setSelectedPaint } from 'store/modules/art'

export default function Paint(props: any) {
	const { paintId, paintTitle, paintImageURL, description, isVote } = props.paint
	const type = props.type
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const selectedPaint = useSelector((state: any) => state.selectedPaint)
	const [selected, setSelected] = useState(false)

	useEffect(() => {
		if (selectedPaint === paintId) {
			setSelected(true)
		} else {
			setSelected(false)
		}
	}, [selectedPaint])

	// 0: 마이페이지인 경우 호버시 수정 및 출품하기
	// 1: 출품 모달에서 사용

	const select = () => {
		dispatch(setSelectedPaint(paintId))
	}

	return (
		<div>
			<div
				css={type === 0 ? paint0CSS : type === 1 && selected ? paint1CSS : null}
				onClick={select}
			>
				<img style={{ height: '15vh' }} src={paintImageURL} alt="" />
				<div css={isVote ? null : type === 0 ? paintInfo0CSS : { display: 'none' }}>
					<div
						onClick={() => {
							navigate('/paint', { state: { isEdit: true, paint: props.paint } })
						}}
					>
						수정하기
					</div>
					<div
						onClick={() => {
							navigate('/vote/reister', { state: { paint: props.paint } })
						}}
					>
						출품하기
					</div>
				</div>
				<div css={type === 1 && selected ? paintInfo1CSS : { display: 'none' }}>✔</div>
			</div>
			{paintTitle}
			{description}
		</div>
	)
}

const paint0CSS = css`
	height: 15vh;
	&:hover {
		> div {
			display: block;
		}
		img {
			filter: brightness(0.5);
		}
	}
`
const paintInfo0CSS = css`
	display: none;
	position: relative;
	top: -15vh; // 부모인 paintImgCSS 높이만큼 올려주면 됨
	width: 100%;
	height: 100%;
`

const paint1CSS = css`
	filter: brightness(0.5);
`

const paintInfo1CSS = css`
	position: absolute;
	top: 6vh;
	left: 4.5vh;
`
