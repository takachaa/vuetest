<template>
<v-row justify="center">
    <v-col sm="12" md="11" lg="9" xl="6">
      <v-sheet class="pa-3">
        <h1>アップロードプレビューデモ</h1>
        <v-form ref="form">
          <!-- <video v-if="uploadVideoUrl" controls>
            <source :src="uploadVideoUrl" />
            このブラウザではビデオ表示がサポートされていません
          </video> -->
          <video v-for="(item, index) in uploadVideoUrl" :key="`first-${index}`" controls>
            <source :src="item" />
            このブラウザではビデオ表示がサポートされていません
          </video>
          <v-file-input
            v-model="input_video"
            accept="video/*"
            show-size
            label="動画ファイルをアップロードしてください"
            prepend-icon="mdi-video"
            @change="onVideoPicked" 
            id="test2"
            multiple="multiple" 
          ></v-file-input>
          <!-- <img v-if="uploadImageUrl" :src="uploadImageUrl" /> -->
          <div v-for="(item, index) in uploadImageUrl" :key="`second-${index}`">
            <img :src="item" />
          </div>
          <v-file-input
            v-model="input_image"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            @change="onImagePicked" 
            id="test" 
            multiple="multiple" 
          ></v-file-input>
          <v-btn @click="postImageFile">アップロード</v-btn>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
// import axios from '../axios-store'
// import axios from '../axios-directjob'
import axios from '../axios-photo'



export default {
  data() {
    return {
      input_video: null,
      input_image: null,
      uploadVideoUrl: [],
      uploadImageUrl: []
    }
  },
  methods: {

    onVideoPicked(files) {
        console.log(files)

        if(files.length === 0){
            this.uploadVideoUrl = []
            return;
        }

        files.forEach(file=>{
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                return
                }
                const fr = new FileReader()
                fr.readAsDataURL(file)
                fr.addEventListener('load', () => {
                    this.uploadVideoUrl.push(fr.result)
                })
            } else {
                // this.uploadVideoUrl = ''
            }
        })
    },

    onImagePicked(files) {
      console.log("onImagePicked")

      if(files.length === 0){
        this.uploadImageUrl = []
        return;
      }

      files.forEach(file=>{
        console.log(file)
        if (file !== undefined && file !== null) {
            if (file.name.lastIndexOf('.') <= 0) {
            return
            }
            const fr = new FileReader()
            fr.readAsDataURL(file)
            fr.addEventListener('load', () => {
                this.uploadImageUrl.push(fr.result)
            })
        } else {
            //this.uploadImageUrl = []
        }
      })
    },
    postImageFile(){

        //画像取得
        // const fileInput = document.getElementById('test');

        // const file = fileInput.files[0]
        // console.log(file)
        // console.log(file.name)


        // const files = fileInput.files;
        // console.log("**********")
        // console.log(files)

        // const fileInput2 = document.getElementById('test2')

        // const file2 = fileInput2.files[0]
        // console.log(file2)
        // console.log(file.name)


        



        const data = new FormData();
    
        //jsonを追加
        var obj = {
            Name: '太郎',
            Mail: 'takachaa@gmail.com',
        }
        var json = JSON.stringify(obj);
        data.append('tasks', json)
        
        //普通のbody要素を追加
        data.append("text1", "popop");
        
        //画像要素を追加
        var ins = document.getElementById('test').files.length;
        for (var x = 0; x < ins; x++) {
            data.append(`fileToUpload[${x}]`, document.getElementById('test').files[x]);
        }

        var ins2 = document.getElementById('test2').files.length;
        for (var y = 0; y < ins2; y++) {
            data.append(`MovieToUpload[${y}]`, document.getElementById('test2').files[y]);
        }

        this.$store.dispatch("changeLodingStatus", true);

        axios.post('/upload/', data, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        .then(res => {
            console.log(res)
            console.log('success')
            this.input_image = null
            this.input_video = null
            this.uploadVideoUrl = []
            this.uploadImageUrl = []
            this.$store.dispatch("changeLodingStatus", false);
        }).catch(error => {
            this.$store.dispatch("changeLodingStatus", false);
            console.log(error);
            new Error(error)
            
        });

        // axios.post('/upload/',
        // {
        //     Name : 'ken', 
        //     Email : 'do'
        // }
        // ,{ headers: { 'content-type': 'application/json' } }
        // ).then(response => {
        //     console.log('*****POST成功')
        //     console.log(response)
        //     this.$store.dispatch("changeLodingStatus", false);
        //     this.refleshComment()
        //     //this.$router.push({name:'Login'})
        //     this.name = ''
        //     this.comment = ''
        // }).catch(error => {
        //     console.log('*****POST失敗')
        //     console.log(error)
        //     this.$store.dispatch("changeLodingStatus", false);
        // })

        
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