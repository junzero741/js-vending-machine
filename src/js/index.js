import { buttonSelector } from './const/selector.js'
import createRouter from './router.js'
import createPages from './pages.js'
import componentsRegistry from './component/registry.js'
import changeColorTo from './event/changeColorTo.js'

componentsRegistry()

document.querySelector('#color-btn').addEventListener('click', () => {
	changeColorTo('blue')
})

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
