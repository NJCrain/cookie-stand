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

var Store = function(min, max, avg, name) {
  this.name = name;
  this.customerMin = min;
  this.customerMax = max;
  this.avgCookies = avg;
  this.hourlyTotals = [];
};

Store.prototype.customers = function() {
  return Math.floor(Math.random() * (this.customerMax - this.customerMin +1)) + this.customerMin;
};

Store.prototype.cookies = function() {
  for (var i = 0; i < times.length; i++) {
    this.hourlyTotals[i] = Math.floor(this.customers() * this.avgCookies);
  }
};

Store.prototype.render = function() {
  this.cookies();
  var storeTotal = 0;
  var list = document.getElementById(this.name);
  var newLi;
  var text;
  for (var i = 0; i < this.hourlyTotals.length; i++) {
    storeTotal += this.hourlyTotals[i];
    text = times[i] + ': ' + this.hourlyTotals[i];
    newLi = document.createElement('li');
    newLi.textContent = text;
    list.appendChild(newLi);
  }
  newLi = document.createElement('li');
  newLi.textContent = 'Total: ' + storeTotal;
  list.appendChild(newLi);
};

var firstAndPike = new Store(23, 65, 6.3, 'firstAndPike');
var seatacAirport = new Store(3, 24, 1.2, 'seatacAirport');
var seattleCenter = new Store(11, 38, 3.7, 'seattleCenter');
var capitolHill = new Store(20, 38, 2.3, 'capitolHill');
var alki = new Store(2, 16, 4.6, 'alki');
firstAndPike.render();
seatacAirport.render();
seattleCenter.render();
capitolHill.render();
alki.render();
