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

var firstAndPike = {
  customerMin: 23,
  customerMax: 65,
  avgCookies: 6.3,
  hourlyTotals: [],

  customers: function() {
    var min = Math.ceil(this.customerMin);
    var max = Math.floor(this.customerMax);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  cookies: function() {
    for (var i = 0; i < times.length; i++) {
      this.hourlyTotals[i] = Math.round(this.customers() * this.avgCookies);
    }
  },

  displayTotals: function() {
    this.cookies();
    var storeTotal = 0;
    var list = document.getElementById('firstAndPike');
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
  }
};

var seatacAirport = {
  customerMin: 3,
  customerMax: 24,
  avgCookies: 1.2,
  hourlyTotals: [],

  customers: function() {
    var min = Math.ceil(this.customerMin);
    var max = Math.floor(this.customerMax);

    return Math.floor(Math.random() * (max - min +1)) + min;
  },

  cookies: function() {
    for(var i = 0; i < times.length; i++) {
      this.hourlyTotals[i] = Math.round(this.customers() * this.avgCookies);
    }
  },

  displayTotals: function() {
    this.cookies();
    var storeTotal = 0;
    var list = document.getElementById('seatacAirport');
    var newLi;

    for(var i = 0; i < this.hourlyTotals.length; i++) {
      storeTotal += this.hourlyTotals[i];
      newLi = document.createElement('li');
      newLi.textContent = times[i] + ': ' + this.hourlyTotals[i];
      list.appendChild(newLi);
    }
    newLi = document.createElement('li');
    newLi.textContent = 'Total: ' + storeTotal;
    list.appendChild(newLi);
  }
};

firstAndPike.displayTotals();
seatacAirport.displayTotals();
