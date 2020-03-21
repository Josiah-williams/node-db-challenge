const db = require("../data/db-config");
// const resource = require('./resource-route-helper')
// const task = require('./task-route-helper')


module.exports = {
    getProjectById,
    addProject,
    getprojects,
    updateProject,
    removeProject,

}

function getprojects() {
    return db("projects")
}

function getProjectById (id) {
    return db("projects").where({id}).first()
}
function addProject(project) {
    return db("projects").insert(project)
}

function updateProject(changed, id) {
    return db('projects')
      .where({ id })
      .update(changed);
  }
  
  function removeProject(id) {
    return db('projects')
        .where({id})
        .del();
  }