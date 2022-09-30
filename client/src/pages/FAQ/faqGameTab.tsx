import React, { useState, useEffect } from 'react'

export default function FaqGameTab(props: any) {
	const { page, setPage } = props

	useEffect(() => {
		setPage([0, 5])
	}, [])

	const title = {
		0: '게임1',
		1: '게임2',
		2: '게임3',
		3: '게임4',
		4: '게임5',
	}

	const content = {
		0: '설명1',
		1: '설명2',
		2: '설명3',
		3: '설명4',
		4: '설명5',
	}

	return (
		<div>
			{<div>{title[page[0]]}</div>}
			{<div>{content[page[0]]}</div>}
		</div>
	)
}
