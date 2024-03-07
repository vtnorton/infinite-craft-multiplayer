import React, { useMemo } from 'react'
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import { Comments, HTMLPin, Realtime, WhoIsOnline } from '@superviz/sdk/lib/components'
import { DEVELOPER_KEY } from '../../env'
import { ParticipantEvent } from '@superviz/sdk'
import ShareRoom from '../ShareRoom/ShareRoom'
import { Instance } from '../../interfaces/Instance'
import { InsertInstance } from '../../services/InstanceGenerator'

declare global {
	interface Window {
		timeoutId: number
	}
}

export default function MultiplayerHeader() {
	const participantId = Math.floor(Math.random() * 900 + 100).toString()
	const [roomId, setRoomId] = React.useState<string>('')
	const [roomReady, setRoomReady] = React.useState(false)
	const [realtime] = React.useState<Realtime>(new Realtime())
	const [buttonDisabled, setButtonDisabled] = React.useState(false)

	const getLastElementIfIsList = (item: any) => {
		if (Array.isArray(item)) {
			return item[item.length - 1]
		}
		return item
	}

	const startRoom = async (existingRoomId?: string) => {
		const { default: SuperVizRoom } = await import('@superviz/sdk')
		const room = await SuperVizRoom(DEVELOPER_KEY, {
			roomId: existingRoomId ? existingRoomId : roomId,
			group: {
				id: 'vtn-multiplayer',
				name: 'Vitor Norton Multiplayer Group',
			},
			participant: {
				id: participantId,
				name: 'Vitor Norton',
			},
			environment: 'dev',
		})

		const whoisonline = new WhoIsOnline({
			position: 'top-right',
			styles: `
			.who-is-online {
				top: 4px !important;
				right: 7.5rem !important;
			}`,
		})

		const commentsAreaId = 'vtn-multiplayer-canvas'
		const instances = document.querySelector('.instances div') as HTMLElement
		instances.id = commentsAreaId

		const htmlPin = new HTMLPin(commentsAreaId, {
			dataAttributeName: 'id',
		})
		const comments = new Comments(htmlPin, {
			position: 'right',
		})
		room.addComponent(comments)
		room.addComponent(realtime as any)
		room.addComponent(whoisonline)
		room.subscribe(ParticipantEvent.LOCAL_JOINED, () => setRoomReady(true))
		realtime.subscribe('item-added', (item: any) => {
			const itemToAdd = getLastElementIfIsList(item)

			if (itemToAdd.participantId === participantId) return
			InsertInstance(itemToAdd.data as Instance)
		})
	}

	const getRoomId = () => {
		const urlParams = new URLSearchParams(window.location.search)
		const roomId = urlParams.get('roomId')

		if (roomId) {
			setRoomId(roomId)
			startRoom(roomId)
		}

		setRoomId(Math.random().toString(36).substring(7))
	}

	const joinRoomClick = () => {
		startRoom()
		setButtonDisabled(true)
	}

	const getInstancesMovimentation = () => {
		const instances = document.querySelector('.instances div') as Element
		const observer = new MutationObserver(function (mutations: MutationRecord[]) {
			if (window.timeoutId) clearTimeout(window.timeoutId)

			window.timeoutId = setTimeout(() => {
				const lastMutation = mutations[mutations.length - 1]
				const lastInstance = lastMutation.previousSibling as HTMLElement
				if (!lastInstance) return

				const style = window.getComputedStyle(lastInstance)
				const translate = style.translate
				if (!translate) return

				const parts = translate.split(' ')
				if (parts.length !== 2) return

				const x = parseFloat(parts[0].replace('px', ''))
				const y = parseFloat(parts[1].replace('px', ''))
				const z = parseFloat(style.zIndex)

				const instance: Instance = {
					id: lastInstance.id,
					name: lastInstance.textContent?.trim().split('\n')[1].trim() || '',
					emoji: lastInstance.querySelector('.instance-emoji')?.textContent || '',
					position: {
						x: x,
						y: y,
						z: z,
					},
				}

				if (lastInstance.getAttribute('data-multiplayed')) return
				realtime.publish('item-added', instance)
			}, 500) as unknown as number
		})
		observer.observe(instances, { childList: true })
	}

	useMemo(() => {
		getRoomId()
		getInstancesMovimentation()
	}, [])

	return (
		<div className='vtn-multiplayer'>
			{roomReady && <ShareRoom roomId={roomId} />}
			<div id='room-list'></div>
			{!roomReady && (
				<button disabled={buttonDisabled} onClick={() => joinRoomClick()}>
					🎮 Create Room
				</button>
			)}
		</div>
	)
}
