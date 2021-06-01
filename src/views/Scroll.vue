<template>
<div>
    <Loading/>
    <!-- <p v-hello:solid.shadow.textShadow="{fontSize:'50px', color:'blue'}">Hello</p> -->
    <div v-for="animal in animals" :key="animal.id">
        <!-- ID:{{animal.id}} name:{{animal.name}} -->
        <!-- name:{{animal}} -->
        <v-card
            class="mx-auto"
            max-width="400"
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
    <div v-animalscroll="infiniteHandler"></div>
  </div>

</template>

<script>
import axios from '../axios-directjob'

export default {
  name: 'Scroll',

  data: () => ({
      animals: [],
      start: 0,
      end: 40,
      // データ更新を行うスクロール量
      startScrollYOffset: 0
  }),
  mounted() {
    // const list = ['サーバル', 'フェネック', 'アライグマ', 'カバ', 'コツメカワウソ', 'ジャガー', 'トキ']
    // for(let i = 0; i < 4000; i++) {
    //   this.animalData.push({id: i, name: list[Math.floor(Math.random()*list.length)]})
    // }
    this.startScrollYOffset = Math.floor(window.innerHeight / 3)
    this.getAnimals()
  },
  methods: {
    infiniteHandler() {
      // 現時点でのスクロール量が取得を行うスクロール量以上
      if (window.pageYOffset >= this.startScrollYOffset) {
          this.startScrollYOffset = window.innerHeight + window.pageYOffset
          this.getAnimals()
      }
    },
    // axiosとかのAPIの想定
    getAnimals() {
        console.log("end:" + this.end)
        console.log("animals:" + this.animals.length)
        //console.log("this.animalData.length:" + this.animalData.length)
        // if(this.animals.length === 0){
        //     axios.get(
        //     '/animals/'
        //     ).then(response =>{
                
        //         // this.items = response.data.documents
        //         console.log("********first get api")
        //         console.log(response)
        //         console.log(response.data)
        //         this.animals = this.animals.concat(response.data)
        //         // console.log(response.data)
        //         // console.log(response.data[0].Id)
        //         // this.items = response.data
        //         this.$store.dispatch("changeLodingStatus", false);
        //     }).catch(error => {
        //         console.log(error)
        //         this.$store.dispatch("changeLodingStatus", false);
        //     })

        //     return;
        // }

        // if (this.end <= this.animals.length) {
        // this.animals = this.animals.concat(this.animalData.slice(this.start, this.end))
        
            this.$store.dispatch("changeLodingStatus", true);

            axios.get(
                '/animals/'
            ).then(response =>{
                
                // this.items = response.data.documents
                console.log("********get api")
                console.log(response)
                console.log(response.data)
                this.animals = this.animals.concat(response.data)
                // console.log(response.data)
                // console.log(response.data[0].Id)
                // this.items = response.data
                this.$store.dispatch("changeLodingStatus", false);
            }).catch(error => {
                console.log(error)
                this.$store.dispatch("changeLodingStatus", false);
            })

            this.start = this.start + 40
            this.end = this.end + 40
        // }
    }
  },
  directives: {
    // hello : {
    //     bind: function(el, binding) {
    //         console.log('bind')
    //         el.style.color = "red";
    //         el.style.fontSize = binding.value.fontSize;
    //         el.style.color = binding.value.color;
    //         el.style.border = binding.arg;
    //         if (binding.modifiers.shadow) {
    //             el.style.boxShadow = "0 3px 3px black";
    //         }
    //         if (binding.modifiers.textShadow) {
    //             el.style.textShadow = "0 3px 3px black";
    //         }
    //     },
    //     inserted: function() {
    //         console.log('inserted')
    //     },
    //     update: function() {
    //         console.log('update')
    //     },
    //     componentUpdated: function() {
    //         console.log('componentUpdated')
    //     },
    //     unbind: function() {
    //         console.log('unbind')
    //     },
    // },
    animalscroll : {
        inserted: function(el, binding) {
            let f = function(evt) {
                if (binding.value(evt, el)) {
                    window.removeEventListener('scroll', f)
                }
            }
            window.addEventListener('scroll', f)
        }

    }
  }
};

// Vue.directive('example',{
//   bind: function(el, binding) {
//     console.log(el)
//     console.log(binding)
//     console.log('bind')
//   },
//   inserted: function(el, binding) {
//     console.log(el)
//     console.log(binding)
//     console.log('inserted')
//   },
//   update: function(el, binding) {
//       console.log(el)
//     console.log(binding)
//     console.log('update')
//   },
//   componentUpdated: function(el, binding) {
//       console.log(el)
//     console.log(binding)
//     console.log('componentUpdated')
//   },
//   unbind: function(el, binding) {
//       console.log(el)
//     console.log(binding)
//     console.log('unbind')
//   },
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
