/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import Loading from 'components/loading'

import art from 'actions/api/art'
import { setMyPageTab } from 'store/modules/user'
import { setSelectedPaint, setPaintList } from 'store/modules/art'
import { useModal } from 'actions/hooks/useModal'
import connectMetaMask from 'actions/functions/connectMetaMask'

import { createCard } from 'contract/API'

export default function Paint(props: any) {
	const { paintId, paintTitle, paintImageURL, description, isVote } = props.paint
	const type = props.type
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const selectedPaint = useSelector((state: any) => state.selectedPaint)
	const [selected, setSelected] = useState(false)
	const currentUser = useSelector((state: any) => state.currentUser)
	const [setModalState, setModalMsg, setModalResult] = useModal('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (selectedPaint === paintId) {
			setSelected(true)
		} else {
			setSelected(false)
		}
	}, [selectedPaint])

	// type 0: 마이페이지인 경우 호버시 수정 및 출품하기
	// type 1: 출품 모달에서 사용

	const select = () => {
		dispatch(setSelectedPaint(paintId))
	}

	const onDelete = () => {
		const result = confirm('정말 삭제하시겠습니까?')
		if (!result) return
		art.paintDelete(paintId).then((result) => {
			art.paintList({ nickname: currentUser.nickname }).then((result) => {
				console.log(result)
				dispatch(setPaintList(result.data.response))
			})
		})
	}

	const onMint = async () => {
		if (loading) return
		setLoading(true)

		const check: any = await connectMetaMask()
		if (!check) {
			alert('지갑을 연결하세요')
			setLoading(false)
			return
		}
		if (check !== currentUser.wallet) {
			setModalMsg('등록된 지갑주소와 동일한 메타마스크 지갑주소를 연결해야 합니다')
			setModalState('alert')
			setLoading(false)
			return
		}
		setLoading(true)
		const tokenId = await createCard(currentUser.wallet, paintImageURL).catch((error) => {
			setModalMsg('민팅에 실패했습니다.')
			setModalState('alert')
			setLoading(false)
			return
		})

		art
			.createNft({ artId: paintId, tokenId })
			.then((result) => {
				console.log(result)
				dispatch(setMyPageTab(0))
				setLoading(false)
				setModalMsg('민팅에 성공했습니다.')
				setModalState('alert')
			})
			.catch((error) => {
				setLoading(false)
				console.error(error)
			})
	}

	return (
		<div>
			<div css={type === 1 && selected ? type1CSS : type === 0 ? type0CSS : null} onClick={select}>
				{/* <img style={{ height: '185px' }} src={paintImageURL} alt="" /> */}
				<img css={paintImageCSS} src={paintImageURL} alt="" />
				{!isVote ? (
					<div css={type === 0 ? type0InfoCSS : displayNoneCSS}>
						<div className="buttons">
							<span
								onClick={() => {
									navigate('/paint', { state: { isEdit: true, paint: props.paint } })
								}}
							>
								수정하기
							</span>
							<br />
							<span
								onClick={() => {
									setModalState('voteRegister')
								}}
							>
								출품하기
							</span>
							<br></br>
							<span onClick={onMint}>민팅하기</span>
							<br></br>
							<span onClick={onDelete}>삭제하기</span>
						</div>
					</div>
				) : null}
			</div>
			<div css={type === 1 && selected ? type1InfoCSS : displayNoneCSS}>✔</div>
			{loading ? <Loading msg={'민팅이 진행중입니다. 잠시만 기다려주세요'} /> : null}
			{paintTitle}
			{description}
		</div>
	)
}

const type0CSS = css`
	position: relative;
	height: 214px;
	width: 143px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 13px solid #f4f4f4;
	margin: 10px;
	&:hover {
		> div {
			display: block;
		}
		> img {
			filter: brightness(0.4);
		}
	}
`
const paintImageCSS = css`
	height: 222px;
	background-color: white;
	border-radius: 12px;
`
const type0InfoCSS = css`
	display: none;
	position: absolute;
	/* top: -240px; // 부모인 paintImgCSS 높이만큼 올려주면 됨 */
	width: 100%;
	height: 100%;
	color: white;
	font-family: 'GongGothicMedium';
	.buttons {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`
const type1CSS = css`
	margin: 10px;
	filter: brightness(0.5);
	position: relative;
`
const type1InfoCSS = css`
	/* position: absolute; */
	top: -9vh;
	left: 4.5vh;
	/* width: 100%; */
	/* height: 100%; */
`
const displayNoneCSS = css`
	display: none;
`
