# vue-geokbd - Vue.js georgian keyboard directive

Simple directive to convert english characters to georgian in `<input>` and `<textarea>` fields

[Demo](https://ns-uaomluarir.now.sh/)

### Installation

#### Bower
```bash
bower install vue-geokbd --save
```

#### NPM
```bash
npm install vue-geokbd --save
```

### Getting Started

#### Styling
You can import styles from ```dist/css/vue-geokbd.min.css``` however you want.
If you aren't happy with default styling, copy ```dist/css/vue-geokbd.css``` and adjust it to your needs.

#### Loading & Initializing
##### HTML
```html
<script src="path_to_components/vue-geokbd/dist/js/vue-geokbd.min.js"></script>
<script>
    // Vue object should be available here, see example.html for proper usage
    Vue.use(window['vue-geokbd']);
</script>
```

##### ES6 Modules
```js
import Vue from 'vue';
import geokbd from 'vue-geokbd';

Vue.use(geokbd);
```

#### Usage
Apply `v-geokbd` directive to either `<input>` or `<textarea>`
```html
<input type="text" v-geokbd>
<textarea v-geokbd></textarea>
```

#### Options
You can pass initialization options like this
```js
// These options are default
Vue.use(geokbd, {
    // Enable conversion by default, until user switches on/off state
    enabled: false,
    // Global on/off state switcher hotkey
    hotkey: '~',
    // Show status message when focus is on element
    statusMessage: true
});
```
