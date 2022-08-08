import { buttonSelector } from './const/selector.js'
import createRouter from './router.js'

const router = createRouter()
router
	.addRoute('#/', () => {
		console.log('products page')
	})
	.addRoute('#/products', () => {
		console.log('products page')
	})
	.addRoute('#/charge', () => {
		console.log('charge page')
	})
	.addRoute('#/purchase', () => {
		console.log('purchase page')
	})
	.setNotFound(() => {
		console.log('not found page')
	})
router.start()

document.body.addEventListener('click', (ev) => {
	const { target } = ev
	if (target.matches(buttonSelector.NAV_BTN_SELECTOR)) {
		const { navigate } = target.dataset
		router.navigate(navigate)
	}
})
