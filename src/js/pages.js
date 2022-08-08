export default (container) => {
	const products = () => {
		container.textContent = '상품관리페이지'
	}

	const charge = () => {
		container.textContent = '잔돈충전페이지'
	}

	const purchase = () => {
		container.textContent = '상품구매페이지'
	}

	const notFound = () => {
		container.textContent = 'Not Found'
	}

	return {
		products,
		charge,
		purchase,
		notFound,
	}
}
