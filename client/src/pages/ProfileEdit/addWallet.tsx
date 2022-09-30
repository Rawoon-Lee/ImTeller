import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import user from 'actions/api/user'
import { useModal } from 'actions/hooks/useModal'

export default function AddWallet(props: any) {
	const [setModalState, setModalMsg] = useModal('메타마스크 설치가 필요합니다')
	const modalResult = useSelector((state: any) => state.modalResult)
	const modalMsg = useSelector((state: any) => state.modalResult)

	useEffect(() => {
		if (!modalMsg) {
			console.log(1)
			if (!modalResult) {
				window.open('https://metamask.io/download/', '_blank')
			}
		}
	}, [modalMsg])

	useEffect(() => {
		console.log(window.ethereum)
		if (!window.ethereum) {
		}
	}, [])

	return <div>ㅁㄴㅇㄹ</div>
}
