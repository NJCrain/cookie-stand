'use strict';

var times = [
  '6AM',
  '7AM',
  '8AM',
  '9AM',
  '10AM',
  '11AM',
  '12PM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
  '7PM',
  '8PM'
];

var newRow;
var row;
var newCell;
var text;

var hourlyTotals = [];
for (i = 0; i < times.length; i++) {
  hourlyTotals[i] = 0;
}

var Store = function(min, max, avg, name) {
  this.name = name;
  this.customerMin = min;
  this.customerMax = max;
  this.avgCookies = avg;
  this.hourlySales = [];
  Store.stores.push(this);
};

Store.stores = [];

Store.prototype.customers = function() {
  return (
    Math.floor(Math.random() * (this.customerMax - this.customerMin + 1)) +
    this.customerMin
  );
};

Store.prototype.cookies = function() {
  for (var i = 0; i < times.length; i++) {
    this.hourlySales[i] = Math.floor(this.customers() * this.avgCookies);
  }
};

Store.prototype.render = function() {
  this.cookies();
  var storeTotal = 0;
  var body = document.querySelector('tbody');
  newRow = document.createElement('tr');
  body.appendChild(newRow);
  row = body.lastChild;
  newCell = document.createElement('th');
  text = document.createTextNode(this.name);
  newCell.appendChild(text);
  row.appendChild(newCell);
  for (var i = 0; i < this.hourlySales.length; i++) {
    storeTotal += this.hourlySales[i];
    hourlyTotals[i] = (this.hourlySales[i]) + (hourlyTotals[i]);
    text = document.createTextNode(this.hourlySales[i]);
    newCell = document.createElement('td');
    newCell.appendChild(text);
    row.appendChild(newCell);
  }
  newCell = document.createElement('td');
  text = document.createTextNode(storeTotal);
  newCell.appendChild(text);
  row.appendChild(newCell);
};

new Store(23, 65, 6.3, 'First And Pike');
new Store(3, 24, 1.2, 'Seatac Airport');
new Store(11, 38, 3.7, 'Seattle Center');
new Store(20, 38, 2.3, 'Capitol Hill');
new Store(2, 16, 4.6, 'Alki');

function createHeader() {
  var head = document.querySelector('thead');
  newRow = document.createElement('tr');
  head.appendChild(newRow);
  row = head.lastChild;
  newCell = document.createElement('th');
  row.appendChild(newCell);

  for (var i = 0; i < times.length; i++) {
    newCell = document.createElement('th');
    text = document.createTextNode(times[i]);
    newCell.appendChild(text);
    row.appendChild(newCell);
  }

  newCell = document.createElement('th');
  text = document.createTextNode('Total');
  newCell.appendChild(text);
  row.appendChild(newCell);
}

function createFooter() {
  var foot = document.querySelector('tfoot');
  newRow = document.createElement('tr');
  foot.appendChild(newRow);
  row = foot.lastChild;
  newCell = document.createElement('th');
  text = document.createTextNode('Totals');
  newCell.appendChild(text);
  row.appendChild(newCell);
  for (var i = 0; i < hourlyTotals.length; i++) {
    newCell = document.createElement('td');
    text = document.createTextNode(hourlyTotals[i]);
    newCell.appendChild(text);
    row.appendChild(newCell);
  }
}
createHeader();
for (var i = 0; i < Store.stores.length; i++) {
  Store.stores[i].render();
}
createFooter();
