import React from 'react'

export default function ShareRoom({ roomId }: { roomId: string }) {
	const [buttonText, setButtonText] = React.useState('Share room')
	const urlToShare = `https://neal.fun/infinite-craft/?roomId=${roomId}`

	const copyToClipboard = () => {
		setButtonText('Copied!')
		navigator.clipboard.writeText(urlToShare)
		setTimeout(() => {
			setButtonText('Share room')
		}, 1000)
	}

	return <button onClick={() => copyToClipboard()}>{buttonText}</button>
}
