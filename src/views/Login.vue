<template>
  <v-container>
        <v-banner elevation="2">Login</v-banner>
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
               <v-btn @click="login">ログイン</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
  </v-container>
</template>

<script>
import axios from '../axios-auth'

export default {
  data () {
    return {
      user: {},
      show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          //min: v => (v.length > 8) || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        }
    }
  },
  methods:{
    login(){
      if (!this.user.email || !this.user.password){
        return 
      } 

      this.$store.dispatch("changeLodingStatus", true);

      axios.post('/accounts:signInWithPassword?key=AIzaSyDzRU5FwYeaIGi7bVAAxF1cmboXP8Ne7gE',
      {
        email:this.user.email,
        password:this.user.password,
        returnSecureToken:true
      }
      ).then(response => {

        this.$store.dispatch("changeLodingStatus", false);
        this.$store.dispatch("updateIdToken", response.data.idToken)

        const now = new Date();
        const expiryTimeMs = now.getTime() + (response.data.expiresIn * 1000)
        localStorage.setItem('idToken', response.data.idToken)
        localStorage.setItem('expiryTimeMs', expiryTimeMs)
        localStorage.setItem('refreshToken', response.data.refreshToken)


        setTimeout(() => {
            //this.refreshIdToken(response.data.refreshToken)
            this.$store.dispatch('refreshIdToken', response.data.refreshToken)
        }, response.data.expiresIn * 1000)

        this.$router.push({name:'Board'})
      })

      // this.user.email = ''
      // this.user.password = ''
    }
  }

}
</script>