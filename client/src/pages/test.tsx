import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

export default function Test() {
	const [wallet, setWallet] = useState('')

	useEffect(() => {
		if (!window.ethereum) {
			alert('메타마스크 설치해')
		} else {
			window.ethereum
				.request({ method: 'eth_requestAccounts' })
				.then((result: any) => {
					console.log(result)
					setWallet(result[0])
				})
				.then((res) => {
					window.ethereum
						.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainName: 'SSAFY',
									chainId: Web3.utils.toHex(312221),
									nativeCurrency: { name: 'SSF', decimals: 18, symbol: 'SSF' },
								},
							],
							rpcUrls: ['http://20.196.209.2:8545'],
						})
						.then((result) => {
							console.log(result)
						})
				})
				.then((res) => {
					window.ethereum
						.request({
							method: 'eth_getBalance',
							params: [wallet, 'pending'],
						})
						.then((result) => {
							console.log(result)
						})
				})
		}
	}, [])
	return (
		<main>
			<button>mattermost 연결</button>
		</main>
	)
}
