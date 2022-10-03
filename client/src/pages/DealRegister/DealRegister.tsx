/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from 'layout/layout'
import Loading from 'components/loading'

import art from 'actions/api/art'
import deal from 'actions/api/deal'
import { setCardList } from 'store/modules/art'
import { useModal } from 'actions/hooks/useModal'
import connectMetaMask from 'actions/functions/connectMetaMask'
import { sellCard } from 'contract/API'
import { useAppSelector } from 'store/store'

export default function DealRegister() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const currentUser = useAppSelector((state) => state.currentUser)
	const selectedCard = useAppSelector((state) => state.selectedCard)

	console.log('selectedCard', selectedCard)

	const [lowPrice, setLowPrice] = useState(0)
	const [instantPrice, setInstantPrice] = useState(100000)
	const [day, setDay] = useState(1)
	const [tag, setTag] = useState('')

	const [isLoading, setIsLoading] = useState(false)

	const [setModalState, setModalMsg] = useModal()

	useEffect(() => {
		art.cardList({ nickname: currentUser.nickname }).then((result) => {
			console.log(result)
			dispatch(setCardList(result.data.response))
		})
	}, [])

	useEffect(() => {
		console.log(selectedCard)
	}, [selectedCard])

	const lowPriceFilter = (event) => {
		if (event.target.value > instantPrice) {
			event.target.value = instantPrice
		}
		setLowPrice(event.target.value)
	}

	const instantPriceFilter = (event) => {
		if (event.target.value < lowPrice) {
			event.target.value = lowPrice
		}
		setInstantPrice(event.target.value)
	}
	const onSubmit = async () => {
		if (isLoading) return alert('로딩중입니다.')
		console.log(selectedCard)
		if (!selectedCard) {
			setModalMsg('카드를 선택하세요')
			setModalState('alert')
			return setIsLoading(false)
		}
		const check: any = await connectMetaMask()
		if (!check) {
			alert('지갑을 연결하세요')
			setIsLoading(false)
			return
		}
		if (check !== currentUser.wallet) {
			setModalMsg('등록된 지갑주소와 동일한 메타마스크 지갑주소를 연결해야 합니다')
			setModalState('alert')
			setIsLoading(false)
			return
		}
		setIsLoading(true)
		const contractId = await sellCard(check, selectedCard.tokenId, instantPrice).catch((err) => {
			setIsLoading(false)
		})
		console.log(contractId)

		const now = new Date()
		let date: any = new Date(now.setDate(now.getDate() + day))
		date = date.toISOString().substring(0, 19)
		const data = {
			artId: selectedCard.cardId,
			dealAddress: contractId,
			finishedAt: date,
			instantPrice,
			lowPrice,
			tag,
		}

		deal
			.register(data)
			.then((result) => {
				console.log(result.data.response)
				navigate(`/deal/${result.data.response}`)
				setIsLoading(false)
			})
			.catch((error) => {
				console.error(error)
				setIsLoading(false)
			})
	}

	return (
		<Layout>
			<main css={main}>
				<div css={box}>
					<div css={card}>
						<div>{selectedCard ? <img src={selectedCard.cardImageURL} alt="" /> : null}</div>
						<button onClick={() => setModalState('dealRegister')}>카드 선택하기</button>
					</div>

					<div>
						{/* <label htmlFor="lowPrice">최저입찰가</label>
					<input
						id="lowPrice"
						type="number"
						max={instantPrice}
						onChange={lowPriceFilter}
						value={lowPrice}
					/> */}
						<div>
							<label htmlFor="instantPrice">즉시구매가</label>
							<input
								id="instantPrice"
								type="number"
								min={lowPrice}
								onChange={instantPriceFilter}
								value={instantPrice}
							/>
						</div>
						<div>
							<label htmlFor="finishedAt">판매기간</label>
							<fieldset>
								<label>
									<input type="radio" name="day" value="1" checked />
									<span>1일</span>
								</label>

								<label>
									<input type="radio" name="day" value="2" />
									<span>2일</span>
								</label>
							</fieldset>
							<span
								onClick={() => setDay(1)}
								style={day === 1 ? { backgroundColor: 'white' } : null}
							>
								1일
							</span>
							<span
								onClick={() => setDay(2)}
								style={day === 2 ? { backgroundColor: 'white' } : null}
							>
								2일
							</span>
						</div>
						<div>
							{' '}
							<label htmlFor="tag">태그</label>
							<input type="text" onChange={(e) => setTag(e.target.value)} />
						</div>
					</div>
				</div>

				<div>
					<button onClick={() => navigate(-1)}>뒤로가기</button>
					<button onClick={onSubmit}>등록하기</button>
					{isLoading ? <Loading msg={'판매 등록중입니다. 잠시만 기다려주세요'} /> : null}
				</div>
			</main>
		</Layout>
	)
}
const main = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const box = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 20px;
	color: white;
`
const card = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	margin-right: 30px;
	img {
		height: 222px;
		background-color: white;
		border-radius: 12px;
	}
`
