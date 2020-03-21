const db = require("../data/db-config");
const mappers = require('./mapper');


module.exports = {
    addTask, 
    getTasks,
    getTasksById,
    updateTask,
    removeTask
} 

function getTasks () {
    return db("task")
    .select(
        "tasks.id",
        "tasks.description",
        "tasks.notes",
        "tasks.completed",
        "projects.name as project_name",
        "projects.description as project_description"
      )
      .join("projects", "projects.id", "=", "tasks.project_id");
  
}

function getTasksById (id) {
    return db("task").where({id}).first();
}

function addTask (task) {
    return db("task").insert(task)
    
} 

function updateTask(changed, id) {
    return db('task')
      .where({ id })
      .update(changed);
  }

  function removeTask(id) {
    return db('task')
        .where({id})
        .del();
  } 