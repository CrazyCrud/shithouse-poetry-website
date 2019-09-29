import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tabs: [{number: 0, label: 'Hot'}, {number: 0, label: 'New'}, {number: 0, label: 'Transcribe'}],
		activeTab: 0,
	},
	mutations: {
		setActiveTab(state, payload) {
			state.activeTab = payload.number
		}
	},
	actions: {
		setActiveTab(context, payload) {
			context.commit('setActiveTab', payload)
		}
	},
	getters: {
		tabs: state => {
			return state.tabs
		}
	}
})
