export class ProductPurchaseMenu extends HTMLElement {
	constructor() {
		super()

		const template = document.querySelector('#product-purchase-menu').content.cloneNode(true)
		const shadow = this.attachShadow({ mode: 'open' })

		shadow.appendChild(template)
	}
}
