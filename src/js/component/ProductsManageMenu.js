export class ProductsManageMenu extends HTMLElement {
	constructor() {
		super()

		const template = document.querySelector('#products-manage-menu').content.cloneNode(true)
		const shadow = this.attachShadow({ mode: 'open' })
		const linkElem = document.createElement('link')

		linkElem.setAttribute('rel', 'stylesheet')
		linkElem.setAttribute('href', 'index.css')

		shadow.appendChild(template)
		shadow.appendChild(linkElem)
	}
}
