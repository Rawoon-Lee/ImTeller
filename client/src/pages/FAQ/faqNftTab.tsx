import React, { useState, useEffect } from 'react'

export default function FaqNftTab(props: any) {
	const { page, setPage } = props

	useEffect(() => {
		setPage([0, 3])
	}, [])

	const title = {
		0: 'NFT1',
		1: 'NFT2',
		2: 'NFT3',
	}

	const content = {
		0: '설명1',
		1: '설명2',
		2: '설명3',
	}

	return (
		<div>
			{<div>{title[page[0]]}</div>}
			{<div>{content[page[0]]}</div>}
		</div>
	)
}
