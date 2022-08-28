const template = document.createElement('template')
template.innerHTML = `
<style>
	.purchase-available,
	.product-inventory,
	.cashbox-change,
	.cashbox-remaining {
		border-collapse: collapse;
		border-spacing: 0;
		text-align: center;
		vertical-align: top;
		table-layout: fixed;
	}

	.cashbox-change,
	.cashbox-remaining {
		width: 100%;
		max-width: 300px;
	}

	.product-inventory {
		width: 340px;
	}

	.purchase-available {
		width: 445px;
	}

	.cashbox-change col,
	.cashbox-remaining col {
		width: 65px;
	}

	.purchase-available td,
	.product-inventory td,
	.cashbox-change td,
	.cashbox-remaining td {
		border-color: black;
		border-style: solid;
		border-width: 1px;
		font-family: Arial, sans-serif;
		font-size: 14px;
		overflow: hidden;
		padding: 10px 5px;
		word-break: normal;
	}

	.purchase-available th,
	.product-inventory th,
	.cashbox-change th,
	.cashbox-remaining th {
		border-color: black;
		border-style: solid;
		border-width: 1px;
		font-family: Arial, sans-serif;
		font-size: 14px;
		font-weight: normal;
		overflow: hidden;
		padding: 10px 5px;
		word-break: normal;
	}

	body {
		text-align: center;
		margin: 0;
		padding: 2rem 1rem;
		word-break: keep-all;
		overflow-wrap: break-word;
		font-size: 1.0625rem;
		overflow-anchor: none;
		background-color: #f4f3f5;
	}

	section {
		width: 28rem;
	}

	section:last-child {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
	}

	#app {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	input[type='number'],
	input[type='text'] {
		all: unset;
		font-size: 0.825rem;
		padding: 0.5rem;
		background: white;
		text-align: left;
		border: 1px solid #afafaf;
		border-radius: 6px;
		width: calc(100% - 6.125rem);
	}

	#charge-button,
	#product-add-button,
	#vending-machine-charge-button {
		padding: 0.5rem;
		margin-left: 0.5rem;
	}

	button {
		all: unset;
		font-size: 0.825rem;
		cursor: pointer;
		border: 1px solid #afafaf;
		border-radius: 6px;
		padding: 0.3rem 0.45rem;
	}

	section p {
		border: 1px dashed rgb(70, 70, 70);
		border-radius: 6px;
		padding: 8px 0;
		border-radius: 6px;
		width: 65%;
		font-size: 14px;
	}

	.purchase-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.product-inventory {
		margin-top: 1rem;
	}

	.product-container input:not(:first-child) {
		margin-top: 0.5rem;
	}

	.vending-machine-wrapper {
		width: 65%;
	}

	#product-add-button {
		margin-left: 0;
		margin-top: 0.5rem;
		width: 78%;
	}

	#coin-return-button {
		margin-bottom: 1rem;
	}

	button:active {
		box-shadow: 1px 1px 2px 1px #d8d8d8 inset;
	}

	.cashbox-remaining,
	.purchase-available,
	.cashbox-change,
	.product-inventory {
		border-radius: 10px;
		border-collapse: collapse;
		border-style: hidden;
		box-shadow: 0 0 0 1px rgb(66, 66, 66);
	}

	.purchase-available td,
	.product-inventory td,
	.cashbox-change td,
	.cashbox-remaining td,
	.purchase-available th,
	.product-inventory th,
	.cashbox-change th,
	.cashbox-remaining th {
		border: 1px solid rgb(66, 66, 66);
	}

</style>
<div>
	<h3>상품 추가하기</h3>
	<div class="product-container">
		<input type="text" id="product-name-input" placeholder="상품명" />
		<input type="number" id="product-price-input" placeholder="가격" />
		<input type="number" id="product-quantity-input" placeholder="수량" />
		<button id="product-add-button">추가하기</button>
	</div>
	<table class="product-inventory">
		<colgroup>
			<col style="width: 140px" />
			<col style="width: 100px" />
			<col style="width: 100px" />
		</colgroup>
		<thead>
			<tr>
				<th class="product-inventory">상품명</th>
				<th class="product-inventory">가격</th>
				<th class="product-inventory">수량</th>
			</tr>
		</thead>
		<tbody id="product-inventory-container">
		</tbody>
	</table>
</div>
`

export class ProductsManageMenu extends HTMLElement {
	#STORAGE_KEY = 'products'

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.products = this.getLocalStorageProducts()
	}

	connectedCallback() {
		this.renderProducts()
		this.shadowRoot.querySelector('#product-add-button').addEventListener('click', this.addProduct.bind(this))
	}

	getLocalStorageProducts() {
		return JSON.parse(localStorage.getItem(this.#STORAGE_KEY)) || []
	}

	renderProducts() {
		const products = this.products
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

		if (name && price && quantity) {
			this.addTableRow(name, price, quantity)
			this.saveProductToLocalStorage(name, price, quantity)
		}
	}

	createProductRow(name, price, quantity) {
		const $row = document.createElement('tr')
		const $productName = document.createElement('td')
		const $productPrice = document.createElement('td')
		const $productQuantity = document.createElement('td')

		$row.dataset.productId = name
		$productName.textContent = name
		$productPrice.textContent = price
		$productQuantity.textContent = quantity

		$row.classList.add('product-inventory')
		$row.append($productName)
		$row.append($productPrice)
		$row.append($productQuantity)

		return $row
	}

	replaceTableRow(name, price, quantity) {}

	addTableRow(name, price, quantity) {
		const $container = this.shadowRoot.querySelector('#product-inventory-container')
		const $row = this.createProductRow(name, price, quantity)

		$container.append($row)
	}

	saveProductToLocalStorage(name, price, quantity) {
		const products = this.products
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
