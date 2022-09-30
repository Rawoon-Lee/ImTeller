import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import user from 'actions/api/user'
import { setModalState, setModalMsg } from 'store/modules/util'

export default function AddWalletModal(props: any) {
	const navigate: any = useNavigate()
	const dispatch = useDispatch()

	const [wallet, setWallet] = useState([])
	const [error, setError] = useState('')

	window.ethereum.on('accountsChanged', (account) => {
		setWallet(account[0])
	})

	useEffect(() => {
		if (!window.ethereum) {
			setError('메타마스크 설치가 필요합니다')
			window.open('https://metamask.io/download/', '_blank')
		} else {
			setError('')
			connectWallet()
		}
	}, [window.ethereum])

	const connectWallet = async () => {
		const wallets = await window.ethereum.send('eth_requestAccounts')
		setWallet(wallets.result[0])
	}

	const onSubmit = () => {
		const result = confirm('한번 계정을 등록하면 다시 바꾸지 못합니다. 등록하시겠습니까?')
		if (!result) return
		setError('')

		user
			.addWallet({ email: localStorage.getItem('email'), wallet })
			.then((result) => {
				console.log(result)
				if (result.data === '지갑 주소를 등록했습니다.') {
					dispatch(setModalMsg(result.data))
					dispatch(setModalState('alert'))
					navigate(-1)
				}
			})
			.catch((error) => {
				console.error(error)
				setError(error.data)
			})
	}

	return (
		<div>
			{error}
			<label htmlFor="wallet">현 지갑주소</label>
			<input id="wallet" type="text" value={wallet} disabled />
			다른 계정을 원하시면 MetaMask에서 계정을 변경해 주세요.
			<br />
			<button onClick={onSubmit}>등록</button>
			<button
				onClick={() => {
					dispatch(setModalState(''))
				}}
			>
				취소
			</button>
		</div>
	)
}
