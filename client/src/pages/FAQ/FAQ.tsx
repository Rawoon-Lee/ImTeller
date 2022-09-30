import React, { useState } from 'react'

import Layout from 'layout/layout'
import FaqTabNavbar from 'pages/FAQ/faqTabNav'
import FaqTabViewer from 'pages/FAQ/faqTabViewer'

export default function FAQ() {
	const [tabNo, setTabNo] = useState(0)

	return (
		<Layout>
			<main>
				여긴 FAQ
				<FaqTabNavbar setTabNo={setTabNo} />
				<hr></hr>
				<FaqTabViewer tabNo={tabNo} />
			</main>
		</Layout>
	)
}
