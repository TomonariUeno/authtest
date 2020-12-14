<template>
  <v-container>
    <div>
      <v-text-field v-model="mail"></v-text-field>
      <v-text-field v-model="password"></v-text-field>
      <v-btn @click="createNewAccount">
        新規作成
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
        console.log(user)
      })
    }
  }
}
</script>
