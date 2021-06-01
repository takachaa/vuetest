<template>
  <transition>
  <!-- overlay「薄暗い背景」をおしても閉じるようにする-->
  <div id="overlay" v-on:click="clickEvent">
      <!-- stopEventでメッセージ部分についてはクリックしても閉じないようにしている-->    
      <div id="content" v-on:click="stopEvent">
          <p><slot></slot></p>
          <v-btn v-on:click="clickEvent">close</v-btn>
      </div>
      
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
   
    }
  },
  methods :{
    clickEvent: function(){
      this.$emit('from-child')
     },
     stopEvent: function(event){
      event.stopPropagation()
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

.v-leave-active,
.v-enter-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
