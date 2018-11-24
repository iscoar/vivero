var Vue = require('vue/dist/vue.js')

Vue.component('card-widget', require('./components/widgets/CardWidget.vue'));
Vue.component('card-stats-widget', require('./components/widgets/CardStatsWidget.vue'));

const app = new Vue({
    el: '#app'
});

var moment = require('moment');
require("moment/locale/es");
moment.locale('es');
const showDate = () => {
    var s = moment().format('LL');
    var t = moment().format('LTS');
    document.getElementById('date').innerHTML = s;
    document.getElementById('time').innerHTML = t;
}
showDate();
setInterval(showDate, 250);