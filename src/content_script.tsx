import React from 'react'

import Extension from './App'
import './styles/global.scss'
import { createRoot } from 'react-dom/client'

const initInfiteCraftMultiplayer = () => {
	const container = document.querySelector('.container')

	if (container && container.parentNode) {
		const multiplayerHeader = document.createElement('div')
		const root = createRoot(multiplayerHeader)

		root.render(<Extension />)

		container.parentNode.insertBefore(multiplayerHeader, container)
	}
}

;(() => {
	const browserUrl = window.location.href
	const gameUrl = 'neal.fun/infinite-craft'

	if (browserUrl.includes(gameUrl)) initInfiteCraftMultiplayer()
})()
