
function makeTime() {
  var table = document.createElement('table');
  table.classList.add('time');
  for (let i = 0; i < 25; i++) {
    var tr = document.createElement('tr');
    if (i == 0) {
      var th = document.createElement('th');
      timeSelector = document.createElement('input');
      timeSelector.type = 'date';
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

const url = "http://localhost:3000/json";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    makeTime();
    makeTable(Object.keys(data));
    var timeElement = document.getElementsByClassName('time')[0];
    window.addEventListener('scroll', _handleScroll, false);
    function _handleScroll() {
      timeElement.style.top = 8 - window.scrollY + 'px';
}
  })