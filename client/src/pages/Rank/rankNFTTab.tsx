import React, { useState, useEffect } from 'react'

export default function RankNFTTab(props: any) {
	const { page, setPage } = props

	useEffect(() => {
		setPage([0, 5])
	}, [])

	return <div></div>
}
