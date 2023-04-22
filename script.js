const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');

const itemList = document.getElementById('item-list');


function addItem(e){
    e.preventDefault();

    newItem = itemInput.value;

    //Validate Input
    if(newItem === ''){

        alert("Please add an item");
        return ;
    }

    const li = document.createElement('li');
    li.append(document.createTextNode(newItem));
    

    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.append(button);
    itemList.appendChild(li);
    itemInput.value = '';

}
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


//EventListeners
itemForm.addEventListener('submit',addItem);