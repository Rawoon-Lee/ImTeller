/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

import RoomInfo from 'pages/Game/roomInfo'
import Timer from 'components/timer'
import Setting from 'components/setting'

export default function GameHeader(props: any) {
	const { setState } = props

	return (
		<div css={headerCSS}>
			<RoomInfo />
			<Timer />
			<Setting />
		</div>
	)
}

const headerCSS = css({
	display: 'flex',
	justifyContent: 'space-between',
})
