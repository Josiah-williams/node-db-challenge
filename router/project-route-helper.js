const db = require("../data/db-config");
const mapper = require("../router/mapper")
const resource = require('./resource-route-helper')
const task = require('./task-route-helper')


module.exports = {
    getProjectById,
    addProject,
    getprojects,
    updateProject,
    removeProject,

}

function getprojects(id) {
    let query = db('projects');

    if (id) {
        query.where('projects.id', id).first();

        const promises = [query, tasks.getProjectTasks(id)]; resource.findLinkedResourcesById(id)// [ projects, resources ]

        return Promise.all(promises).then(function (results) {
            let [project, tasks, resource] = results;

            if (project) {
                project.tasks = tasks;

                project.resource = resource

                return mappers.projectToBody(project);
            } else {
                return null;
            }
        });
    }

    return query.then(projects => {
        return projects.map(project => mappers.projectToBody(project));
    });
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