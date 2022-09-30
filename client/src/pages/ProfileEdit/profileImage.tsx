import React from 'react'
import { useSelector } from 'react-redux'

import Layout from 'layout/layout'

export default function profileImage(props: any) {
	const currentUser = useSelector((state: any) => state.currentUser)

	const changeImage = (event) => {
		const image = event.target.files[0]

		const imageTag: any = document.querySelector('#image')
		if (image) {
			imageTag.src = URL.createObjectURL(image)
		} else {
			imageTag.src = ''
		}
	}

	const resetImage = () => {
		const imageInput: any = document.querySelector('#profileImage')
		imageInput.value = ''

		const imageTag: any = document.querySelector('#image')
		imageTag.src = currentUser.profile
	}

	const deleteImage = () => {
		const imageInput: any = document.querySelector('#profileImage')
		imageInput.value = ''

		const imageTag: any = document.querySelector('#image')
		imageTag.src = ''
	}

	return (
		<div>
			<img id="image" src={currentUser.profile} alt="" />
			<div>
				<label htmlFor="profileImage">프로필 이미지</label>
				<input
					id="profileImage"
					type="file"
					accept=".png, .jpg"
					onChange={(event) => {
						changeImage(event)
					}}
				/>
				<button onClick={resetImage}>원상복구하기</button>
				<button onClick={deleteImage}>지우기</button>
			</div>
		</div>
	)
}
