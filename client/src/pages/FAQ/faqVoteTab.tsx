import React, { useState, useEffect } from 'react'

export default function FaqVoteTab(props: any) {
	const { page, setPage } = props

	useEffect(() => {
		setPage([0, 3])
	}, [])

	const title = {
		0: 'Vote1',
		1: 'Vote2',
		2: 'Vote3',
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
