<template>

<v-container>
    <Loading/>
    <v-form>
    <v-text-field
        v-model="name"
        :rules="rules"
        counter="25"
        hint="This field uses counter prop"
        label="名前"
    ></v-text-field>
    <v-textarea
        v-model="comment"
        outlined
        name="input-7-4"
        label="コメント"
    ></v-textarea>
    <v-btn
        @click="createComment"
        depressed
        elevation="4"
        outlined
        plain
    >投稿</v-btn>
    </v-form>
    <v-list three-line>     
      <template v-for="(item) in items">
        <!-- <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader> -->

        <!-- <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider> -->

        <v-list-item :key="item.name">
          <!-- <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title v-html="item.fields.name.stringValue"></v-list-item-title>
            <v-list-item-subtitle v-html="item.fields.comment.stringValue"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
</v-container>
</template>


<script>
import axios from '../axios-store'

export default {
data () {
    return {
        name:"",
        comment:"",
        title: 'Preliminary report',
        description: 'California is a state in the western United States',
        rules: [v => v.length <= 25 || 'Max 25 characters'],
        //wordsRules: [v => v.trim().split(' ').length <= 5 || 'Max 5 words'],
        items: []
    }
},

created(){
    this.refleshComment()
},
computed:{
    tokenId(){
        return this.$store.getters.idToken;
    }
},
methods:{
    refleshComment(){

        this.$store.dispatch("changeLodingStatus", true);

        axios.get(
            '/projects/my-address-pj-521d1/databases/(default)/documents/comments'
            ,{
                headers:{
                    Authorization: `Bearer ${this.tokenId}`    
                }
            }
        ).then(response =>{
            
            this.items = response.data.documents
            this.$store.dispatch("changeLodingStatus", false);
        }).catch(error => {
            console.log(error)
            this.$store.dispatch("changeLodingStatus", false);
        })
    },
    createComment(){
        
        //alert("push post")
        this.$store.dispatch("changeLodingStatus", true);

        if(!this.name || !this.comment){
            
            return
        }

        axios.post('/projects/my-address-pj-521d1/databases/(default)/documents/comments',
        {
            fields:{
                name:{
                    stringValue:this.name
                },
                comment:{
                    stringValue:this.comment
                }              
            }
        },
        {
                headers:{
                    Authorization: `Bearer ${this.tokenId}`    
                }
        }
        
        ).then(response => {
            console.log(response)
            this.$store.dispatch("changeLodingStatus", false);
            this.refleshComment()
            //this.$router.push({name:'Login'})
            this.name = ''
            this.comment = ''
        }).catch(error => {
            console.log(error)
            this.$store.dispatch("changeLodingStatus", false);
        })
    },
}
}
</script>

<style scoped>
.v-list {
  height: 300px;
  overflow-y: auto;
}
</style>