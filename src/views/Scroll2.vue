<template>
<div id="app">
  <h2>リスト:</h2>
  <!-- <ol>
    <li v-for="(todo,index) in todos" :key="index">
      {{ todo.text }}
    </li>
  </ol> -->
  <div v-for="animal in animals" :key="animal.id">
        <!-- ID:{{animal.id}} name:{{animal.name}} -->
        <!-- name:{{animal}} -->
        <v-card
            
            max-width="400"
            class="mx-auto my-12"
        >
            <v-img
            class="white--text align-end"
            height="200px"
            :src="animal.Email"
            >
            <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">{{animal.Name}}</v-card-subtitle>

            <v-card-text class="text--primary">
            <div>{{animal.Name}}</div>

            <div>{{animal.Name}}</div>
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="orange"
                text
            >
                Share
            </v-btn>

            <v-btn
                color="orange"
                text
            >
                Explore
            </v-btn>
            </v-card-actions>
        </v-card>
  </div>
  <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
  <infinite-loading @infinite="infiniteHandler" spinner="default">
      <!-- <div slot="spinner">ロード中...</div>
      <div slot="no-more">もう検索データが無いよ！</div>
      <div slot="no-results">検索結果が無い！</div> -->
    </infinite-loading>
</div>
</template>

<script>
import axios from '../axios-directjob'

export default {
  name: 'Scroll2',
  data () {
    return {
      animals: [],
      page: 1,
    }
  },
  mounted() {
    
  },
  methods: {
    infiniteHandler($state) {
      
      this.getAnimals($state);
      
    },
    // axiosとかのAPI想定
    getAnimals($state) {
      axios.get(
          '/animals/',
           {
            params: {
              page: this.page,
              per_page: 20
            },
            // headers: {
            //   'Authorization' : 'Bearer ' + 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            // }
          }
      ).then(response =>{
          
          if (response.data.length) {
              this.page += 1
              this.animals.push(...response.data)
              $state.loaded()
          } else {
              $state.complete()
          }

      }).catch(error => {
          console.log(error)
           $state.complete()
      })

      
    } 
  }
}
</script>