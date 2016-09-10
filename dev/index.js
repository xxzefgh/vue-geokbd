import Vue from 'vue'
import geokbd from '../src/index.js'

Vue.use(geokbd, {
  enabled: true
});

new Vue({
  el: '#app',

  data: function () {
    return {
      inputText: '',
    }
  }
});
