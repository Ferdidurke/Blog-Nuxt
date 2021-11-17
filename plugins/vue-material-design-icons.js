import Vue from 'vue';
import 'vue-material-design-icons/styles.css';
import ArrowUp from 'vue-material-design-icons/ArrowUp.vue'
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue'
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import ChevronDoubleDown from 'vue-material-design-icons/ChevronDoubleDown.vue'


export default function materialIcons() {
  Vue.component('ArrowUp', ArrowUp);
  Vue.component('ArrowDown', ArrowDown);
  Vue.component('ArrowLeft', ArrowLeft);
  Vue.component('ArrowRight', ArrowRight);
  Vue.component('Delete', Delete);
  Vue.component('ChevronDoubleDown', ChevronDoubleDown);

}
