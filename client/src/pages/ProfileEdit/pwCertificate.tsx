import React from 'react'

import user from 'actions/api/user'

export default function PwCertificate(props: any) {
	const email = localStorage.getItem('email')

	const checkPw = () => {
		const passwordTag: any = document.querySelector('#password')
		const password = passwordTag.value
		const credentials = {
			email,
			password,
		}
		console.log(credentials)

		user
			.login(credentials)
			.then((result) => {
				if (result.data === '올바른 비밀번호입니다.') {
					props.setPassword(password)
				}
			})
			.catch((error) => {
				alert('잘못된 비밀번호 입니다')
				console.log(error)
			})
	}

	return (
		<div>
			{email}
			<label htmlFor="email"></label>
			<input type="email" value={email} disabled />
			<label htmlFor="password"></label>
			<input
				id="password"
				type="password"
				onKeyDown={(e) => {
					if (e.key === 'Enter') checkPw()
				}}
			/>
			<button onClick={checkPw}>비밀번호 확인</button>
		</div>
	)
}
