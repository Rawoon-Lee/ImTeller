import React, { useState } from 'react'

import FaqGameTab from 'pages/FAQ/faqGameTab'
import FaqDealTab from 'pages/FAQ/faqDealTab'
import FaqVoteTab from 'pages/FAQ/faqVoteTab'
import FaqRankTab from 'pages/FAQ/faqRankTab'
import FaqNftTab from 'pages/FAQ/faqNftTab'

export default function FaqTabViewer(props: any) {
	const { tabNo } = props
	const [page, setPage] = useState([0, 1])
	const tabs = {
		0: <FaqGameTab page={page} setPage={setPage} />,
		1: <FaqDealTab page={page} setPage={setPage} />,
		2: <FaqVoteTab page={page} setPage={setPage} />,
		3: <FaqRankTab page={page} setPage={setPage} />,
		4: <FaqNftTab page={page} setPage={setPage} />,
	}

	const goForw = () => {
		setPage([(page[1] + page[0] - 1) % page[1], page[1]])
	}

	const goBack = () => {
		setPage([(page[0] + 1) % page[1], page[1]])
	}

	return (
		<div>
			<div>
				<div onClick={goForw}>앞으로</div>
				{tabs[tabNo]}
				<div onClick={goBack}>뒤로</div>
			</div>
			<div>
				{[...Array(page[1])].map((_, idx) => {
					if (idx == page[0]) {
						return <div key={idx}>⚫</div>
					}
					return <div key={idx}>⚪</div>
				})}
			</div>
		</div>
	)
}
