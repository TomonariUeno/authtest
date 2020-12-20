<template>
  <v-container>
    <div>
      <v-text-field v-model="mail" label="メールアドレス"></v-text-field>
      <v-text-field v-model="password" label="パスワード"></v-text-field>
      <v-btn @click="login()">
        ログイン
      </v-btn>
    </div>
    <div>
         <nuxt-link :to="link.path">{{ link.label }}</nuxt-link>
    </div>
  </v-container>
</template>

<script>
export default {
  data: ()=>({
    mail:null,
    password:null,
    link: { label: '新規作成', path: '/createAccount' },
  }),
  methods:{
    login(){
      const auth = this.$firebase.auth()
      auth.signInWithEmailAndPassword(this.mail, this.password)
      .then((user) => {
        console.log(user)
        const db = this.$firebase.firestore()
        db.doc(`users/${user.user.uid}`).set({
          mail:this.mail
        })
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>
