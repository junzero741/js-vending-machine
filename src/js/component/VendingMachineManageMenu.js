export class VendingMachineManageMenu extends HTMLElement {
	constructor() {
		super()

		const template = document.querySelector('#vending-machine-manage-menu').content.cloneNode(true)
		const shadow = this.attachShadow({ mode: 'open' })

		shadow.appendChild(template)
	}
}
