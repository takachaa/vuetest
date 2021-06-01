<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon  @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>マイアドレス帳</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon @click="logout">mdi-logout</v-icon>
      </v-toolbar-items>
    </v-app-bar>
    <SideNav/>

    <v-main>
      <!-- <template v-if="!isAuthenticated">
        <router-link to="/">Login</router-link> | 
        <router-link to="/signup">Signup</router-link>
      </template>
      <template v-if="isAuthenticated">
        | <router-link to="/about" >About</router-link> | 
        <router-link to="/nav">Nav</router-link> |
        <router-link :to="{name:'Board'}">Board</router-link>
      </template> -->
      <v-container fluid fill-height align-start>
        <transition name="slide" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    
    <v-card style="width: 375px; height: 30px;">
    <v-bottom-navigation color="primary" fixed>
      <template v-if="!isAuthenticated">
        <v-btn value="login">
          <span>login</span>
          <router-link to="/"><v-icon>mdi-login</v-icon></router-link>
        </v-btn>
        <v-btn value="signup">
          <span>signup</span>
          <router-link to="/signup"><v-icon>mdi-account-plus</v-icon></router-link>
        </v-btn>
      </template>
      <template v-if="isAuthenticated">
        <v-btn value="about">
          <span>about</span>
          <router-link to="/about"><v-icon>mdi-alert</v-icon></router-link>
        </v-btn>
        <v-btn value="nav">
          <span>nav</span>
          <router-link to="/nav"><v-icon>mdi-file</v-icon></router-link>
        </v-btn>
        <v-btn value="board">
          <span>board</span>
          <router-link to="/board"><v-icon>mdi-tag-text-outline</v-icon></router-link>
        </v-btn>
        <v-btn value="directjob">
          <span>directjob</span>
          <router-link to="/directjob"><v-icon>mdi-arrow-up-bold-circle-outline</v-icon></router-link>
        </v-btn>
        <v-btn value="Photo">
          <span>Photo</span>
          <router-link to="/photo"><v-icon>mdi-file-image</v-icon></router-link>
        </v-btn>
        <v-btn value="Scroll">
          <span>Scroll</span>
          <router-link to="/scroll"><v-icon>mdi-file-image</v-icon></router-link>
        </v-btn>
      </template>
    </v-bottom-navigation>
  </v-card>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'
import SideNav from './components/SideNav'

export default {
  name: 'App',

  data: () => ({
    drawer: null
  }),
  computed:{
    isAuthenticated(){
      return this.$store.getters.idToken != null
    }
  },
  components: {
    SideNav
  },
  methods:{
    ...mapActions(['toggleSideMenu','logout'])
  },
};
</script>


<style scoped>
.slide-enter-active {
  transition: all .1s ease;
}
.slide-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>