var Vue = require('vue/dist/vue.js')

Vue.component('card-widget', require('./components/widgets/CardWidget.vue'));
Vue.component('card-stats-widget', require('./components/widgets/CardStatsWidget.vue'));
Vue.component('modal-widget', require('./components/widgets/ModalWidget.vue'));

const app = new Vue({
    el: '#app',
    data: {
        humedad: null,
        correctos: localStorage.getItem('aprobado') ? parseInt( localStorage.getItem('aprobado') ) : 0,
        incorrectos: localStorage.getItem('denegado') ? parseInt( localStorage.getItem('denegado') ) : 0,
        socket: io.connect('http://localhost:3000'),
    },
    mounted() {
        this.socket.on('temp', (data) => {
            this.humedad = data.temp;
        });
        this.socket.on('gas', data => {
        	if (data.gas != 0 || data.gas != null || data.gas != undefined)
        		$('#myModalGas').modal('toggle')
        	else
        		$('#myModalGas').modal('show')
        });
        this.socket.on('key', data => {
            console.log(data);
        	if (data.acceso == 1) {
                let acceso = localStorage.getItem('aprobado');
                if(!acceso){
                    acceso = 1;
                    localStorage.setItem('aprobado', acceso);
                } else {
                    acceso = parseInt(acceso);
                    acceso++;
                    localStorage.setItem('aprobado', acceso);
                }
                acceso = parseInt(acceso);
                this.correctos = acceso;
        	} else if(data.acceso == 0) {
        		let acceso = localStorage.getItem('denegado');
                if(!acceso){
                    acceso = 1;
                    localStorage.setItem('denegado', acceso);
                } else {
                    acceso = parseInt(acceso);
                    acceso++;
                    localStorage.setItem('denegado', acceso);
                }
                acceso = parseInt(acceso);
                this.incorrectos = acceso;
        	}
        })
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