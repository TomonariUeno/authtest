<template>
  <v-container>
    <v-snackbar v-model="snackBar" multi-line top>
        {{ errorText }}
        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackBar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
    <div>
      <v-text-field v-model="mail" label="メールアドレス"></v-text-field>
      <v-text-field v-model="password" label="パスワード"></v-text-field>
      <v-btn @click="createNewAccount()">
        新規作成
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data: ()=>({
    mail:null,
    password:null,
    snackBar:false,
    errorText:null
  }),
  methods:{
    async createNewAccount(){
        let errorMessages = []
       
        const auth = this.$firebase.auth()
        auth.createUserWithEmailAndPassword(this.mail,this.password)
        .then(user=>{
            console.log(user.user.uid)
            this.$router.push({ path: 'login' })
        }).catch((error) => {
            if(error.code == "auth/weak-password"){
                errorMessages.push("パスワードは６桁以上にしてください")
            }else if(error.code == "auth/email-already-in-use"){
                errorMessages.push("そのメールアドレスは既に使用されています")
            }else if(error.code == "auth/invalid-email"){
                errorMessages.push("メールアドレスが正しくありません")
            }
            console.log(error.code);
            this.errorText = errorMessages.join('\n');
            this.snackBar = true;
        });
    },
  },
  mounted: async function(){
    
  }
}
</script>
