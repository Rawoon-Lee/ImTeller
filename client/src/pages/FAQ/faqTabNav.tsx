import React from 'react'

export default function FaqTabNav(props: any) {
	const { setTabNo } = props

	return (
		<div>
			<div
				onClick={() => {
					setTabNo(0)
				}}
			>
				게임
			</div>
			<div
				onClick={() => {
					setTabNo(1)
				}}
			>
				거래소
			</div>
			<div
				onClick={() => {
					setTabNo(2)
				}}
			>
				투표
			</div>
			<div
				onClick={() => {
					setTabNo(3)
				}}
			>
				랭킹
			</div>
			<div
				onClick={() => {
					setTabNo(4)
				}}
			>
				NFT
			</div>
		</div>
	)
}
