export class ProductsManageMenu extends HTMLElement {
	#STORAGE_KEY = 'products'

	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: 'open' })
		this.$template = document.querySelector('#products-manage-menu').content.cloneNode(true)

		this.init()
	}

	init() {
		this.attachStyleSheet()
		this.attachEventsToElements()
		this.renderProducts()
		this.shadow.appendChild(this.$template)
	}

	attachStyleSheet() {
		const $link = document.createElement('link')

		$link.setAttribute('rel', 'stylesheet')
		$link.setAttribute('href', 'index.css')

		this.shadow.appendChild($link)
	}

	attachEventsToElements() {
		const productAddButton = this.$template.querySelector('#product-add-button')
		productAddButton.addEventListener('click', this.addProduct.bind(this))
	}

	getLocalStorageProducts() {
		return JSON.parse(localStorage.getItem(this.#STORAGE_KEY)) || []
	}

	renderProducts() {
		const products = this.getLocalStorageProducts()
		products.forEach(({ name, price, quantity }) => {
			this.addTableRow(name, price, quantity)
		})
	}

	addProduct() {
		const shadowDOM = document.querySelector('products-manage-menu').shadowRoot

		const [name, price, quantity] = [
			shadowDOM.querySelector('#product-name-input').value,
			shadowDOM.querySelector('#product-price-input').value,
			shadowDOM.querySelector('#product-quantity-input').value,
		]
		this.addTableRow(name, price, quantity)
		this.saveProductToLocalStorage(name, price, quantity)
	}

	addTableRow(name, price, quantity) {
		console.log(this)
		const $container = this.$template.querySelector('#product-inventory-container')
		const $row = document.createElement('tr')
		const $productName = document.createElement('td')
		const $productPrice = document.createElement('td')
		const $productQuantity = document.createElement('td')

		$row.classList.add('product-inventory')
		$productName.textContent = name
		$productPrice.textContent = price
		$productQuantity.textContent = quantity

		$container.append($row)
		$row.append($productName)
		$row.append($productPrice)
		$row.append($productQuantity)
	}

	saveProductToLocalStorage(name, price, quantity) {
		const products = this.getLocalStorageProducts()
		const productObj = { name, price, quantity }
		const productIndex = products.findIndex((el) => el.name === name)

		if (productIndex !== -1) {
			products[productIndex] = productObj
		} else {
			products.push(productObj)
		}

		localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(products))
	}
}
