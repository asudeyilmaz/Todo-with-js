const addInput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todoList = document.querySelector(".list-group");
const cardBody = document.querySelector(".card-body");
const clearButton = document.querySelector("#clearButton");


runEvents();

function runEvents() {
	form.addEventListener("submit" ,addTodo);
}

function addTodo(e) {
	const inputText = addInput.value.trim();
if(inputText==null || inputText ==""){
	alert("Değer giriniz.");
}else {
	addTodoToUI(inputText); //* arayüzze ekleme
	
}
	e.preventDefault();
}


function addTodoToUI(newtodo) {
	 /* <li class="list-group-item d-flex justify-content-between align-items-center">
                Örnek Todo
                <a href="#" class="text-danger">
                  <i class="fa fa-trash"></i>
                </a>
              </li> */

const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between align-items-center";
li.textContent= newtodo;

const a = document.createElement("a");
a.className = "text-danger";
a.href = "#";

const i = document.createElement("i");
i.className= "fa fa-trash";

a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);


addInput.value= "";

			  
}