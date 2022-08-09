import { buttonSelector } from './const/selector.js'
import createRouter from './router.js'
import createPages from './pages.js'
import { ProductsManageMenu } from './menus/ProductsManageMenu.js'

const container = document.querySelector('#app')
const pages = createPages(container)
const router = createRouter()
router
	.addRoute('#/', pages.products)
	.addRoute('#/products', pages.products)
	.addRoute('#/charge', pages.charge)
	.addRoute('#/purchase', pages.purchase)
	.setNotFound(pages.notFound)
	.start()

document.body.addEventListener('click', (ev) => {
	const { target } = ev
	if (target.matches(buttonSelector.NAV_BTN_SELECTOR)) {
		const { navigate } = target.dataset
		router.navigate(navigate)
	}
})

customElements.define('products-manage-menu', ProductsManageMenu)
