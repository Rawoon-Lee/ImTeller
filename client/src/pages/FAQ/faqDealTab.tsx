import React, { useState, useEffect } from 'react'

export default function FaqDealTab(props: any) {
	const { page, setPage } = props

	useEffect(() => {
		setPage([0, 4])
	}, [])

	const title = {
		0: '거래1',
		1: '거래2',
		2: '거래3',
		3: '거래4',
	}

	const content = {
		0: '설명1',
		1: '설명2',
		2: '설명3',
		3: '설명4',
	}

	return (
		<div>
			{<div>{title[page[0]]}</div>}
			{<div>{content[page[0]]}</div>}
		</div>
	)
}
