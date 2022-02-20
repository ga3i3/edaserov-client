module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	pwa: {
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "src/registerServiceWorker.js"
		}
	}
}
