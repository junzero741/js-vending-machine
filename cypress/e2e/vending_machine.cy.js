describe('자판기 상품관리 페이지 테스트', () => {
	beforeEach(() => {
		cy.visit('/#/products')
	})

	it('상품을 추가하면 로컬스토리지에 해당 상품 정보가 저장된다.', () => {
		const itemName = '코카'
		const itemPrice = '100'
		const itemQuantity = '10'
		cy.submitProductForm(itemName, itemPrice, itemQuantity).then(() => {
			const products = JSON.parse(localStorage.getItem('products'))
			const addedProduct = products[products.length - 1]
			cy.expect(addedProduct.name).to.equal(itemName)
			cy.expect(addedProduct.price).to.equal(itemPrice)
			cy.expect(addedProduct.quantity).to.equal(itemQuantity)
		})
	})
})

//   최초 상품 목록은 비워진 상태이다. (이미지 첨부)
// 상품명, 금액, 수량을 추가할 수 있다.
// 상품 추가 입력 폼에 상품명, 금액, 수량을 차례로 입력한다.
// 상품명, 금액, 수량은 공백이 불가능하다.
// 상품의 최소 수량은 1개여야 한다.
// 상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 한다.
// 예) 콜라 / 110원 / 5개
// 예) 사이다 / 100원 / 100개
// 같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.
// 콜라 / 1000원 / 12개(전) -> 콜라 / 1500원 / 10개(후) => 콜라 / 1500원 / 10개(결과)
// 사용자는 추가한 상품을 확인할 수 있다.
// 상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다. (이미지 첨부)
// 상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.
