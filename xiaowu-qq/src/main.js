import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import * as Pinia from 'pinia';

// #ifdef H5
// 前端异常监控
// message, source, lineno, colno, error
window.addEventListener('error', (e) => {
	console.warn('error listener:', e);
})
// e.reason
window.addEventListener('unhandlerejection', (e) => {
	console.warn('unhandlerejection listener:', e);
})
// #endif
export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia())
	return {
		app,
		Pinia
	};
}
