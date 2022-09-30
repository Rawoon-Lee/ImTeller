import React, { useState, useEffect } from 'react'

export default function faqRankTab(props: any) {
	const { page, setPage } = props

	useEffect(() => {
		setPage([0, 1])
	}, [])

	const title = {
		0: 'Rank1',
	}

	const content = {
		0: '설명1',
	}

	return (
		<div>
			{<div>{title[page[0]]}</div>}
			{<div>{content[page[0]]}</div>}
		</div>
	)
}
