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

var Store = function(min, max, avg, name) {
  this.name = name;
  this.customerMin = min;
  this.customerMax = max;
  this.avgCookies = avg;
  this.hourlyTotals = [];
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
    this.hourlyTotals[i] = Math.floor(this.customers() * this.avgCookies);
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
  for (var i = 0; i < this.hourlyTotals.length; i++) {
    storeTotal += this.hourlyTotals[i];
    row = body.lastChild;
    text = document.createTextNode(this.hourlyTotals[i]);
    newCell = document.createElement('td');
    newCell.appendChild(text)
  }
};

var firstAndPike = new Store(23, 65, 6.3, 'First And Pike');
var seatacAirport = new Store(3, 24, 1.2, 'Seatac Airport');
var seattleCenter = new Store(11, 38, 3.7, 'Seattle Center');
var capitolHill = new Store(20, 38, 2.3, 'Capitol Hill');
var alki = new Store(2, 16, 4.6, 'Alki');

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

firstAndPike.render();
seatacAirport.render();
seattleCenter.render();
capitolHill.render();
alki.render();
