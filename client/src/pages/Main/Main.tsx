/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from 'layout/layout'
import Timer from 'components/timer'
import { css, keyframes } from '@emotion/react'
import { fullDisplay } from 'style/commonStyle'

import { useBGM } from 'actions/hooks/useBGM'
import { setModalState } from 'store/modules/util'

export default function Main() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<Layout>
			<div css={fullDisplay}>
				<div className="cardLoc" css={cardCss}>
					<div className="card">ImTeller</div>
					<div className="blur"></div>
				</div>
				<button
					onClick={() => {
						navigate('/game')
					}}
				>
					시작하기
				</button>
				<button
					onClick={() => {
						dispatch(setModalState('setting'))
					}}
				>
					모달 띄우기
				</button>
				<Timer />
			</div>
		</Layout>
	)
}
const cardCss = css`
	min-height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 2rem;
	padding-bottom: 2rem;
	box-sizing: border-box;

	.card {
		background: #191c29;
		width: 43vh;
		height: 65vh;
		padding: 3px;
		position: relative;
		border-radius: 32px;
		justify-content: center;
		align-items: center;
		text-align: center;
		display: flex;
		font-size: 1.5em;
		color: rgb(88 199 250 / 0%);
		cursor: pointer;
		font-family: cursive;
		z-index: 100;
	}

	.card:hover {
		color: rgb(88 199 250 / 100%);
		transition: color 1s;
	}
	.card:hover.blur {
		animation: none;
		opacity: 0;
	}

	.blur {
		position: absolute;
		content: '';
		top: 15vh;
		left: 0;
		right: 0;
		z-index: 1;
		width: 43vh;
		height: 65vh;
		margin: 0 auto;
		transform: scale(0.8);
		filter: blur(12vh);
		background-image: linear-gradient(45deg, #5ddcff, #3c67e3 43%, #4e00c2);
		opacity: 1;
		transition: opacity 0.5s;
		// animation: spin 2.5s linear infinite;
	}
`
// const moving = keyframes`
// spin
// 0% {
//   --rotate: 0deg;
// }
// 100% {
//   --rotate: 360deg;
// }
// `
// const magicCardCss = css({
//   position: 'relative',
//   background: '#191c29',
//   width: 500,
//   height: 740,
//   padding: 3,
//   borderRadius: 32,
//   justifyContent: 'center',
//   alignItems: 'center',
//   textAlign: 'center',
//   display: 'flex',
//   fontSize: '1.5em',
//   color: 'rgb(88 199 250 / 0%)',
//   cursor: 'pointer',

//   '&:hover': {
//     color: 'rgb(88 199 250 / 100%)',
//     transition: 'color 1s',
//   },

//   '&:hover:before, &:hover:after': {
//     animation: 'none',
//     opacity: 0,
//   },
//   '&:before': {
//     content: '',
//     width: '104%',
//     height: '102%',
//     borderRadius: 8,
//     backgroundImage: `linear-gradient(
//     var(--rotate)
//     , #5ddcff, #3c67e3 43%, #4e00c2)`,
//     position: 'absolute',
//     zIndex: -1,
//     top: '-1%',
//     left: '-2%',
//     animation: 'spin 2.5s linear infinite',
//   },
//   '&:after': {
//     content: '',
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//     backgroundImage: `linear-gradient(
//     var(--rotate)
//     , #5ddcff, #3c67e3 43%, #4e00c2)`,
//     position: 'absolute',
//     zIndex: -1,
//     top: 'calc(740 / 6)',
//     left: 0,
//     right: 0,
//     margin: '0 auto',
//     transform: 'scale(0.8)',
//     animation: 'spin 2.5s linear infinite',
//     filter: 'blur(calc(740 / 6))',
//     opacity: 1,
//     transition: 'opacity .5s',
//   },
//   animation: `${moving}`,
// })
