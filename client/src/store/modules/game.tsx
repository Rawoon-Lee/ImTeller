import { createSlice } from '@reduxjs/toolkit'

export const isChecked = createSlice({
	name: 'isChecked',
	initialState: false,
	reducers: {
		setIsChecked(state, action) {
			return action.payload
		},
	},
})
export const { setIsChecked } = isChecked.actions

export const roomList = createSlice({
	name: 'roomList',
	initialState: [
		{
			roomId: 1,
			roomName: '내가 최고다',
			isLocked: false,
			peopleNum: 3,
			maxPeopleNum: 5,
			type: 'socre',
			typeNum: 3,
		},
		{
			roomId: 3,
			roomName: '가즈아',
			isLocked: true,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'times',
			typeNum: 30,
		},
		{
			roomId: 4,
			roomName: '자신있는 사람만 들어와',
			isLocked: false,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'socre',
			typeNum: 50,
		},
		{
			roomId: 5,
			roomName: '힘들군',
			isLocked: true,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'socre',
			typeNum: 5,
		},
		{
			roomId: 10,
			roomName: '나는 더미데이터',
			isLocked: true,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'times',
			typeNum: 20,
		},
		{
			roomId: 13,
			roomName: '곧 사라질 계획이지',
			isLocked: false,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'socre',
			typeNum: 3,
		},
		{
			roomId: 14,
			roomName: '우승자리그',
			isLocked: false,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'times',
			typeNum: 4,
		},
		{
			roomId: 20,
			roomName: '클래식이 좋아',
			isLocked: true,
			peopleNum: 5,
			maxPeopleNum: 6,
			type: 'socre',
			typeNum: 8,
		},
	],
	reducers: {
		setRoomList(state, action) {
			return action.payload
		},
	},
})
export const { setRoomList } = roomList.actions

export const roomInfo = createSlice({
	name: 'roomInfo',
	initialState: {
		roomId: 1,
		roomName: 'test room',
		isLocked: false,
		peopleNum: 3,
		maxPeopleNum: 6,
		type: 'score',
		typeNum: 10,
	},
	reducers: {
		setRoomInfo(state, action) {
			return action.payload
		},
	},
})
export const { setRoomInfo } = roomInfo.actions

export const chats = createSlice({
	name: 'chats',
	initialState: {
		currentRoomId: 0,
		chats: [
			{
				nickname: 'test',
				msg: 'testtesttest',
				time: '9/24/2022, 10:10:10 AM',
			},
		],
	},
	reducers: {
		clearChat(state) {
			state.chats = []
		},
		setCurrentRoomId(state, action) {
			state.currentRoomId = action.payload
		},
		addChat(state, action) {
			state.chats.push(action.payload)
		},
	},
})
export const { clearChat, setCurrentRoomId, addChat } = chats.actions

