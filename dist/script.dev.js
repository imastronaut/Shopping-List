"use strict";

var itemForm = document.getElementById('item-form');
var itemInput = document.getElementById('item-input');
var itemList = document.getElementById('item-list');
var itemFilter = document.getElementById('filter');
var clearBtn = document.getElementById('clear');
var formBtn = itemForm.querySelector('button');
var isEditMode = false;

function displayItems() {
  var itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(function (item) {
    return addItemToDom(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  newItem = itemInput.value; //Validate Input

  if (newItem === '') {
    alert("Please add an item");
    return;
  } //Check for Editmode


  if (isEditMode) {
    var itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    console.log(newItem);
    console.log(checkIfItemExists(newItem));

    if (checkIfItemExists(newItem)) {
      alert("That item already exists");
      return;
    }
  } //Create item dom element


  addItemToDom(newItem); //Add item to storage

  addItemToStorage(newItem);
  checkUI();
  itemInput.value = '';
}

function addItemToDom(item) {
  var li = document.createElement('li');
  li.append(document.createTextNode(item));
  var button = createButton('remove-item btn-link text-red');
  var icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  li.append(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  var itemsFromStorage = getItemsFromStorage();

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  } //Add new item to array


  itemsFromStorage.push(item); //Convert to JSON string and set to local storage

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  var itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
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
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  var itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  itemList.querySelectorAll('li').forEach(function (i) {
    return i.classList.remove('edit-mode');
  });
  isEditMode = true;
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    //Remove item from DOM
    item.remove(); //Remove item from Storage

    removeItemFromStorage(item.textContent);
  }

  checkUI();
}

function removeItemFromStorage(item) {
  var itemsFromStorage = getItemsFromStorage(); //Filter out item to be removed

  itemsFromStorage = itemsFromStorage.filter(function (i) {
    return i != item;
  });
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAll(e) {
  // itemList.innerHTML = '';
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  } //Clear from local storage


  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e) {
  var items = itemList.querySelectorAll('li');
  var text = e.target.value.toLowerCase();
  items.forEach(function (item) {
    var itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  itemInput.value = '';
  var items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  isEditMode = false;
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
  formBtn.style.backgroundColor = '#333';
} //Initialize app


function init() {
  //EventListeners
  // console.log(itemList)
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearAll);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();
//# sourceMappingURL=script.dev.js.map
