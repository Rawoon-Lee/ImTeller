import { createSlice } from '@reduxjs/toolkit'

import card1 from 'assets/image/card1.webp'
import card2 from 'assets/image/card4.webp'
import card3 from 'assets/image/card11.webp'
import card4 from 'assets/image/card22.webp'
import card5 from 'assets/image/card31.webp'
import card6 from 'assets/image/card36.webp'
import card7 from 'assets/image/card55.webp'

export const cardList = createSlice({
	name: 'cardList',
	initialState: [
		{
			cardId: 1,
			cardTitle: '기본카드1',
			cardImageURL: card1,
			description: '기본카드1.',
			grade: '',
			effect: 0,
			effectDetail: 0,
			createdDT: 'asdf',
			recentPrice: 100,
		},
		{
			cardId: 2,
			cardTitle: '기본카드2',
			cardImageURL: card2,
			description: '기본카드2.',
			grade: 'S',
			effect: 1,
			effectDetail: 10,
			createdDT: 'asdf',
			recentPrice: 100,
		},
		{
			cardId: 3,
			cardTitle: '기본카드3',
			cardImageURL: card3,
			description: '기본카드3.',
			grade: 'S',
			effect: 2,
			effectDetail: 60,
			createdDT: 'asdf',
			recentPrice: 100,
		},
		{
			cardId: 4,
			cardTitle: '기본카드4',
			cardImageURL: card4,
			description: '기본카드4.',
			grade: 'S',
			effect: 3,
			effectDetail: 0,
			createdDT: 'asdf',
			recentPrice: 100,
		},
		{
			cardId: 5,
			cardTitle: '기본카드5',
			cardImageURL: card5,
			description: '기본카드5.',
			grade: 'S',
			effect: 4,
			effectDetail: 3,
			createdDT: 'asdf',
			recentPrice: 100,
		},
		{
			cardId: 6,
			cardTitle: '기본카드6',
			cardImageURL: card6,
			description: '기본카드6.',
			grade: 'S',
			effect: 5,
			effectDetail: 2.5,
			createdDT: 'asdf',
			recentPrice: 100,
		},
		{
			cardId: 7,
			cardTitle: '기본카드7',
			cardImageURL: card7,
			description: '기본카드7.',
			grade: 'A',
			effect: 6,
			effectDetail: 0,
			createdDT: 'asdf',
			recentPrice: 100,
		},
	],
	reducers: {
		setCardList(state, action) {
			return action.payload
		},
	},
})
export const { setCardList } = cardList.actions

export const paintList = createSlice({
	name: 'paintList',
	initialState: [
		{
			paintId: 1,
			paintTitle: '기본카드1',
			paintImageURL: card1,
			description: '기본카드1.',
		},
		{
			paintId: 2,
			paintTitle: '기본카드2',
			paintImageURL: card2,
			description: '기본카드2.',
		},
	],
	reducers: {
		setPaintList(state, action) {
			return action.payload
		},
	},
})
export const { setPaintList } = paintList.actions

export const selectedPaint = createSlice({
	name: 'selectedPaint',
	initialState: 0,
	reducers: {
		setSelectedPaint(state, action) {
			return action.payload
		},
	},
})
export const { setSelectedPaint } = selectedPaint.actions

export const dealList = createSlice({
	name: 'dealList',
	initialState: [
		{
			dealId: 1,
			instantPrice: 1000,
			finalBidPrice: 700,
			tag: ['맛집', '역삼'],
			finishedAt: '2022-09-28T16:04:30',
			cardId: '1',
			cardImageURL: card1,
			designerId: 'tester',
			description: '기본그림1',
			designerNickname: 'test',
			grade: 'S',
			effect: 1,
		},
		{
			dealId: 2,
			instantPrice: 1500,
			finalBidPrice: 200,
			tag: '#맛집 #역삼',
			finishedAt: '2022-09-28T16:04:30',
			cardId: '2',
			cardImageURL: card2,
			designerId: 'testerasdf',
			description: '기본그림2',
			designerNickname: 'testtets',
			grade: 'A',
			effect: 4,
		},
	],
	reducers: {
		setDealList(state, action) {
			return action.payload
		},
	},
})
export const { setDealList } = dealList.actions

export const dealDetail = createSlice({
	name: 'dealDetail',
	initialState: {},
	reducers: {
		setDealDetail(state, action) {
			return action.payload
		},
	},
})
export const { setDealDetail } = dealDetail.actions
