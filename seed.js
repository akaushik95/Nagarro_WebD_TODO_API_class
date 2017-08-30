var StatusENUMS = {
    ACTIVE :"ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "learn javascript", status: StatusENUMS.ACTIVE},
    2 : {title : "git tutorials", status: StatusENUMS.DELETED},
    3 : {title : "interactive git", status: StatusENUMS.COMPLETE},
    4 : {title : "Learn gitignore", status: StatusENUMS.ACTIVE}
}

var next_todo_id = 4;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}