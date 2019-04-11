var socket = io.connect('http://localhost:3000'); //connect to server
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
    labels: [],
    datasets: [{
        label: "Húmedad",
        borderColor: "#FF5733",
        data: [],
        fill: false,
        pointStyle: 'circle',
        backgroundColor: '#3498DB',
        pointRadius: 5,
        pointHoverRadius: 7,
        lineTension: 0,
    }]
    },
    // Configuration options go here
    options: {}

});
socket.on('temp', (data) => { //As a temp data is received
    console.log(data.temp);
    if(chart.data.labels.length != 15) { //If we have less than 15 data points in the graph
        chart.data.labels.push(data.time);  //Add time in x-asix
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data.temp); //Add temp in y-axis
        });
    }
    else { //If there are already 15 data points in the graph.
        chart.data.labels.shift(); //Remove first time data
        chart.data.labels.push(data.time); //Insert latest time data
        chart.data.datasets.forEach((dataset) => {
            dataset.data.shift(); //Remove first temp data
            dataset.data.push(data.temp); //Insert latest temp data
        });
    }
    chart.update(); //Update the graph.
});
