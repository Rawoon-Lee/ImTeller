/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

export default function Footer() {
	return (
		<div css={footerCss}>
			Team Classic
			<div></div>
		</div>
	)
}
const footerCss = css({
	display: 'flex',
	justifyContent: 'center',
	color: 'white',
	fontFamily: 'Yeongdo-Rg',
})
