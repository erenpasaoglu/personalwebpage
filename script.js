// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//load items
loadItems();

// call event listeners 
EventListeners();

function EventListeners(){
    //submit event
    form.addEventListener('submit',addNewItem);

    //delete an item
    taskList.addEventListener('click',deleteItem);

    //delete all
    btnDeleteAll.addEventListener('click',deleteAllItems);
}

function loadItems(){

    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    })
}

//get items from local storage
function getItemsFromLS(){
    if(localStorage.getItem('items') == null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//set items from local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

//delete item from ls
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

//create item
function createItem(text){
    //create li
    const li = document.createElement('li');
    li.className='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement('a');
    a.className='delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML='<i class="fas fa-times"></i>'

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
}

//add new item
function addNewItem(e){
    if(input.value === ''){
        alert('Lütfen yorum ekleyiniz.');
    }

    // create item
    createItem(input.value);

    //save to LS
    setItemToLS(input.value);

    // clear input, yazdıktan sonra kutuyu temizlemek için
    input.value='';

    e.preventDefault();
}

//delete an item
function deleteItem(e){
    if(e.target.className === 'fas fa-times'){
        if(confirm('Emin misiniz?')){
            if(e.target.className==='fas fa-times'){
                e.target.parentElement.parentElement.remove();
            }

            //delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }

    e.preventDefault();
}

function deleteAllItems(e){

    if(confirm('Emin misiniz?')){

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();

    }

    e.preventDefault();
}