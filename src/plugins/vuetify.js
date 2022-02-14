import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#ef7b4f', // #E53935
				secondary: '#3d6c6f', // #FFCDD2
				accent: '#3d6c6f', // #3F51B5
			},
		},
	},
});
