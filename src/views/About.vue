<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"></loading>
    <label><input type="checkbox" v-model="fullPage">Full page?</label>
    <button @click.prevent="doAjax">fetch Data</button>
    <v-btn v-on:click="openModal">Click</v-btn>
    <Modal v-show="showContent" v-on:from-child="closeModal">スロットを使ったメッセージ</Modal>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Modal from '../components/ModalWindow'


export default {
  data() {
    return {
    isLoading: false,
    fullPage: true,
    showContent:false,
    title: 'My Title'
    }
  },
  head: {
    title() {
      return {
        inner: 'TTTOOTT',
        separator: '|',
        complement: 'DKOSDK',
      }
    },
    meta: [
    { name: 'description', content: 'descriptionの内容が入ります。' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
    { charset: 'utf-8' },
    { property: 'og:type', content: 'website' },
    // ... 
  ],
  },
  
  components: {
    "loading":Loading,
    "Modal":Modal
  },
  methods: {
    doAjax:function() {
      let self = this;    
      self.isLoading = true;
      // simulate AJAX
      setTimeout(function(){
        self.isLoading = false;
        console.log('load off');
      }, 1000);
    },
    onCancel:function() {
      console.log('User cancelled the loader.')
    },
    openModal: function(){
        this.showContent = true
    },
    closeModal: function(){
        this.showContent = false
    }
  }
}
</script>

