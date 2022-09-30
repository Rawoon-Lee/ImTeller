/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

import Header from './header'
import Footer from './footer'
export default function Layout(props: any) {
	return (
		<div css={background}>
			<Header />
			{props.children}
			<Footer />
		</div>
	)
}
const background = css({
	backgroundImage: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
	// backgroundImage: 'linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)',
	backgroundSize: 'cover',
})