export const players = createSlice({
	name: 'players',
	initialState: [
		{
			nickname: '민지',
			profile:
				'https://w.namu.la/s/cf689cab0bb0801a249f535dc7c008c0c054b82954d8f9cdca47b81363e68489a3c24c6dd3adf6664a9c260499bd6dcd132354c253673082c05310d00787cd1627999da116030d7f09cfeabb07d2bbbd2c4581baef341d6e49fd2581525c5e2d',
			ready: false,
			score: 0,
			nft: '',
		},
		{
			nickname: '도현',
			profile:
				'https://img.danawa.com/prod_img/500000/147/615/img/14615147_1.jpg?shrink=330:330&_v=20220426173016',
			ready: false,
			score: 0,
			nft: '',
		},
		{
			nickname: '보경',
			profile:
				'https://img.danawa.com/prod_img/500000/147/615/img/14615147_1.jpg?shrink=330:330&_v=20220426173016',
			ready: false,
			score: 0,
			nft: '',
		},
		{
			nickname: '현영',
			profile:
				'https://img.danawa.com/prod_img/500000/147/615/img/14615147_1.jpg?shrink=330:330&_v=20220426173016',
			ready: false,
			score: 0,
			nft: '',
		},
		{
			nickname: '석호',
			profile:
				'https://w.namu.la/s/cf689cab0bb0801a249f535dc7c008c0c054b82954d8f9cdca47b81363e68489a3c24c6dd3adf6664a9c260499bd6dcd132354c253673082c05310d00787cd1627999da116030d7f09cfeabb07d2bbbd2c4581baef341d6e49fd2581525c5e2d',
			ready: false,
			score: 0,
			nft: '',
		},
		{
			nickname: '수민',
			profile:
				'https://w.namu.la/s/cf689cab0bb0801a249f535dc7c008c0c054b82954d8f9cdca47b81363e68489a3c24c6dd3adf6664a9c260499bd6dcd132354c253673082c05310d00787cd1627999da116030d7f09cfeabb07d2bbbd2c4581baef341d6e49fd2581525c5e2d',
			ready: false,
			score: 0,
			nft: '',
		},
	],
	reducers: {
		setPlayers(state, action) {
			return action.payload
		},
		addScore(state, action) {
			state.forEach((player: any) => {
				for (const p of action.payload) {
					if (player.nickname === p.nickname) {
						player.score += p.score
						break
					}
				}
			})
		},
	},
})
export const { setPlayers, addScore } = players.actions

export const time = createSlice({
	name: 'time',
	initialState: 10,
	reducers: {
		setTime(state, action) {
			return action.payload
		},
	},
})
export const { setTime } = time.actions

export const items = createSlice({
	name: 'items',
	initialState: [
		{
			itemId: 1,
			grade: 'S',
			effect: 2,
			effectNum: 60,
		},
		{
			itemId: 2,
			grade: 'A',
			effect: 5,
			effectNum: 2.5,
		},
	],
	reducers: {
		removeItem(state, action) {
			const copy = state.filter((item) => item.itemId !== action.payload.itemId)
			return copy
		},
		setItems(state, action) {
			return action.payload
		},
	},
})
export const { removeItem } = items.actions

export const itemState = createSlice({
	name: 'itemState',
	initialState: [],
	reducers: {
		setItemState(state, action) {
			return action.payload
		},
	},
})
export const { setItemState } = itemState.actions

export const gameCards = createSlice({
	name: 'gameCards',
	initialState: [
		{
			cardId: 1,
			cardTitle: '기본카드1',
			cardImageURL: 'assets/image/card1',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
			description: '기본카드6.',
			grade: 'S',
			effect: 5,
			effectDetail: 2.5,
			createdDT: 'asdf',
			recentPrice: 100,
		},
	],
	reducers: {
		setGameCards(state, action) {
			return action.payload
		},
		addGameCard(state, action) {
			state.push(action.payload)
		},
	},
})
export const { setGameCards, addGameCard } = gameCards.actions

// cardId만 담김
export const selectedCards = createSlice({
	name: 'selectedCards',
	initialState: [],
	reducers: {
		setSelectedCards(state, action) {
			return action.payload
		},
	},
})
export const { setSelectedCards } = selectedCards.actions

export const description = createSlice({
	name: 'description',
	initialState: '',
	reducers: {
		setDescription(state, action) {
			return action.payload
		},
	},
})
export const { setDescription } = description.actions

export const table = createSlice({
	name: 'table',
	initialState: [
		{
			cardId: 1,
			cardTitle: '기본카드1',
			cardImageURL: 'assets/image/card1',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
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
			cardImageURL: 'assets/image/card4',
			description: '기본카드7.',
			grade: 'A',
			effect: 6,
			effectDetail: 0,
			createdDT: 'asdf',
			recentPrice: 100,
		},
	],
	reducers: {
		setTable(state, action) {
			return action.payload
		},
	},
})
export const { setTable } = table.actions

export const endResult = createSlice({
	name: 'endResult',
	initialState: [],
	reducers: {
		setEndResult(state, action) {
			action.payload.sort((player) => -player.score)
			return action.payload
		},
	},
})
export const { setEndResult } = endResult.actions
