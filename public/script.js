console.log("script is running");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";

window.onload = getTodosAJAX();

function addTodoElements(id, todos_data_json){
    var todos = JSON.parse(todos_data_json);

    var parent = document.getElementById(id);
    // parent.innerText = todos_data_json;
    if(parent){
        parent.innerHTML = ""; //   not an good way to clear the screen
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key, todos[key]);
                parent.appendChild(todo_element);
            }
        )
    }
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);   // setting a custom attribute
    todo_element.setAttribute("class", "todoStatus"+todo_object.status);
    todo_element.setAttribute("class", "todoStatus"+ todo_object.status + " " + "breathVertical");

    if(todo_object.status == "ACTIVE"){
        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark as complete";
        complete_button.setAttribute("onclick", "completeTodoAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    if(todo_object.status != "DELETED"){

    }
    return todo_element;
}

function getTodosAJAX() {
    console.log("get todos ajax is running");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
        }
    }
    xhr.send(data = null);
};

function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "title=" + encodeURI(title);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
};

function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "status=COMPLETE";
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
};