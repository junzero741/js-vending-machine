const changeColorTo = (color) => {
	document.querySelectorAll('hello-world').forEach((helloWorld) => {
		helloWorld.color = color
	})
}

export default changeColorTo
