import { Instance } from '../interfaces/Instance'

const InstanceGenerator = (instance: Instance) => {
	return `
	<div data-v-3434341a="" data-multiplayed="true" id="${instance.id}" class="item instance" style="translate: ${instance.position.x}px ${instance.position.y}px; z-index: ${instance.position.z};">
		<span data-v-3434341a="" class="instance-emoji">${instance.emoji}</span>
    ${instance.name}
	</div>`
}

export function InsertInstance(instance: Instance) {
	document.querySelector('.instances div')?.insertAdjacentHTML('beforeend', InstanceGenerator(instance))
}
