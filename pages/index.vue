<template>
  <v-container>
    <div>
      {{$store.getters.loginInfo}}
      {{$store.getters.userInfo}}
      <v-text-field v-model="mail" label="メールアドレス"></v-text-field>
      <v-text-field v-model="password" label="パスワード"></v-text-field>
      <v-btn @click="createNewAccount()">
        新規作成
      </v-btn>
      <v-btn @click="login()">
        ログイン
      </v-btn>
       <v-btn @click="signOut()">
        ログアウト
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: ()=>({
    mail:null,
    password:null,
  
  }),
  methods:{
    createNewAccount(){
      const auth = this.$firebase.auth()
      auth.createUserWithEmailAndPassword(this.mail,this.password)
      .then(user=>{
        console.log(user.user.uid)
      })
    },
    login(){
      const auth = this.$firebase.auth()
      auth.signInWithEmailAndPassword(this.mail, this.password)
      .then((user) => {
        console.log(user)
        const db = this.$firebase.firestore()
        db.doc(`users/${user.user.uid}`).set({
          mail:this.mail
        })
      })
    },
    signOut() {
      const auth = this.$firebase.auth()
      auth
          .signOut()
          .then(() => {
            console.log('ログアウトしました');
            location.reload();
          })
          .catch((error) => {
            console.log(`ログアウト時にエラーが発生しました (${error})`);
          });
      
    }
  }
}
</script>
