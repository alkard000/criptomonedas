export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year + ' '
  return time;
}


//AGREGANDO LOS VALORES A LA GRAFICA
export function addData(chart, label, datos) {
  chart.data.labels[0] = label[0];
  chart.data.datasets[0].data[0] = datos[0];

  chart.data.labels[1] = label[1];
  chart.data.datasets[0].data[1] = datos[1];

  chart.data.labels[2] = label[2];
  chart.data.datasets[0].data[2] = datos[2];

  chart.data.labels[3] = label[3];
  chart.data.datasets[0].data[3] = datos[3];

  chart.data.labels[4] = label[4];
  chart.data.datasets[0].data[4] = datos[4];

  chart.data.labels[5] = label[5];
  chart.data.datasets[0].data[5] = datos[5];

  chart.data.labels[6] = label[6];
  chart.data.datasets[0].data[6] = datos[6];

  chart.data.labels[7] = label[7];
  chart.data.datasets[0].data[7] = datos[7];

  chart.data.labels[8] = label[8];
  chart.data.datasets[0].data[8] = datos[8];

  chart.data.labels[9] = label[9];
  chart.data.datasets[0].data[9] = datos[9];

  chart.data.labels[10] = label[10];
  chart.data.datasets[0].data[10] = datos[10];

  chart.update();
}