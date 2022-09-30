import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import CardList from 'components/cardList'
import Paint from 'components/paint'

import { setModalState, setModalMsg, setModalResult } from 'store/modules/util'
import art from 'actions/api/art'
import { useModal } from 'actions/hooks/useModal'

export default function VoteRegisterModal(props: any) {
	const dispatch = useDispatch()

	const paintList = useSelector((state: any) => state.paintList)
	const selectedPaint = useSelector((state: any) => state.selectedPaint)
	const { nickname } = useSelector((state: any) => state.currentUser)
	const [setModalState, setModalMsg] = useModal()

	const onSubmit = () => {
		art
			.paintRegist(selectedPaint)
			.then((result) => {
				console.log(result)
				if (result.data === '제출 완료') {
					setModalMsg('출품이 완료되었습니다.')
					setModalState('alert')
				} else {
					setModalMsg('등록에 실패했습니다.')
					setModalState('alert')
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<div>
			<div>
				<CardList cardList={paintList} isCard={false} type={1} />
			</div>
			<button onClick={() => setModalState('')}>취소</button>
			<button onClick={onSubmit}>출품</button>
		</div>
	)
}
