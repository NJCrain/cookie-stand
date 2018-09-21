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

//variables to be used later in multiple different function to render sections of the sales table
var newRow;
Store.stores = [];

var addNewStore = document.getElementById('addNewStore');

//fill an array with 0s to be equal in length to array of times
var hourlyTotals = [];
for (var i = 0; i < times.length; i++) {
  hourlyTotals[i] = 0;
}

// constructor function for stores that takes in a number for minimum customers, maximum customers, avg cookies per sale and a string value for the name of the store. Also indexs all objects in an array named stores.
function Store(min, max, avg, name) {
  this.name = name;
  this.customerMin = min;
  this.customerMax = max;
  this.avgCookies = avg;
  this.hourlySales = [];
  Store.stores.push(this);
}

//method for store objects to determine customers for an hour within the stores min and max range
Store.prototype.customers = function() {
  return (
    Math.floor(Math.random() * (this.customerMax - this.customerMin + 1)) +
    this.customerMin
  );
};

//method for store objects to calculate sales for every hour with a random number of customers and store the data in an array property of the object named hourlySales.
Store.prototype.cookies = function() {
  for (var i = 0; i < times.length; i++) {
    this.hourlySales[i] = Math.floor(this.customers() * this.avgCookies);
  }
};

/*method for store objects that will draw them into the table. First checks if the stores data has already been created. if not then it creates a new row in the table and adds a cell at the begginning that contains the name of the store as a 'th' element. Then proceeds to loop through the array of hourlySales and add each index to its own cell in the row. The loop also tracks total sales for that store in a day with the storeTotal variable and will update the array of hourlyTotals for the footer to use. After the loop is finished a final cell is added to the row that displays that stores total sales for the day*/
Store.prototype.render = function() {
  if (this.hourlySales.length === 0) {
    this.cookies();
    var body = document.querySelector('tbody');
    newRow = addElement('tr', '', body);
    addElement('th', this.name, newRow);
    var storeTotal = 0;
    for (var i = 0; i < this.hourlySales.length; i++) {
      storeTotal += this.hourlySales[i];
      addElement('td', this.hourlySales[i], newRow);
    }
    addElement('td', storeTotal, newRow);
  }
};

//create the pre-existing stores with the given data
new Store(23, 65, 6.3, 'First And Pike');
new Store(3, 24, 1.2, 'Seatac Airport');
new Store(11, 38, 3.7, 'Seattle Center');
new Store(20, 38, 2.3, 'Capitol Hill');
new Store(2, 16, 4.6, 'Alki');

//takes in 2 strings and a pointer to a DOM node to create a new child element with the given content and append it to the specified node.
function addElement(element, content, parent) {
  var newEl = document.createElement(element);
  var newContent = document.createTextNode(content);
  newEl.appendChild(newContent);
  parent.appendChild(newEl);
  return newEl;
}

/*function to create the header of the table of sales data. Creates a blank cell to start to give proper alignment with the store names. Then loops through the array of times to create cells for each hour. Finishes with creating a final cell for the totals section*/
function createHeader() {
  var head = document.querySelector('thead');
  newRow = addElement('tr', '', head);
  addElement('th', '', newRow);

  for (var i = 0; i < times.length; i++) {
    addElement('th', times[i], newRow);
  }

  addElement('th', 'Total', newRow);
}

function renderBody() {
  for (var i = 0; i < Store.stores.length; i++) {
    Store.stores[i].render();
  }
}

/*function to create the footer of the table. Starts with adding the first cell that reads Totals (for totals per hour across all stores). The loop goes through the hourlyTotals array that is updated with relevant data every time the Store.render method is called. Adds a new cell for each index while putting the value at that index as the cells text.*/
function createFooter() {
  var foot = document.querySelector('tfoot');
  foot.innerHTML = '';
  newRow = addElement('tr', '', foot);
  addElement('th', 'Totals', newRow);
  for (var i = 0; i < times.length; i++) {
    var hourTotal = 0;
    for (var j = 0; j < Store.stores.length; j++) {
      hourTotal += Store.stores[j].hourlySales[i];
    }
    addElement('td', hourTotal, newRow);
  }
}

/*when the submit event fires on the sales page, this will stop the button from causing a page refresh and take in the data entered into the form fields to create a new store object for it, render it onto the table, and recreate the footer to reflect the newly added values per hour */
function addStore(e) {
  e.preventDefault();
  var minCust = parseInt(e.target.minCust.value);
  var maxCust = parseInt(e.target.maxCust.value);
  var avgCookies = parseFloat(e.target.avgCookies.value);
  var storeName = e.target.storeName.value;

  new Store(minCust, maxCust, avgCookies, storeName);

  renderBody();
  createFooter();
}

addNewStore.addEventListener('submit', addStore);

createHeader();
renderBody();
createFooter();
