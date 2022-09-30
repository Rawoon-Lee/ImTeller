/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

import Layout from 'layout/layout'
import user from 'actions/api/user'
import art from 'actions/api/art'

import MypageTabNav from 'pages/Mypage/mypageTabNav'
import CardList from 'components/cardList'
import Test from 'pages/test'

import { setUserDetail } from 'store/modules/user'
import { setCardList, setPaintList } from 'store/modules/art'
import { useModal } from 'actions/hooks/useModal'

export default function Mypage() {
	const dispatch = useDispatch()
	const { nick } = useParams()
	const { nickname, profile, exp, win, lose, wallet, createdDT } = useSelector(
		(state: any) => state.userDetail,
	)
	const currentUser = useSelector((state: any) => state.currentUser)
	const paintList = useSelector((state: any) => state.paintList)
	const cardList = useSelector((state: any) => state.cardList)
	const myPageTab = useSelector((state: any) => state.myPageTab)

	const [isMyMypage, setIsMyMypage] = useState(false)
	const [setModalState, setModalMsg] = useModal()

	useEffect(() => {
		if (nick === currentUser.nickname) setIsMyMypage(true)
	})

	useEffect(() => {
		user
			.userDetail({ nickname: nick })
			.then((result) => {
				dispatch(setUserDetail(result.data))
			})
			.catch((error) => {
				console.error(error)
			})
		// art
		//   .cardList({ nickname: nick })
		//   .then((result) => {
		//     console.log(result.data)
		//     dispatch(setCardList(result.data))
		//   })
		//   .catch((error) => {
		//     console.error(error)
		//   })
	}, [nick, nickname])

	// useEffect(() => {
	//   if (isMyMypage) {
	//     art
	//       .paintList({ nickname: nick })
	//       .then((result) => {
	//         dispatch(setPaintList(result.data))
	//       })
	//       .catch((error) => {
	//         console.error(error)
	//       })
	//   }
	// }, [isMyMypage])

	const tabs = {
		0: <CardList cardList={cardList} isCard={true} />,
		1: <CardList cardList={paintList} isCard={false} type={0} />,
	}

	return (
		<Layout>
			<main>
				여긴 mypage
				<div>
					<img src={profile} alt="" css={profileCss} />
					<div>{nickname}</div>
					<div>Lv. {Math.floor(exp / 50) + 1}</div>
					<div>
						{win} 승 {lose} 패. 승률:{' '}
						{win + lose === 0 ? 0 : ((win / (win + lose)) * 100).toFixed(1)}%
					</div>
					<div>
						{wallet ? (
							<>
								<label htmlFor="wallet">등록된 지갑주소</label>
								<input id="wallet" value={currentUser.wallet} disabled></input>
							</>
						) : (
							<button onClick={() => setModalState('addWallet')}>지갑 등록하기</button>
						)}
					</div>
				</div>
				<hr />
				<MypageTabNav isMyMypage={isMyMypage} />
				<hr />
				{tabs[myPageTab]}
			</main>
		</Layout>
	)
}
const profileCss = css({
	width: 100,
})
