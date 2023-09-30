
function makeTime() {
  var table = document.createElement('table');
  table.classList.add('time');
  for (let i = 0; i < 25; i++) {
    var tr = document.createElement('tr');
    if (i == 0) {
      var th = document.createElement('th');
      timeSelector = document.createElement('input');
      timeSelector.setAttribute('id', 'timeSelector');
      timeSelector.type = 'date';
      timeSelector.addEventListener('change', dot);
      th.appendChild(timeSelector);
      tr.appendChild(th);
    } else {
    var td = document.createElement('td');
    td.textContent = 24 - i + ':00';
    tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.getElementsByClassName('table')[0].appendChild(table);
};

function makeTable(keyList) {
  var table = document.createElement('table');
  for (let i = 0; i < 25; i++) {
    var tr = document.createElement('tr');
    for (let j = 0; j < keyList.length; j++) {
      if (i == 0) {
        var th = document.createElement('th');
        th.textContent = keyList[j];
        tr.appendChild(th);
      } else {
      var td = document.createElement('td');
      tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  }
  document.getElementsByClassName('table')[0].appendChild(table);
};

function dot() {
  var timeSelector = document.getElementById('timeSelector');
  var now = Math.floor(timeSelector.valueAsDate.getTime()/1000);
  console.log(now);
  // for (let i = 0; i < Object.keys(timeElement).length; i++) {
    
  // }
}

const url = "http://localhost:3000/json";
var timeData;

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    timeData = data;
    makeTime();
    makeTable(Object.keys(timeData));
    var timeElement = document.getElementsByClassName('time')[0];
    window.addEventListener('scroll', _handleScroll, false);
    function _handleScroll() {
      timeElement.style.top = 8 - window.scrollY + 'px';
}
  })