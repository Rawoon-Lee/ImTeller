/** @jsxImportSource @emotion/react */

import React from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { useModal } from 'actions/hooks/useModal'
import setting from 'assets/image/setting.png'

const Setting = () => {
	const [setModalState, setModalMsg] = useModal('')

	return (
		<div onClick={() => setModalState('setting')}>
			<img css={imgSize} src={setting} alt="setting" />
		</div>
	)
}
export default Setting

const imgSize = css({
	width: '2em',
	margin: 10,
})
