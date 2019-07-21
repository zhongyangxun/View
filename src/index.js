import View from './js/view.js';
import './css/main.css';

let view = new View({
  el: '#app',
  data: {
    title: 'View',
    name: 'Hedgehog'
  },
  methods: {
    clickMe() {
      alert('Hello!');
    }
  }
});
