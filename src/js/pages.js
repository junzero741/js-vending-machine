export default (container) => {
	const products = () => {
		container.innerHTML = document.createElement('products-manage-menu').outerHTML
	}

	const charge = () => {
		container.innerHTML = document.createElement('vending-machine-manage-menu').outerHTML
	}

	const purchase = () => {
		container.innerHTML = document.createElement('product-purchase-menu').outerHTML
	}

	const notFound = () => {
		container.innerHTML = 'Not Found'
	}

	return {
		products,
		charge,
		purchase,
		notFound,
	}
}
