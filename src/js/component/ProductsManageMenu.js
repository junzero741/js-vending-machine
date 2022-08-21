export class ProductsManageMenu extends HTMLElement {
	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: 'open' })

		const $template = document.querySelector('#products-manage-menu').content.cloneNode(true)
		const $link = document.createElement('link')

		$link.setAttribute('rel', 'stylesheet')
		$link.setAttribute('href', 'index.css')

		this.$productAddButton = $template.querySelector('#product-add-button')
		this.$productNameInput = $template.querySelector('#product-name-input')
		this.$productPriceInput = $template.querySelector('#product-price-input')
		this.$productQuantityInput = $template.querySelector('#product-quantity-input')

		this.shadow.appendChild($template)
		this.shadow.appendChild($link)
		this.init()
	}

	init() {
		this.$productAddButton.addEventListener('click', () => {
			const [name, price, quantity] = [
				this.$productNameInput.value,
				this.$productPriceInput.value,
				this.$productQuantityInput.value,
			]
			this.addTableRow(name, price, quantity)
			this.saveProduct(name, price, quantity)
		})
	}

	addTableRow(name, price, quantity) {
		const $container = this.shadow.querySelector('#product-inventory-container')
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

	saveProduct(name, price, quantity) {
		const STORAGE_KEY = 'products'
		const productObj = { name, price, quantity }
		const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
		const productIndex = products.findIndex((el) => el.name === name)

		if (productIndex !== -1) {
			products[productIndex] = productObj
		} else {
			products.push(productObj)
		}

		localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
	}
}
