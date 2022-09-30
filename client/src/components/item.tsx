import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import itemDetail from 'actions/functions/itemDetail'
import { removeItem } from 'store/modules/game'
import { setItemState } from 'store/modules/game'

import item1 from 'assets/image/item1.png'
import item2 from 'assets/image/item2.png'
import item3 from 'assets/image/item3.png'
import item4 from 'assets/image/item4.png'
import item5 from 'assets/image/item5.png'
import item6 from 'assets/image/item6.png'

export default function Item(props: any) {
	const dispatch = useDispatch()

	const { itemId, grade, effect, effectNum } = props.item
	const [effectPre, effectPost] = itemDetail(effect, effectNum) // effectPre는 hover했을 때
	const [isDeal, setIsDeal] = useState(false)

	const src = { 1: item1, 2: item2, 3: item3, 4: item4, 5: item5, 6: item6 }[effect]

	useEffect(() => {
		if (props.isDeal) {
			setIsDeal(true)
		}
	}, [props.isDeal])

	const onClick = (event) => {
		if (isDeal) return
		if (event.detail !== 2) return

		dispatch(setItemState([effect, effectNum]))
		dispatch(removeItem(itemId))
	}

	return (
		<div onClick={onClick}>
			<img src={src} alt={effectPre} />
			<div>{effectNum}</div>
		</div>
	)
}
