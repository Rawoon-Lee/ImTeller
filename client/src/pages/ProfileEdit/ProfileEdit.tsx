import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'
import PwCertificate from 'pages/ProfileEdit/pwCertificate'
import ProfileImage from 'pages/ProfileEdit/profileImage'
import AddWallet from 'pages/ProfileEdit/addWallet'

import user from 'actions/api/user'
import { useModal } from 'actions/hooks/useModal'

export default function ProfileEdit(props: any) {
	const navigate: any = useNavigate()

	const currentUser = useSelector((state: any) => state.currentUser)
	const email = localStorage.getItem('email')

	const [password, setPassword] = useState('') // 처음 비밀번호 인증하면 비번이 담긴다

	const [nickValid, setNickValid] = useState('')
	const [nickChecked, setNickChecked] = useState(false) // 사용가능한 닉네임 체크 여부
	const [pwValid, setPwValid] = useState('')
	const [pwChecked, setPwChecked] = useState('') // password1,2 일치 여부

	const [nickError, setNickError] = useState('') // 체크 에러문구
	const [isChangePw, setIsChangePw] = useState(false) // 비밀번호 수정 여부
	const [isAddWallet, setIsAddWallet] = useState(false) // 지갑 추가 여부

	const [setModalState, setModalMsg] = useModal('')

	const nickFilter = (event) => {
		setNickChecked(false)
		const { value } = event.target
		const nickname = value.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '')
		if (nickname.length < 5) {
			setNickValid('5자 이상의 닉네임을 지어주세요')
		} else {
			setNickValid('')
		}
		event.target.value = nickname.slice(0, 20)
	}

	const passwordFilter = (event) => {
		const { value } = event.target
		const filtered = value.replace(/[^0-9a-zA-Z~!@#$%^&*()=|+]/g, '')
		if (event.target.value.length < 8) {
			setPwValid('비밀번호는 8자 이상이여야 합니다')
		} else {
			setPwValid('')
		}
		event.target.value = filtered.slice(0, 30)
	}

	const checkNick = () => {
		setNickError('')
		if (nickValid) return alert('닉네임 규칙지키세요')
		const nickname: any = document.querySelector('#nickname')
		if (!nickname.value) return alert('닉네임 입력하셈')
		if (nickname.value === currentUser.nickname) {
			return setNickChecked(true)
		}

		user
			.checkNickname({ nickname: nickname.value })
			.then((result) => {
				console.log(result)
				if (result.data == '사용가능한 닉네임입니다.') {
					setNickChecked(true)
				}
			})
			.catch((error) => {
				setNickError(error.response.data)
				setNickChecked(false)
				console.error(error)
			})
	}

	const pwMatch = () => {
		const password1: any = document.querySelector('#password1')
		const password2: any = document.querySelector('#password2')
		if (password2.value === '') {
			setPwChecked('')
		} else if (password1.value === password2.value) {
			setPwChecked('비밀번호가 일치합니다')
		} else {
			setPwChecked('비밀번호가 일치하지 않습니다')
		}
	}

	const onSubmit = (event) => {
		event.preventDefault()

		if (isChangePw && (pwValid !== '' || pwChecked !== '비밀번호가 일치합니다')) {
			setModalMsg('비밀번호를 정확히 입력해 주세요')
			return setModalState('alert')
		}

		const nickname: any = document.querySelector('#nickname')
		if (nickname.value === '') {
			nickname.value = currentUser.nickname
		}
		if (nickname.value === currentUser.nickname) {
			setNickChecked(true)
		} else if (!nickChecked) {
			setModalMsg('닉네임 중복체크를 해주세요')
			return setModalState('alert')
		}

		const passwordTag: any = document.querySelector('#password1')
		let credentials = {
			email,
			password: isChangePw ? passwordTag.value : password,
			nickname: nickname.value,
		}

		const formdata: any = new FormData()
		const ImageTag: any = document.querySelector('#image')
		const profileImage: any = document.querySelector('#profileImage')
		if (currentUser.profile !== ImageTag.src && profileImage.files.length !== 0) {
			formdata.append('file', profileImage.files[0])
		} else {
			credentials['profile'] = 'reset'
		}
		const blob = new Blob([JSON.stringify(credentials)], { type: 'application/json' })
		formdata.append('info', blob)

		user
			.profileEdit(formdata)
			.then((result) => {
				if (result.data === '사용자의 정보를 변경했습니다.') {
					navigate(-1, { replace: true })
					setModalMsg('회원정보가 수정되었습니다')
					setModalState('alert')
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<Layout>
			<main>
				{!password ? (
					<PwCertificate setPassword={setPassword} />
				) : isAddWallet ? (
					<AddWallet />
				) : (
					<>
						<div>
							<ProfileImage />
							<label htmlFor="nickname">닉네임</label>
							<input
								id="nickname"
								type="text"
								defaultValue={currentUser.nickname || ''}
								placeholder={currentUser.nickname}
								required
								onChange={(event) => {
									nickFilter(event)
								}}
							/>
							<button onClick={checkNick}>닉네임 중복 체크</button>
							{nickChecked ? '✅' : nickError}
							{nickValid}
						</div>
						{isChangePw ? (
							<div>
								<label htmlFor="password">비밀번호</label>
								<input
									onChange={(e) => {
										passwordFilter(e)
										pwMatch()
									}}
									type="password"
									id="password1"
									required
									placeholder="비밀번호를 입력해주세요"
								/>
								{pwValid}
								<label htmlFor="password2">비밀번호 재입력</label>
								<input
									onChange={(e) => {
										pwMatch()
									}}
									type="password"
									id="password2"
									required
									placeholder="비밀번호를 다시 입력해주세요"
								/>
								{pwChecked}
							</div>
						) : null}
						<button
							onClick={() => {
								setIsChangePw(!isChangePw)
							}}
						>
							{isChangePw ? '비밀번호 변경하지 않기' : '비밀번호 변경하기'}
						</button>
						<button
							onClick={(event) => {
								onSubmit(event)
							}}
						>
							수정하기
						</button>
					</>
				)}

				<button
					onClick={() => {
						navigate(-1)
					}}
				>
					뒤로
				</button>
			</main>
		</Layout>
	)
}
