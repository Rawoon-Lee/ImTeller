import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import DealHistory from 'pages/DealDetail/dealHistory'
import Layout from 'layout/layout'

import deal from 'actions/api/deal'
import itemDetail from 'actions/functions/itemDetail'
import { setDealDetail } from 'store/modules/art'

export default function DealDetail() {
	const dispatch = useDispatch()
	const { dealId } = useParams()
	const dealDetail = useSelector((state: any) => state.dealDetail)
	const [dealInfo, setDealInfo] = useState<any>({})
	const [cardInfo, setCardInfo] = useState<any>({})
	const [dealHistoryList, setDealHistoryList] = useState<any>([])
	const interval = useRef(null)
	const diffTime = useRef(0)
	const [day, setDay] = useState(0)
	const [hour, setHour] = useState(0)
	const [min, setMin] = useState(0)
	const [sec, setSec] = useState(0)

	const [effectPre, effectPost] = itemDetail(cardInfo.effect, cardInfo.effectDetail)

	useEffect(() => {
		deal.dealDetail(dealId).then((result) => {
			dispatch(setDealDetail(result.data.response))
		})
	}, [])

	useEffect(() => {
		if (!dealDetail) return
		setDealInfo(dealDetail.dealInfo)
		setCardInfo(dealDetail.cardInfo)
		setDealHistoryList(dealDetail.dealHistoryList)
	}, [dealDetail])

	useEffect(() => {
		interval.current = setInterval(() => {
			const now = new Date()
			const finish = new Date(dealInfo.finishAt)
			diffTime.current = Math.floor((finish.getTime() - now.getTime()) / 1000)
			setDay(Math.floor(diffTime.current / (24 * 60 * 60)))
			setHour(Math.floor((diffTime.current - day * 24 * 60 * 60) / (60 * 60)))
			setMin(Math.floor((diffTime.current - hour * 60 * 60) / 60))
			setSec(diffTime.current - min * 60)
		}, 1000)
		return () => clearInterval(interval.current)
	}, [dealInfo])

	return (
		<Layout>
			<main>
				<div>
					<div>
						<img src={cardInfo.cardImageUrl} alt="" />
						by. {cardInfo.designerNickname}
					</div>
					<div>
						<p>{dealInfo.tag}</p>
						<p>{dealInfo.cardTitle}</p>
						<p>{cardInfo.ownerId}. 소유</p>
						<br />
						{cardInfo.description}
						{cardInfo.grade} | {effectPre + String(cardInfo.effectDetail) + effectPost}
						{day}일 {hour}시간 {min}분 {sec}초
						<div>
							<div>즉시 구매가 {dealInfo.instantPrice}SSF</div>
							<div>최고 입찰가 {dealInfo.finalBidPrice}SSF</div>
						</div>
					</div>
				</div>
				<DealHistory dealHistoryList={dealHistoryList} />
			</main>
		</Layout>
	)
}
