import { ProductsManageMenu } from './menus/ProductsManageMenu.js'

export default (container) => {
	const products = () => {
		customElements.define('products-manage-menu', ProductsManageMenu)
	}

	const charge = () => {
		container.innerHTML = '잔돈충전페이지'
	}

	const purchase = () => {
		container.innerHTML = '상품구매페이지'
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
