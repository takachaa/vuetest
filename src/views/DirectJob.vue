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
    <v-text-field
        v-model="email"
        :rules="rules"
        counter="25"
        hint="This field uses counter prop"
        label="メールアドレス"
    ></v-text-field>
    <v-btn
        @click="createComment"
        depressed
        elevation="4"
        outlined
        plain
    >POSTテスト</v-btn>
    <v-btn
        @click="putTest"
        depressed
        elevation="4"
        outlined
        plain
    >PUTテスト</v-btn>
    <v-btn
        @click="deleteTest"
        depressed
        elevation="4"
        outlined
        plain
    >DELETEテスト</v-btn>
    </v-form>
    <v-list three-line>     
      <template v-for="(item) in items">
        <v-list-item :key="item.Id">

          <v-list-item-content>
            <v-list-item-title v-html="item.Name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.Email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
</v-container>
</template>


<script>
// import axios from '../axios-store'
import axios from '../axios-directjob'


export default {
data () {
    return {
        name:"",
        email:"",
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
            '/users/'
        ).then(response =>{
            
            // this.items = response.data.documents
            console.log(response)
            console.log(response.data)
            console.log(response.data[0].Id)
            this.items = response.data
            this.$store.dispatch("changeLodingStatus", false);
        }).catch(error => {
            console.log(error)
            this.$store.dispatch("changeLodingStatus", false);
        })
    },
    createComment(){
        
        // let prop = {
        //     first: 'Bob',
        //     last: 'Smith'
        // }

        //alert("push post")
        this.$store.dispatch("changeLodingStatus", true);

        // fetch("https://localhost:44358/api/users",{ //URL
		// 	method:"POST", //POSTを指定
		// 	body: JSON.stringify('ss'),  //16行目で取得したデータ
        //     headers: {
        //     // 'Content-Type': 'application/json'
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     },
		// })
		// .then(function(response1) { //成功時に実行される
		// 	console.log("status=" + response1.status); //status=200
		// 	return response1.json();
		// })
		// .then(function(data1) { //成功時に実行される
		// 	console.log(JSON.stringify(data1)); //JSONを出力
		// })
		// .catch(function(err1) { //失敗時に実行される
		// 	console.log("err=" + err1);
		// });

        // let params = new URLSearchParams();
        // params.append('text', 'テストだよー');
        
        axios.post('/Users/',
        //JSON.stringify(prop)
        //params
        {
            Name : this.name, 
            Email : this.email
            // fields:{
            //     name:{
            //         stringValue:this.name
            //     },
            //     email:{
            //         stringValue:this.email
            //     }              
            // }

            // data:{
            //     name:this.name,
            //     email:this.email
            // }
        }

        // }
        ,{ headers: { 'content-type': 'application/json' } }
        // ,{
        //     headers:{
        //         Authorization: `Bearer ${this.tokenId}` 
        //     }
        // }
        ).then(response => {
            console.log('*****POST成功')
            console.log(response)
            this.$store.dispatch("changeLodingStatus", false);
            this.refleshComment()
            //this.$router.push({name:'Login'})
            this.name = ''
            this.comment = ''
        }).catch(error => {
            console.log('*****POST失敗')
            console.log(error)
            this.$store.dispatch("changeLodingStatus", false);
        })
    },
    putTest(){

        this.$store.dispatch("changeLodingStatus", true);

        const id = '1';
        const modify = { Name: 'hoge' };
        axios
            .put('/Users/' + id, modify

            ,{ headers: { 'content-type': 'application/json' } }
            
            )
            .then(res => {
                console.log(res)
                this.$store.dispatch("changeLodingStatus", false);
                console.log("「" + modify.Name + "」更新完了");
                // this.$router.push({path: '/articles/list'});
            })
            .catch(error => {
                this.$store.dispatch("changeLodingStatus", false);
                console.log("「" + modify.Name + "」更新失敗");
                console.log(error, id, modify);
            });
    },
    deleteTest(){
        
        this.$store.dispatch("changeLodingStatus", true);

        const id = '10';
        const params = { Name: 'Taro' };
        axios
            .delete('/Users/' + id, {data: params})
            //.delete('/Users/' + id, params)
            .then(res => {
                console.log(res)
                this.$store.dispatch("changeLodingStatus", false);
                console.log("********then結果***********")
                console.log("「" + params.Name + "」削除成功")
                // alert("「" + params.Name + "」削除成功");
                // this.$router.push({path: '/sample/list'});
            })
            .catch(error => {
                this.$store.dispatch("changeLodingStatus", false);
                console.log("********catch結果***********")
                console.log("「" + params.Name + "」削除失敗")
                // alert("「" + params.Name + "」削除失敗");
                console.log(error, id, params);
            });
    }
}
}
</script>

<style scoped>
.v-list {
  height: 300px;
  overflow-y: auto;
}
</style>