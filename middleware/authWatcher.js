import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'

export default async function ({ route, store, redirect }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
          const logininfo = {
              uid:user.uid,
              isLogin:true
          }
        //mutations呼ぶ
        store.commit("setloginInfo", logininfo)
        store.dispatch('getUserInfo')
      } else {
        //route.nameはページの名前が取れる
        if(route.name !== "login") redirect("/login")
      }
    })
  }