import React from 'react'
import { useSelector } from 'react-redux'

import Item from 'components/item'

export default function Items() {
	const items = useSelector((state: any) => state.items)

	return (
		<div>
			{items.map((item) => (
				<Item item={item} key={item.itemId} />
			))}
		</div>
	)
}
