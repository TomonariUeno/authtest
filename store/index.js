import Vuex from 'vuex'
import Vue from 'vue'
import { db } from '~/plugins/firebase'

export default () => new Vuex.Store({
	state: {
		loginInfo: {
            isLogin:false,
            uid:""
        },
        userInfo:null
    },
    
	getters: {
        loginInfo: (state) => state.loginInfo,
        userInfo: (state) => state.userInfo,
    },
    
	mutations: {
		setloginInfo(state, loginInfo) {
			state.loginInfo = loginInfo
			//Vue.set(state.selectAnswer,answers.no,{no:answers.no,answer:answers.answer})
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        }
        
    },
    
	actions:{
		async getUserInfo({commit,state}){
            //const db = this.$firebase.firestore()
            const doc = await db.doc(`users/${state.loginInfo.uid}`).get()
            const data = doc.data()
            commit('setUserInfo',data)
        }
	}
})