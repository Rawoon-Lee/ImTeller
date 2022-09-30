import React, { useState, useEffect } from 'react'

export default function DealHistory(props: any) {
	const { dealHistoryList } = props

	return (
		<div>
			{dealHistoryList &&
				dealHistoryList.map((history, idx) => (
					<div key={idx}>
						<div>{history.dealedAt}</div>
						<div>{history.sellerNickname}</div>
						<div>{history.buyerNickname}</div>
						<div>{history.price}</div>
					</div>
				))}
		</div>
	)
}
