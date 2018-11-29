var Vue = require('vue/dist/vue.js')

Vue.component('card-widget', require('./components/widgets/CardWidget.vue'));
Vue.component('card-stats-widget', require('./components/widgets/CardStatsWidget.vue'));
Vue.component('modal-widget', require('./components/widgets/ModalWidget.vue'));

const app = new Vue({
    el: '#app',
    data: {
        humedad: null,
        socket: io.connect('http://localhost:3000'),
    },
    mounted() {
        this.socket.on('temp', (data) => {
            this.humedad = this.dataToPorcentage(data.temp);
        });
        this.socket.on('gas', data => {
        	if (data.gas != 0 || data.gas != null || data.gas != undefined)
        		$('#myModalGas').modal('toggle')
        	else
        		$('#myModalGas').modal('show')
        });
        this.socket.on('acceso', data => {
        	if (data.acceso == 1) {

        	} else if(data.acceso == 0) {
        		
        	}
        })
    },
    methods: {
        dataToPorcentage(humedad) {
        	if (humedad) {
        		return 100 - ((humedad * 100) / 1023);	
        	} else {
        		return 0;
        	}
            
        }
    }
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