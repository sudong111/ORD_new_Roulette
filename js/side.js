const side = document.querySelector("#side_field");
const toggle = document.querySelector("#side_toggle");
const todo = document.querySelector("#side_field side_todo");
const bar = document.querySelector("#side_bar");
const write = document.querySelector("#side_todo input");
const copy = document.querySelector("#side_copy");
const body = document.body;
let int_side = parseInt(side.style.right);
let int_body = parseInt(body.style.width);
let body_number = 100;
let toDos = [];
const TODOS_KEY = 'todos';

function Toggle_Start(){
    if(int_side === -288){
        let time = setInterval(function(){
                int_side += (289/15);
                body_number -= 1;
                side.style.right = String(int_side-1)+'px';
                body.style.width = String(body_number)+'%';
                if(body_number === 85)
                    clearInterval(time);
        }, 5);
    }
    else{
        let time = setInterval(function(){
            int_side -= (289/15);
            body_number += 1;
            side.style.right = String(int_side-1)+'px';
            body.style.width = String(body_number)+'%';
            if(body_number === 100)
                clearInterval(time);
    }, 5);
    }
}
function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
function Create_field_List(index){
    const li = document.createElement("li");
    li.id = index.id;
    const span = document.createElement("span");
    span.innerText = '\n'+index.text+' ';
    const button = document.createElement("button");
    button.innerText = "삭제";
    button.addEventListener("click", Delete_List);
    li.appendChild(span);
    li.appendChild(button);
    bar.appendChild(li);
}
function Delete_List(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}
function handleToDoSubmit(event){
    event.preventDefault();
    const text = write.value;
    write.value = "";
    const textObj = {
        text: text,
        id: Date.now()
    };
    toDos.push(textObj);
    Create_field_List(textObj);
    saveToDos();
}
toggle.addEventListener("click",Toggle_Start);
side.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(Create_field_List);
}