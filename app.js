const addInput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todoList = document.querySelector(".list-group");
const cardBody = document.querySelector(".card-body");
const clearButton = document.querySelector("#clearButton");

let todos = [];

runEvents();


function runEvents() {
	form.addEventListener("submit" ,addTodo);
	document.addEventListener("DOMContentLoaded", loaded);
}

function addTodo(e) {
	const inputText = addInput.value.trim();
if(inputText==null || inputText ==""){
	alert("Değer giriniz.");
}else {
	addTodoToUI(inputText); //* arayüze ekleme
	addTodoToStorage(inputText); //* storageye ekle
	showAlert("success","Todo başarıyla eklendi.");
	
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

function addTodoToStorage(newTodo){
	checkTodoFromStorage();
	todos.push(newTodo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodoFromStorage(){
 if(localStorage.getItem("todos")=== null) {
	todos = [];
 }else {
	todos = JSON.parse(localStorage.getItem("todos"));
 }
}

function showAlert(type,message) {
// 	       <div class="alert alert-primary" role="alert">
//   A simple primary alert—check it out!
// </div>
const div = document.createElement("div");
div.className= `alert alert-${type}`;
div.textContent= message;

form.appendChild(div);

setTimeout(() => {
	div.remove();
}, 1500);
}

function loaded(){
	// sayfa yüklendiğinde storagedeki değerler arayüzde görünecek
	checkTodoFromStorage();
	todos.forEach(function(todo){
		addTodoToUI(todo);
	})
}