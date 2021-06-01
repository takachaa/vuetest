<template>
  <v-container>
        <v-banner elevation="2">Signup</v-banner>
        <Loading/>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field 
                    v-model="user.email" 
                    label="メールアドレス"
                    :rules="[rules.required]"
                ></v-text-field>
               <v-text-field
                    v-model="user.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="パスワード"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
               <v-btn @click="register">登録</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
  </v-container>
</template>

<script>
import axios from '../axios-auth'
// import loading from '../components/Loading'

export default {
  data () {
    return {
      user: {},
      show1: false,
      show2: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        //min: v => (v.length > 8) || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      }
    }
  },
  // components:{
  //   Loading: loading
  // },
  methods:{
    register(){
      if (!this.user.email || !this.user.password){
        
        return 
      } 

      this.$store.dispatch("changeLodingStatus", true);

      axios.post('/accounts:signUp?key=AIzaSyDzRU5FwYeaIGi7bVAAxF1cmboXP8Ne7gE',
      {
        email:this.user.email,
        password:this.user.password,
        returnSecureToken:true
      }
      ).then(response => {
        console.log(response)
        this.$store.dispatch("changeLodingStatus", false);
        this.$router.push({name:'Login'})
      })

      // this.user.email = ''
      // this.user.password = ''
    },
  }

}
</script>