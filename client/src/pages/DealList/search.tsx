import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import deal from 'actions/api/deal'
import { setDealList } from 'store/modules/art'

export default function Search() {
	const dispatch = useDispatch()

	const [keyword, setKeyword] = useState('')
	const [target, setTarget] = useState(0) // 검색 조건. 0작품명, 1제작자, 2소유자
	const [sort, setSort] = useState(0) // 정렬 조건. 0기본순, 1최신순
	const [status, setStatus] = useState(0) // 정렬조건2. 0전체, 1진행중, 2완료

	useEffect(() => {
		onSubmit()
	}, [])

	const inputFilter = (event) => {
		let keyword = event.target.value
		keyword = keyword.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '') // uri에 / 같은게 들어가면 안됨
		if (keyword.length > 20) {
			keyword = keyword.slice(0, 20)
		}
		event.target.value = keyword
		setKeyword(event.target.value)
	}

	const onSubmit = () => {
		console.log(
			'dp 하나 이상 쌓이고 주석풀면됨. 더미데이터가 완벽하지 않아서 구매하기 누르면 없는정보 참조로 에러남',
		)
		// const params = {
		//   keyword,
		//   target,
		//   sort,
		//   status,
		// }
		// deal.dealList(params).then((result) => {
		//   dispatch(setDealList(result.data.response))
		// })
	}

	return (
		<div>
			<select name="target" onChange={(e: any) => setTarget(e.target.value)}>
				<option value={0}>작품명</option>
				<option value={1}>제작자</option>
				<option value={2}>판매자</option>
			</select>
			<input type="text" onChange={(e) => inputFilter(e)} />
			<button onClick={onSubmit}>검색</button>
			<br />
			<select name="sort" onChange={(e: any) => setSort(e.target.value)}>
				<option value={0}>최신순</option>
				<option value={1}>높은가격순</option>
				<option value={2}>낮은가격순</option>
			</select>
			<select name="status" onChange={(e: any) => setStatus(e.target.value)}>
				<option value={0}>전체</option>
				<option value={1}>경매진행중</option>
				<option value={2}>경매완료</option>
			</select>
		</div>
	)
}
