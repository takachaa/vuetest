<template>
<div>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
    <v-navigation-drawer permanent>
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              John Leider
            </v-list-item-title>
            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  <v-btn v-on:click="openModal">Click</v-btn>

    <div id="overlay" v-show="showContent" v-on:click="closeModal">
        <div id="content">
            <p>これがモーダルウィンドウです。</p>
            <button v-on:click="closeModal">Close</button>
        </div>
    </div>
</div>
</template>


<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
      showContent: false
    }),
    methods:{
        openModal: function(){
            this.showContent = true
        },
        closeModal: function(){
            this.showContent = false
        }
    }
  }
</script>

<style scoped>
#overlay{
    /*要素を重ねた時の順番*/
    z-index:1;

    /*画面全体を覆う設定*/
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);

    /*画面の中央に要素を表示させる設定*/
    display: flex;
    align-items: center;
    justify-content: center;

}

#content{
    z-index:2;
    width:80%;
    padding: 1em;
    background:#fff;
}

</style>