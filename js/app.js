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
    var list = document.getElementById('firstAndPike');
    var newLi;
    var text;
    for (var i = 0; i < this.hourlyTotals.length; i++) {
      text = times[i] + ': ' + this.hourlyTotals[i];
      newLi = document.createElement('li');
      newLi.textContent = text;
      list.appendChild(newLi);
    }
  }
};

firstAndPike.displayTotals();
