import { ProductPurchaseMenu } from './ProductPurchaseMenu.js'
import { ProductsManageMenu } from './ProductsManageMenu.js'
import { VendingMachineManageMenu } from './VendingMachineManageMenu.js'

export default () => {
	window.customElements.define('products-manage-menu', ProductsManageMenu)
	window.customElements.define('vending-machine-manage-menu', VendingMachineManageMenu)
	window.customElements.define('product-purchase-menu', ProductPurchaseMenu)
}
