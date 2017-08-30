var express = require('express');
var todos_db = require("./seed.js");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var app = express();

app.use(morgan('combined'));
app.use("/", express.static(__dirname+"/public"));
app.use("/", bodyParser.urlencoded({extended:false}));

app.get("/api/todos", function (req, res) {
   res.json(todos_db.todos);
});

app.delete("/api/todos/:id", function (req, res) {
   var del_id = req.params.id;
   var todo = todos_db.todos[del_id];
    if(!todo){
        res.status(400).json({error : "Todo doesn't exist"});
    }else{
        todo.status = todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }
});

app.post("/api/todos", function (req, res) {
    var todo = req.body.title;

    if(!todo || todo == "" || todo.trim() == ""){
        res.status(400).json({error : "todo title can't be empty"});
    }else{
        var new_todo_object = {
            title : req.body.title,
            status : todos_db.StatusENUMS.ACTIVE
        }
        todos_db.todos[todos_db.next_todo_id++] = new_todo_object;
        res.json(todos_db.todos);
    }
});

app.put("/api/todos/:id", function (req, res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    if(!todo){
        res.status(400).json({error : "Todo doesn't exist"});
    }else{
        var todo_title = req.body.title;
        if(todo_title && todo_title != "" && todo_title.trim() != ""){
            todo.title = todo_title;
        }
        var todo_status = req.body.status;
        if(todo_status && (todo_status == todos_db.StatusENUMS.ACTIVE || todo_status == todos_db.StatusENUMS.COMPLETE)){
            todo.status = todo_status;
        }
        res.json(todos_db.todos);
    }
});

var callback = function () {
    console.log("server is running");
};

app.listen(3000, callback);