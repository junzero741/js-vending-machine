export default (container) => {
	const products = () => {
		container.innerHTML = '상품관리페이지'
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
