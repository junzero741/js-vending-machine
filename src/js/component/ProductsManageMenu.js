export class ProductsManageMenu extends HTMLElement {
	constructor() {
		super()

		const template = document.querySelector('#products-manage-menu').content.cloneNode(true)
		const shadow = this.attachShadow({ mode: 'open' })

		shadow.appendChild(template)
	}
}
