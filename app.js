const addInput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todoList = document.querySelector(".list-group");
const cardBody = document.querySelector(".card-body");
const clearButton = document.querySelector("#clearButton");
const todoSearch = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loaded);
  todoList.addEventListener("click", removeTodo);
  clearButton.addEventListener("click" , allTodoRemove);
  todoSearch.addEventListener("keyup", filtrele);
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    alert("Değer giriniz.");
  } else {
    addTodoToUI(inputText); //* arayüze ekleme
    addTodoToStorage(inputText); //* storageye ekle
    showAlert("success", "Todo başarıyla eklendi.");
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
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.textContent = newtodo;

  const a = document.createElement("a");
  a.className = "text-danger";
  a.href = "#";

  const i = document.createElement("i");
  i.className = "fa fa-trash";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodoFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  // 	       <div class="alert alert-primary" role="alert">
  //   A simple primary alert—check it out!
  // </div>
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;

  form.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1500);
}

function loaded() {
  // sayfa yüklendiğinde storagedeki değerler arayüzde görünecek
  checkTodoFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function removeTodo(e) {
  //arayüzden silelim
  if (e.target.className == "fa fa-trash") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    removeTodoToStorage(todo.textContent);
	showAlert("success", "Todo başarıyla silindi.");
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodoFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function allTodoRemove(){
  const todolar = document.querySelectorAll(".list-group-item");
  todolar.forEach(function(todo){
	todo.remove();
  })
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
	showAlert("success" , "Tüm Todolar başarıyla silindi.");
}

function filtrele(e){
 const filteredValue =  e.target.value.toLowerCase().trim();
 const todoListesi =document.querySelectorAll(".list-group-item");
 if(todoListesi.length>0) {
	todoListesi.forEach(function(todo){
		if(todo.textContent.toLowerCase().trim().includes(filteredValue)){
		todo.setAttribute("style", "display : block;");
	}else {
	todo.setAttribute("style", "display: none !important");
	}
	});

 }else {
	showAlert("warning", "Filtrelemek için todo olmalıdır.");
 }
 

}