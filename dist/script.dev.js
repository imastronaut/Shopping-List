"use strict";

var itemForm = document.getElementById('item-form');
var itemInput = document.getElementById('item-input');
var itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();
  newItem = itemInput.value; //Validate Input

  if (newItem === '') {
    alert("Please add an item");
    return;
  }

  var li = document.createElement('li');
  li.append(document.createTextNode(newItem));
  var button = createButton('remove-item btn-link text-red');
  var icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  li.append(button);
  itemList.appendChild(li);
  itemInput.value = '';
}

function createButton(classes) {
  var button = document.createElement('button');
  button.className = classes;
  return button;
}

function createIcon(classes) {
  var icon = document.createElement('i');
  icon.className = classes;
  return icon;
} //EventListeners


itemForm.addEventListener('submit', addItem);
//# sourceMappingURL=script.dev.js.map
